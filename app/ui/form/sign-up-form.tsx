"use client"

import React from 'react';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {ArrowRightIcon, AtSymbolIcon, KeyIcon, UserIcon} from "@heroicons/react/24/outline";
import {Button} from "@/app/ui/button";
import Link from "next/link";
import {signUpSchema} from "@/app/zodSchema/sign-in.schema";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";

type FormData = z.infer<typeof signUpSchema>

const SignUpForm = () => {
    const router = useRouter();
    const {
        handleSubmit, register, formState: {
            errors,
            isSubmitting,
            isDirty,
            isValid
        }
    } = useForm<FormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    });

    const onSubmit = async (data: FormData) => {
        const response = await fetch('/api/user', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password,
            }),
        })

        if (response.ok) {
            router.push("/sign-in");
        } else {
            console.error('Registration failed.');
        }
    }

    return (
        <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
                <div>
                    <label
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                        htmlFor="name"
                    >
                        Name
                    </label>
                    <div className="relative">
                        <input
                            {...register("name", { required: true })}
                            id="name"
                            type="text"
                            placeholder="Jhon"
                            autoComplete="off"
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                    {errors?.name && (
                        <p className="text-red-600 text-sm mt-2">
                            {errors?.name?.message}
                        </p>
                    )}
                </div>
                <div className="mt-4">
                    <label
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <div className="relative">
                        <input
                            {...register("email", { required: true })}
                            id="email"
                            type="text"
                            placeholder="jhon@doe.com"
                            autoComplete="off"
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                    {errors?.email && (
                        <p className="text-red-600 text-sm mt-2">
                            {errors?.email?.message}
                        </p>
                    )}
                </div>
                <div className="mt-4">
                    <label
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            {...register("password", { required: true })}
                            id="password"
                            type="password"
                            name="password"
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            placeholder="Enter password"
                            autoComplete="off"
                        />
                        <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                    {errors?.password && (
                        <p className="text-red-600 text-sm mt-2">
                            {errors?.password?.message}
                        </p>
                    )}
                </div>
                <div className="mt-4">
                    <label
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                        htmlFor="confirmPassword"
                    >
                        Re-enter password
                    </label>
                    <div className="relative">
                        <input
                            {...register("confirmPassword", { required: true })}
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            placeholder="Re-Enter your password"
                            autoComplete="off"
                        />
                        <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                    {errors?.confirmPassword && (
                        <p className="text-red-600 text-sm mt-2">
                            {errors?.confirmPassword?.message}
                        </p>
                    )}
                </div>
            </div>
            <Button className="mt-4 w-full" type="submit">
                Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>
            <div className="w-full mx-auto my-4 flex gap-x-2.5 items-center justify-evenly before: mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml:4 after:block after:h-px after:flex-grow after:bg-stone-400">or</div>
            <Button className="mt-4 w-full justify-center" type="button">
                Sign up with Google
            </Button>
            <p className="w-full text-center text-sm text-gray-600 mt-2">
                Already have an account?&nbsp;
                <Link className="text-blue-500 hover:underline" href="/sign-in">Sign in</Link>
            </p>
        </form>
    );
};

export default SignUpForm;