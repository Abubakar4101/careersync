'use client'
import React, {useEffect, useRef, useState} from 'react'
import { Switch } from "@/components/ui/switch"
import {Label} from "@/components/ui/label";
import Image from 'next/image';
import { useRouter, usePathname  } from 'next/navigation'
import {BackgroundBeams} from "@/components/ui/background-beams";
import {useWindowSize} from "@/lib/WindowSizeUtils";

export default function AuthLayout({children}) {
    const {width} = useWindowSize();
    const [heading, setHeading] = useState("")
    const [description, setDescription] = useState("")
    const router = useRouter();
    const pathname = usePathname();
    const [isChecked, setIsChecked] = useState(pathname.includes("employer"));
    const form = <div className='w-auto md:w-[50vw] h-auto flex justify-center items-center'>{children}</div>
    const copyRight = <div className='flex justify-center items-center h-[10vh] font-bold text-slate-50'>
        &#169;2024 CareerSync
    </div>
    useEffect(() => {
        if (pathname.includes("employer")) {
            setHeading("CareerSync: Bridging Talent and Opportunity for Success.");
            setDescription("Discover exceptional talent effortlessly with CareerSync. Empower your team by recruiting top candidates and shaping a workforce that drives success.");
        } else {
            setHeading("CareerSync: Ignite Your Future, Embrace Opportunities.");
            setDescription("Welcome to CareerSync, your passport to career advancement. Seamlessly connect with opportunities and take the next step towards a brighter, fulfilling future.");
        }
    }, [pathname])
    const handleSwitcher = (checked) => {
        checked ? router.push('/employer/signin') : router.push('/candidate/signin')
        setIsChecked(checked);
    }

    return (
        <>
            <div className="h-auto pb-4 w-auto md:w-screen bg-slate-950 relative flex flex-col md:flex-row justify-between antialiased">
                <div className='h-auto flex flex-col w-auto md:w-[50vw] px-5 md:pl-14'>
                    <div className='flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between items-center z-20 h-auto px-5 py-10 sm:py-0'>
                        <Image src={'/Logo-White.svg'} alt={'CareerSync'} width={70} height={70}/>
                        <div className="flex items-center space-x-2">
                            <Switch className='dark' defaultChecked={isChecked} onCheckedChange={handleSwitcher} id="airplane-mode"/>
                            <Label htmlFor="airplane-mode" className='font-bold text-slate-50'>Switch to
                                Employer</Label>
                        </div>
                    </div>
                    <div className='hidden md:flex justify-between z-20 items-center h-[70vh]'>
                        <div className="flex flex-col justify-center items-center w-[50vw] p-5">
                            <h1 className="relative z-10 text-lg md:text-3xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
                                {heading}
                            </h1>
                            <p></p>
                            <p className="text-slate-400 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                                {description}
                            </p>
                        </div>
                    </div>
                    {width >= 768 ? copyRight : form}
                </div>
                {width < 768 ? copyRight : form}
                <BackgroundBeams/>
            </div>
        </>
    )
}