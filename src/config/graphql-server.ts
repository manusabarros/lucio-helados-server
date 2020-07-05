import { GraphQLServer } from "graphql-yoga";
import { typeDefs } from "../typedefs";
import { resolvers } from "../resolvers";
import jwt from "jsonwebtoken";

export const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: (context) => {
        const { session, headers } = context.request;
        let token: string = "";
        let user: any = null;
        if (session && session.user) user = session.user;
        if (headers.authorization) token = headers.authorization.split(" ")[1];
        if (token)
            user = jwt.verify(token, process.env.SECRET as string, (err, decoded) => {
                if (err) return;
                return decoded;
            });
        if (!user) return context;
        delete user.iat;
        delete user.exp;
        return { ...context, user };
    },
});
