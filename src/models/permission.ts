import { prisma } from "../config/prisma-client";

export interface IPermission {
    id: number;
    roleId: number;
    functionId: number;
}

export const Permission = () => {};

Permission.getPermissionsByFunctionId = async (roleId: number, functionId: number): Promise<IPermission[]> =>
    await prisma.permission.findMany({
        where: { AND: [{ functionId }, { roleId }] },
    });

Permission.getPermissionsByFunctionName = async (roleId: number, functionName: string): Promise<IPermission[]> =>
    await prisma.function
        .findOne({
            where: { name: functionName },
        })
        .permission({
            where: { roleId },
        });
