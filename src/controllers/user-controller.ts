import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User, ISignUpUser, IUser, ILoginUser, IToken } from "../models/user";

export const UserController = () => {};

UserController.signup = async (input: ISignUpUser): Promise<IUser> => {
    const userFound = await User.getUserByUsername(input.username);
    if (userFound) throw new Error("Nombre de usuario no disponible.");
    const hashedPassword = await bcrypt.hash(input.password, 12);
    input.password = hashedPassword;
    return await User.signup(input);
};

UserController.login = async ({ username, password }: ILoginUser, request: Request): Promise<IToken> => {
    const userFound = await User.getUserByUsername(username);
    if (!userFound) throw new Error("Usuario o contraseña incorrectos.");
    const samePassword = await bcrypt.compare(password, userFound.password);
    if (!samePassword) throw new Error("Usuario o contraseña incorrectos.");
    const token: string = jwt.sign(
        {
            id: userFound.id,
            username: userFound.username,
            firstName: userFound.firstName,
            lastName: userFound.lastName,
            roleId: userFound.roleId,
        },
        process.env.SECRET as string,
        { expiresIn: "15m" }
    );
    delete userFound.password;
    if (request.session) request.session.user = userFound;
    return { token };
};

UserController.logout = (req: Request, res: Response) => {
    res.clearCookie("connect.sid");
    req.session?.destroy((err: any) => {});
    return true;
};

UserController.getUsers = async (): Promise<IUser[]> => await User.getUsers();

UserController.getUserById = async (id: number): Promise<IUser | null> => await User.getUserById(id);

UserController.updateUserById = async (id: number, input: any): Promise<IUser> => await User.updateUserById(id, input);

UserController.deleteUserById = async (id: number): Promise<IUser> => await User.deleteUserById(id);
