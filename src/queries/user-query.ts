import { UserController } from "../controllers/user-controller";
import { security } from "../controllers/permission-controller";
import { IToken, IUser } from "../models/user";

export const UserQuery = {
    login: {
        resolve: async (parent: any, { input }: any, { request }: any): Promise<IToken> => await UserController.login(input, request),
    },
    logout: {
        resolve: (parent: any, args: any, { request, response }: any): boolean => UserController.logout(request, response),
    },
    authenticate: {
        resolve: async (parent: any, args: any, { user }: any): Promise<IUser> => await security(user),
    },
    getUsers: {
        resolve: async (parent: any, args: any, { user }: any): Promise<IUser[]> => {
            await security(user, "USER_FIND");
            return await UserController.getUsers();
        },
    },
    getUserById: {
        resolve: async (parent: any, { id }: any, { user }: any): Promise<IUser | null> => {
            await security(user, "USER_FIND");
            return await UserController.getUserById(id);
        },
    },
};
