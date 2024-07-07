"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMsg?: string
}

export default function Input({ placeholder, type, errorMsg, className, ...props }: InputProps) {
  const [inputType, setInputType] = useState(type)

  const handleShowPassword = () => {
    setInputType(inputType === "password" ? "text" : "password")
  }

  return (
    <div>
      <div className='relative'>
        <input {...props} type={inputType}
          placeholder={placeholder}
          className={cn(" rounded-[10px] text-sm pl-[18px] text-black pr-[18px]  border-[1px] w-full border-transparent focus:outline-none shadow-base py-[12px]", className, { "border-red-500": errorMsg }, { "pr-[50px]": type === "password" })} />
        {type === "password" && inputType === "password" && <Eye className=" h-[20px] w-[20px] text-gray-600 cursor-pointer absolute top-[50%] -translate-y-[50%] right-[18px]" onClick={handleShowPassword} />}
        {type === "password" && inputType === "text" && <EyeOff className=" h-[20px] w-[20px] text-gray-600  cursor-pointer absolute top-[50%] -translate-y-[50%] right-[18px] " onClick={handleShowPassword} />}
      </div>
      <p className={cn("max-h-[0px] px-4 transition-all opacity-0 text-[12px] ", { "max-h-[100px] opacity-100 py-2 text-red-500 ": errorMsg })}>{errorMsg}</p>
    </div>
  )
}
