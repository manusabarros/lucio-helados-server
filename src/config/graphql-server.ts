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
        if (session) token = session.token;
        if (headers.authorization) token = headers.authorization.split(" ")[1];
        if (!token) return context;
        const user = jwt.verify(token, process.env.SECRET as string, (err, decoded) => {
            if (err) return;
            return decoded;
        });
        return { ...context, user };
    },
});
