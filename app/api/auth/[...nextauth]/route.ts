import NextAuth from "next-auth";
import {authConfig} from "@/auth.config";
import Credentials from "@auth/core/providers/credentials";
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import {getUser} from "@/app/lib/actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().min(1, 'Email address is required'),
                        password: z.string().min(1, 'Password is required')
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) return user;

                    console.log('Invalid credentials');
                }

                return null;
            },
        }),
    ],
});

export const { GET, POST } = handlers;

