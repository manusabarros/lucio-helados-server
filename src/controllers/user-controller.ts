import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

export const UserController = () => {};

UserController.signup = async (input: any, user: any) => {
    const userFound = await User.getUserByUsername(input.username);
    if (userFound) throw new Error("Nombre de usuario no disponible.");
    const hashedPassword = await bcrypt.hash(input.password, 12);
    input.password = hashedPassword;
    return await User.signup(input);
};

UserController.login = async ({ username, password }: any, request: any) => {
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
    request.session.token = token;
    return token;
};

UserController.getUsers = async () => await User.getUsers();

UserController.getUserById = async (id: number) => await User.getUserById(id);
