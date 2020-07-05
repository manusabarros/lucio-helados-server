import { Permission, IPermission } from "../models/permission";
import { IUser } from "../models/user";

export const security = async (user: any, _function?: number | string): Promise<IUser> => {
    if (!user) throw new Error("No se encuentra autenticado.");
    if (!_function) return user;
    let permissions: IPermission[] = [];
    switch (typeof _function) {
        case "number":
            permissions = await Permission.getPermissionsByFunctionId(user.roleId, _function);
            break;
        case "string":
            permissions = await Permission.getPermissionsByFunctionName(user.roleId, _function);
            break;
    }
    if (permissions.length === 0) throw new Error("No se encuentra autorizado para realizar esta acción.");
    return user;
};
