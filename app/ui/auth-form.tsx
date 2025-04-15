"use client"

import { lusitana } from '@/app/ui/fonts'
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import {useState} from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";


export default function AuthForm({ authType }: {
  authType: string;
}) {

  const { handleSubmit, register, formState: {
    errors, isSubmitting, isDirty, isValid
  } } = useForm<FormData>({
    mode: 'onChange'
  })

  const authOnSubmit = async (data: FormData) => {
    console.log("data: ", data)
  }

  return (
    <form action="" method="POST" onSubmit={handleSubmit(authOnSubmit)} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please Sign up to continue.
        </h1>
        <div className="w-full">
          {authType === 'sign_up' && (
              <div>
                <label
                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                    htmlFor="name"
                >
                  Name
                </label>
                <div className="relative">
                  <input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      autoComplete="off"
                      {...register("name", { required: true })}
                  />
                  <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
          )}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                placeholder="john@doe.com"
                autoComplete="off"
                    {...register("email", { required: true })}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {errors?.email && (
              <p className="text-red-600 text-sm">{errors?.email?.message}</p>
          )}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {authType === 'sign_up' && (
              <div className="mt-4">
                <label
                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                    htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      placeholder="Enter the same password to confirm it"
                  />
                  <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
          )}
        </div>
        <Button type="submit" className="mt-4 w-full">
          Sign Up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div className="flex h-8 items-end space-x-1">
          {/* Add form errors here */}
        </div>
      </div>
    </form>
  );
}
