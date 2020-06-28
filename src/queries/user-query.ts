import { UserController } from "../controllers/user-controller";
import { security } from "../controllers/share-controller";

export const UserQuery = {
    login: {
        resolve: async (parent: any, { input }: any, { request }: any) => await UserController.login(input, request),
    },
    authenticate: {
        resolve: async (parent: any, args: any, { user }: any) => await security(user),
    },
    getUsers: {
        resolve: async (parent: any, args: any, { user }: any) => {
            await security(user, "GET_USERS");
            return await UserController.getUsers();
        }
    },
    getUserById: {
        resolve: async (parent: any, { id }: any, { user }: any) => {
            await security(user, "USER_FIND");
            return await UserController.getUserById(id);
        },
    },
};
