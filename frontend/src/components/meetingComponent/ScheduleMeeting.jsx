"use client"

import {useForm} from "react-hook-form"
import {BiLogoZoom} from "react-icons/bi";


import {Button} from "@/components/ui/button"

import React, {useState} from "react";
import Link from "next/link";
import {
    MdArrowBack,
    MdOutlineLockReset,
    MdOutlineAlternateEmail, MdLock
} from "react-icons/md";
import Image from "next/image";
import {Label} from "@/components/ui/label";
import {cn, HOST} from "@/lib/utils";
import {usePathname, useSearchParams, useParams} from "next/navigation";
import {AppContext, useAppContext} from "@/Context/Candidate_Employer_Data";
import DynamicAlert from "@/components/ui/DynamicAlert";
import {ImSpinner2} from "react-icons/im";
import {Textarea} from "@/components/ui/textarea";
import {MdOutlineDateRange} from "react-icons/md";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import DatePicker from "react-datepicker";
import {Input} from "@/components/ui/input";


export default function ForgotPassword() {

    const {candidate, setCandidate, employer, setEmployer} = useAppContext();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [email, setEmail] = useState("••••••••••••••••");
    const path = usePathname()
    const params = useParams();
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');
    const uuid = useSearchParams().get('uuid');
    const [day, setDay] = useState('Select Day');
    const [date, setDate] = useState(null);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    function maskEmail(email) {
        const [username, domain] = email.split("@");
        const maskedUsername = username.charAt(0) + username.slice(1, -2).replace(/./g, "•") + username.slice(-2);
        return maskedUsername + "@" + domain;
    }

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const onSubmit = (data) => {
        setIsLoading(true);

    }
    return (
        <>
            {showAlert && (
                <DynamicAlert title={title} alertMessage={alertMessage}/>
            )}
            <div
                className="max-w-md w-full h-[65vh] flex flex-col justify-center items-center gap-2 mx-auto rounded-none md:rounded-2xl p-4">
                <span
                    className='text-slate-50'><BiLogoZoom size={60}/></span>
                <h2 className="font-bold w-full text-xl text-center text-slate-50">
                    Schedule Meeting
                </h2>
                <div className="mt-0 w-full">
                    <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit(onSubmit)}>
                        {passwordChanged ? <Image src='/verified.gif' alt={'Verified'} width={140} height={140}/>
                            :
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className={'w-full'} variant="outline">{day}</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuRadioGroup value={day} onValueChange={setDay}>
                                            <DropdownMenuRadioItem value="MONDAY">MONDAY</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="TUESDAY">TUESDAY</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="WEDNESDAY">WEDNESDAY</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="THURSDAY">THURSDAY</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="FRIDAY">FRIDAY</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="SATURDAY">SATURDAY</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="SUNDAY">SUNDAY</DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <LabelInputContainer className="mt-4">
                                    <Label htmlFor="date" className='text-slate-50'>
                                        Enter Date
                                    </Label>
                                    <Input Icon={<MdLock size={20}/>}
                                           placeholder="April 23, 2024"
                                           type="text"
                                           className='text-slate-50 bg-slate-900 placeholder:text-slate-400'
                                           onChange={(e) => setDate(e.target.value)}/>
                                </LabelInputContainer>
                                <LabelInputContainer className="mt-4 mb-4">
                                    <Label htmlFor="agenda" className='text-slate-50'>
                                        Agenda of Meeting
                                    </Label>
                                    <Textarea id="agenda" Icon={<MdOutlineAlternateEmail size={20}/>
                                    }
                                              placeholder='Taking Interview...'
                                              type="email"
                                              className='text-slate-50 bg-slate-900 placeholder:text-slate-400'
                                              {...register("agenda")}/>
                                </LabelInputContainer>
                                <button
                                    className="bg-slate-50 text-[1rem] flex justify-center items-center gap-1 dark:bg-zinc-800 w-full text-slate-950 rounded-md h-10 font-medium transition-all duration-300 transform disabled:bg-slate-700 disabled:text-slate-300 disabled:border-none active:bg-slate-900 hover:bg-slate-950 hover:border-slate-50 hover:border-2 hover:text-slate-50"
                                    type="submit" disabled={isLoading}
                                >
                                    {isLoading ? <div className='flex gap-1 justify-center items-center'>
                                        <ImSpinner2 className="mr-2 w-5 h-5 animate-spin"/>
                                        Please wait
                                    </div> : <div className='flex gap-1 justify-center items-center'>
                                        Schedule
                                        <MdOutlineDateRange size={20}/>
                                    </div>}
                                </button>
                            </>
                        }
                    </form>
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center mt-2 text-sm">
                    <span className="text-slate-400 flex justify-center items-center"><MdArrowBack
                        size={20}/>Return to &nbsp;</span>
                    <Link href="/employer/signin"
                          className="text-slate-300 dark:text-zinc-900 font-medium hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </>
    )
}
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