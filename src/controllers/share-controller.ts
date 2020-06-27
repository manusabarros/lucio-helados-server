import { prisma } from "../config/prisma-client";

export const security = async (user: any, action?: number | string) => {
    if (!user) throw new Error("No se encuentra autenticado.");
    if (!action) return true;
    let permissions: any[] = [];
    switch (typeof action) {
        case "number" :
            permissions = await prisma.permission.findMany({ where: { roleId: user.e } });
            break;
        case "string" :
            permissions = await prisma.function.findOne({ where: { name: action } }).permission({ where: { roleId: user.e } });
            break;
    }
    if (permissions.length === 0) throw new Error("No se encuentra autorizado para realizar esta acción.");
    if (permissions.every(value => value.roleId !== user.e)) throw new Error("No se encuentra autorizado para realizar esta acción.");
    return true;
};
