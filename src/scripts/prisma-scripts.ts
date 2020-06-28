import { prisma } from "../config/prisma-client";

export const runScripts = async () => {
    // console.log(
    //     await prisma.function.create({
    //         data: {
    //             name: "USER_DELETE",
    //             description: "Eliminar usuarios.",
    //         },
    //     })
    // );
    // console.log(
    //     await prisma.permission.create({
    //         data: {
    //             role: {
    //                 connect: {
    //                     name: "SUPERADMIN",
    //                 },
    //             },
    //             function: {
    //                 connect: {
    //                     name: "USER_DELETE",
    //                 },
    //             },
    //         },
    //     })
    // );
};
