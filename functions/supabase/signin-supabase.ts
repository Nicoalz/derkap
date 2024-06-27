"use server"

import { headers } from "next/headers"
import { createSupabaseAppServerClient } from '../../libs/supabase/server'

interface SignInFormValues {
	email: string
	password: string
}

export const signinSupabase = async ({formValues}: {formValues: SignInFormValues}) => {
  const { email, password } = formValues
	const supabase = createSupabaseAppServerClient()
	const origin = headers().get("origin")


	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	if (error) {
		if (error.message.includes("Invalid login credentials")) {
			return "Email ou mot de passe incorrect"
		}
		return error.message
	}

}

