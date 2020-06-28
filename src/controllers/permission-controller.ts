import { Permission, IPermission } from "../models/permission";

export const security = async (user: any, _function?: number | string): Promise<boolean> => {
    if (!user) throw new Error("No se encuentra autenticado.");
    if (!_function) return true;
    let permissions: IPermission[] = [];
    switch (typeof _function) {
        case "number" :
            permissions = await Permission.getPermissionsByFunctionId(user.e, _function)
            break;
        case "string" :
            permissions = await Permission.getPermissionsByFunctionName(user.e, _function);
            break;
    }
    if (permissions.length === 0) throw new Error("No se encuentra autorizado para realizar esta acción.");
    return true;
};
