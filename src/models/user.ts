import { prisma } from "../config/prisma-client";

const selectOptions = {
    id: true,
    username: true,
    password: false,
    firstName: true,
    lastName: true,
    roleId: true,
};

export const User = () => {};

User.signup = async ({ username, password, firstName, lastName, roleId }: any) => await prisma.user.create({
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
    select: selectOptions,
});;

User.getUsers = async () => await prisma.user.findMany({ select: selectOptions });

User.getUserById = async (id: number) => await prisma.user.findOne({ where: { id }, select: selectOptions });

User.getUserByUsername = async (username: string) => await prisma.user.findOne({ where: { username } });
