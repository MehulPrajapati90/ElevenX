"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const currentUser = async () => {
    try {
        const user = await auth.api.getSession({
            headers: await headers(),
        });

        if (!user?.user) {
            return {
                success: false,
                message: "User Unauthenticated",
            }
        };

        return { user: user?.user };
    } catch (e) {
        return {
            success: false,
            message: "failed to fetch user",
        }
    }
}