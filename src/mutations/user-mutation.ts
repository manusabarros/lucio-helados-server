import { UserController } from "../controllers/user-controller";
import { security } from "../controllers/share-controller";

export const UserMutation = {
    signup: {
        resolve: async (parent: any, { input }: any, { user }: any) => {
            await security(user, "SIGNUP");
            return await UserController.signup(input, user);
        }
    },
};
