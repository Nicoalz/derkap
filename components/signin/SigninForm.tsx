"use client"

import { useState } from "react"
import { toast } from 'sonner'
import { signinSupabase } from '../../functions/supabase/signin-supabase'
import { cn } from '../../functions/utils'
import { default as Input } from '../form/Input'


export default function SignInForm() {

  const [isLoading, setIsLoading] = useState<boolean>(false)



  const handleSignUp = async (formData: FormData) => {
    setIsLoading(true)

    const formValues = {
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",

    }
    try {
      const error = await signinSupabase({ formValues })

      if (error) {
        toast.error(error)
      }

    } catch (error) {
      console.log({ "Error : ": error })
      toast.error("Une erreur inattendue est survenue")
      console.error(error)

    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <form action={handleSignUp} onSubmit={() => setIsLoading(true)} className="max-w-[550px] flex self-center gap-y-[26px] flex-col w-full px-[50px] pt-[28px]" >
      <Input placeholder='Email' type='email' name='email' />
      <Input placeholder='Mot de passe' type='password' name='password' />
      <input disabled={isLoading} type="submit" value={isLoading ? "Chargement..." : "Se connecter"} className={cn("bg-red-500 cursor-pointer text-white px-20 py-2 transition-transform rounded", { "bg-gray-200 ": isLoading })} />
    </form>
  )
}