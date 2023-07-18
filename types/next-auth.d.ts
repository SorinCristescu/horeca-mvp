import NextAuth from "next-auth/next";

declare module "next-auth"{
    interface User {
        fullName?: string;
        email: string | null;
        id: string;
        password?: string | null;
        role?: string | null;
        };
}

