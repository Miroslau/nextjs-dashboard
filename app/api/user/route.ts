import { NextResponse } from "next/server";
import postgres from "postgres";
import {User} from "@/app/lib/definitions";
import {createUser, getUser} from "@/app/lib/actions";
import { v4 as uuidv4 } from 'uuid';
import { hash } from "bcryptjs";
import z from "zod";

const userSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.string().min(1, 'Email address is required').email("Invalid email address"),
    password: z.string()
        .min(1, 'Password is required')
        .min(8, 'Password must have than 8 characters')
        .refine((password) => /[A-Z]/.test(password), 'Passwords must include uppercase letters')
        .refine((password) => /[a-z]/.test(password), 'Passwords must include lowercase letters')
        .refine((password) => /[0-9]/.test(password), 'Passwords must include numbers')
        .refine((password) => /[!@#$%^&*]/.test(password), 'Passwords must special characters'),
})

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = userSchema.parse(body);

        // check of email already exists

        const existingUserByEmail = await getUser(email);

        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exists"}, { status: 409 });
        }

        // create new user

        const hashedPassword = await hash(password, 10)
        const newUser = await createUser({ name, email, password: hashedPassword, id: uuidv4()});

        if (!newUser) {
            return NextResponse.json({ user: null, message: "Database Error: Failed to Create User"}, { status: 500 });
        }

        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({
            user: rest,
            message: "User created successfully",
        }, { status: 200 });
    } catch (error) {
        console.error('Failed to create User:', error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}