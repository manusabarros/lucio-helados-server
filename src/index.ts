import dotenv from "dotenv";
dotenv.config();
import { server } from "./config/graphql-server";
import session from "express-session";
import pgSession from "connect-pg-simple";
import { pool } from "./config/pg-pool";
import { runScripts } from "./scripts/prisma-scripts";

server.express.use(
    session({
        store: new (pgSession(session))({ pool }),
        secret: process.env.SECRET as string,
        resave: false,
        rolling: true,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 60000,
        },
    })
);

server.start(
    {
        port: process.env.PORT,
        endpoint: "/graphql",
        cors: {
            credentials: true,
            origin: /.*/,
        },
    },
    async ({ port }) => {
        console.log(`🚀  Server ready at port ${port}!`);
        // await runScripts();
    }
);
