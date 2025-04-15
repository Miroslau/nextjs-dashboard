import z from "zod";

export const signInSchema = z.object({
    email: z.string(),
    password: z.string()
})

export const signUpSchema = z.object({
    name: z.string().min(4, 'Имя минимум 4 символа'),
    email: z.string().email('Неверный формат email').nonempty('Email обязателен'),
    password: z.string().min(6, 'Пароль минимум 6 символов'),
    confirmPassword: z.string().min(6, 'Подтверждение пароля обязательно')
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword']
})

export const schemaMap = {
    sign_up: signUpSchema,
    sign_in: signInSchema
}

export type AuthType = keyof typeof schemaMap
export type SignUpFormData = z.infer<typeof signUpSchema>
export type SignInFormData = z.infer<typeof signInSchema>