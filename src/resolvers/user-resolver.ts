import { UserQuery } from "../queries/user-query";
import { UserMutation } from "../mutations/user-mutation";

export const UserResolver = {
    Query: UserQuery,
    Mutation: UserMutation,
};
