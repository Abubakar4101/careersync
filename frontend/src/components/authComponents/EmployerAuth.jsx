"use client";
import React from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export default function EmployerAuth({ children }) {
  return (
    <BackgroundGradient className="rounded-3xl flex justify-center items-center p-4 h-auto w-[80vw] md:w-[40vw] lg:w-[30vw] bg-slate-900">
      {children}
    </BackgroundGradient>
  );
}
