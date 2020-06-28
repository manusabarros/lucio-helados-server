import { prisma } from "../config/prisma-client";

export interface IUser {
    id: number;
    username: string;
    password: string;
    firstName: string | null;
    lastName: string | null;
    roleId: number;
}

export interface IToken {
    token: string;
}

export interface ISignUpUser {
    username: string;
    password: string;
    firstName: string | null;
    lastName: string | null;
    roleId: number;
}

export interface ILoginUser {
    username: string;
    password: string;
}

const select = {
    id: true,
    username: true,
    password: false,
    firstName: true,
    lastName: true,
    roleId: true,
};

export const User = () => {};

User.signup = async ({ username, password, firstName, lastName, roleId }: ISignUpUser): Promise<IUser> =>
    await prisma.user.create({
        data: {
            username,
            password,
            firstName,
            lastName,
            role: {
                connect: {
                    id: roleId,
                },
            },
        },
        select,
    });

User.getUsers = async (): Promise<IUser[]> => await prisma.user.findMany({ select });

User.getUserById = async (id: number): Promise<IUser | null> => await prisma.user.findOne({ where: { id }, select });

User.getUserByUsername = async (username: string): Promise<IUser | null> => await prisma.user.findOne({ where: { username } });

User.updateUserById = async (id: number, input: any): Promise<IUser> => {
    if (input.roleId) {
        return await prisma.user.update({
            where: { id },
            data: {
                username: input.username,
                firstName: input.firstName,
                lastName: input.lastName,
                role: {
                    connect: {
                        id: input.roleId,
                    },
                },
            },
            select,
        });
    }
    return await prisma.user.update({
        where: { id },
        data: {
            username: input.username,
            firstName: input.firstName,
            lastName: input.lastName,
        },
        select,
    });
};

User.deleteUserById = async (id: number): Promise<IUser> => await prisma.user.delete({ where: { id }, select });
