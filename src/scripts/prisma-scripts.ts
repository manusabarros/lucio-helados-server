import { prisma } from "../config/prisma-client";

export const runScripts = async () => {
    // console.log(
    //     await prisma.permission.create({
    //         data: {
    //             role: {
    //                 connect: {
    //                     name: "USER",
    //                 },
    //             },
    //             action: {
    //                 connect: {
    //                     name: "GET_USERS",
    //                 },
    //             },
    //         },
    //     })
    // );
    // console.log(
    //     await prisma.action.create({
    //         data: {
    //             name: "GET_USERS",
    //             description: "Obtener usuarios.",
    //         },
    //     })
    // );
};
