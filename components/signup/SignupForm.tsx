"use client"

import { useRouter } from 'next/navigation'
import { useState } from "react"
import { toast } from 'sonner'
import { z } from "zod"
import { signupSupabase } from '../../functions/supabase/signup-supabase'
import { cn } from '../../functions/utils'
import { signUpEmailSchema, signUpPasswordSchema, signUpSchema, signUpUsernameSchema } from '../../libs/zod/UserSchema'
import { default as Input } from '../form/Input'


export default function SignUpForm() {
  const [emailError, setEmailError] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")
  const [usernameError, setUsernameError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter();

  const checkEmailSchema = (e: string) => {
    try {
      signUpEmailSchema.parse({ email: e })
      setEmailError("")
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.errors[0].message)
      }
    }
  }
  const checkUsernameSchema = (e: string) => {
    try {
      signUpUsernameSchema.parse({ username: e })
      setUsernameError("")
    } catch (error) {
      if (error instanceof z.ZodError) {
        setUsernameError(error.errors[0].message)
      }
    }
  }
  const checkPasswordSchema = (e: string) => {
    try {
      signUpPasswordSchema.parse({ password: e })
      setPasswordError("")
    } catch (error) {
      if (error instanceof z.ZodError) {
        setPasswordError(error.errors[0].message)
      }
    }
  }

  const handleSignUp = async (formData: FormData) => {
    setIsLoading(true)

    const formValues = {
      email: formData.get("email")?.toString() || "",
      username: formData.get("username")?.toString() || "",
      password: formData.get("password")?.toString() || "",

    }
    try {
      signUpSchema.parse(formValues)
      const error = await signupSupabase({ formValues })

      if (error) {
        toast.error(error)
      }
      else {
        toast.success("Un email de confirmation vous a été envoyé (à faire avec resend))")
        router.push("/connexion")

      }
    } catch (error) {
      console.log({ "Error : ": error })
      if (error instanceof z.ZodError) {
        error.errors.map((error) => {
          error.path[0] === "email" && setEmailError(error.message)
          error.path[0] === "username" && setUsernameError(error.message)
          error.path[0] === "password" && setPasswordError(error.message)
        })
        error.errors.length <= 1 ?
          toast.error(error.errors[0].message)
          :
          toast.error("Veuillez corriger les erreurs dans le formulaire")
      } else {
        toast.error("Une erreur inattendue est survenue")
        console.error(error)
      }
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <form action={handleSignUp} onSubmit={() => setIsLoading(true)} className="max-w-[550px] flex self-center gap-y-[26px] flex-col w-full px-[50px] pt-[28px]" >
      <Input placeholder='Pseudo' type='text' name='username' errorMsg={usernameError} onChange={(e) => checkUsernameSchema(e.target.value)} />
      <Input placeholder='Email' type='email' name='email' errorMsg={emailError} onChange={(e) => checkEmailSchema(e.target.value)} />
      <Input placeholder='Mot de passe' type='password' name='password' errorMsg={passwordError} onChange={(e) => checkPasswordSchema(e.target.value)} />
      <input disabled={isLoading} type="submit" value={isLoading ? "Chargement..." : "S'inscrire"} className={cn("bg-red-500 cursor-pointer text-white px-20 py-2 transition-transform rounded", { "bg-gray-200 ": isLoading })} />
    </form>
  )
}
