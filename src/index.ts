import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import session from "express-session";
import pgSession from "connect-pg-simple";
import { server } from "./config/graphql-server";
import { pool } from "./config/pg-pool";
import { runScripts } from "./scripts/prisma-scripts";

let cert: any = "";
let key: any = "";

if (process.env.NODE_ENV) {
    cert = fs.readFileSync(__dirname + "/ssl/cert.pem");
    key = fs.readFileSync(__dirname + "/ssl/key.pem");
}

server.express.use(
    session({
        store: new (pgSession(session))({ pool }),
        secret: process.env.SECRET as string,
        resave: false,
        rolling: true,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 900000,
            secure: process.env.NODE_ENV ? true : false,
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
        https: process.env.NODE_ENV ? { cert, key } : undefined,
    },
    async ({ port }) => {
        console.log(`🚀  Server ready at port ${port}!`);
        // await runScripts();
    }
);
