import React from "react";
import {lusitana} from "@/app/ui/fonts";
import SignUpForm from "@/app/ui/form/sign-up-form";


export default function SignUpPage() {
    return (
        <div className="space-y-3">
            <div>
                <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                    <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                        Please sign up to continue.
                    </h1>
                    <div className="w-full">
                        <SignUpForm />
                    </div>
                </div>
            </div>
        </div>
    )
}