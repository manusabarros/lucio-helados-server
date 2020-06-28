import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request } from "express";
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
            a: userFound.id,
            b: userFound.username,
            c: userFound.firstName,
            d: userFound.lastName,
            e: userFound.roleId,
        },
        process.env.SECRET as string,
        { expiresIn: "15m" }
    );
    if (request.session) request.session.token = token;
    return { token };
};

UserController.getUsers = async (): Promise<IUser[]> => await User.getUsers();

UserController.getUserById = async (id: number): Promise<IUser | null> => await User.getUserById(id);

UserController.updateUserById = async (id: number, input: any): Promise<IUser> => await User.updateUserById(id, input);

UserController.deleteUserById = async (id: number): Promise<IUser> => await User.deleteUserById(id);
