import React, { Suspense } from 'react';
import SignInForm from "@/app/ui/form/sign-in-form";
import {lusitana} from "@/app/ui/fonts";

export default function LoginPage() {
    return (
        <div className="space-y-3">
            <div>
                <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                    <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                        Please sign in to continue.
                    </h1>
                    <div className="w-full">
                        <SignInForm />
                    </div>
                </div>
            </div>
        </div>
    );
}