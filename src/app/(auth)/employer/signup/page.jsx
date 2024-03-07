"use client";
import React, {useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
    IconBrandGithub,
    IconBrandGoogle,
    IconBrandOnlyfans,
} from "@tabler/icons-react";
import {MdLock, MdOutlineAlternateEmail} from "react-icons/md";
import {BsGithub} from "react-icons/bs";
import {FcGoogle} from "react-icons/fc";
import Link from "next/link";
import {PiSignInBold} from "react-icons/pi";
import {IoMdEye, IoMdEyeOff} from "react-icons/io";

export default function EmployerSignUpPage() {
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
    };
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <form className="my-8" onSubmit={handleSubmit}>
            <div className="flex justify-center flex-col sm:flex-row items-center gap-5  mb-4">
                <LabelInputContainer>
                    <Label htmlFor="firstname" className='text-slate-50'>First name</Label>
                    <Input id="firstname" placeholder="Abubakar" type="text"
                           className='text-slate-50 bg-slate-900 placeholder:text-slate-400'/>
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label htmlFor="lastname" className='text-slate-50'>Last name</Label>
                    <Input id="lastname" placeholder="Siddique" type="text"
                           className='text-slate-50 bg-slate-900 placeholder:text-slate-400'/>
                </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="email" className='text-slate-50'>Email Address</Label>
                <Input id="email" Icon={<MdOutlineAlternateEmail size={20}/>} placeholder="example@gmail.com"
                       type="email" className='text-slate-50 bg-slate-900 placeholder:text-slate-400'/>
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="password" className='text-slate-50'>Password</Label>
                <Input Icon={<MdLock size={20}/>} finalIcon={
                    showPassword
                        ? <IoMdEyeOff size={20} onClick={toggleShowPassword} className='cursor-pointer'/>
                        : <IoMdEye size={20} onClick={toggleShowPassword} className='cursor-pointer'/>
                } id="password" placeholder="••••••••" type={showPassword ? "text" : "password"}
                       className='text-slate-50 bg-slate-900 placeholder:text-slate-400'/>
            </LabelInputContainer>
            <button
                className="bg-slate-50 flex justify-center items-center gap-1 dark:bg-zinc-800 w-full text-slate-950 rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
            >
                Sign up
                <PiSignInBold size={20}/>
            </button>
            <div className="flex flex-col sm:flex-row justify-center items-center mt-4 text-sm">
                <span className="text-slate-400">Already have an account? </span>
                <Link href="/employer/signin"
                      className="text-slate-300 dark:text-zinc-900 font-medium hover:underline">
                    Sign in
                </Link>
            </div>
        </form>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span
                className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"/>
            <span
                className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"/>
        </>
    );
};

const LabelInputContainer = ({
                                 children,
                                 className,
                             }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
