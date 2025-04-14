"use server";

import {signIn, auth} from "@/auth";

export const loginAction = async () => {
    await signIn("google")
}

export const authSession = async () => {
    return await auth();
}