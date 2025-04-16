import z from "zod";

export const signInSchema = z.object({
    email: z.string().min(1, {
        message: "Email address is required"
    }).email("Invalid email format"),
    password: z.string().min(1, {
        message: "Password is required"
    }),
});

export type User = z.infer<typeof signInSchema>;