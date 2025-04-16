import z from "zod";

export const signInSchema = z.object({
    email: z.string().min(1, 'Email address is required'),
    password: z.string().min(1, 'Password is required'),
});

export const signUpSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.string().min(1, 'Email address is required').email("Invalid email address"),
    password: z.string()
               .min(1, 'Password is required')
               .min(8, 'Password must have than 8 characters')
               .refine((password) => /[A-Z]/.test(password), 'Passwords must include uppercase letters')
               .refine((password) => /[a-z]/.test(password), 'Passwords must include lowercase letters')
               .refine((password) => /[0-9]/.test(password), 'Passwords must include numbers')
               .refine((password) => /[!@#$%^&*]/.test(password), 'Passwords must special characters'),
    confirmPassword: z.string().min(1, 'Password is required')
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Confirm passwords must be the same as password',
    path: ['confirmPassword']
})

export type User = z.infer<typeof signInSchema>;