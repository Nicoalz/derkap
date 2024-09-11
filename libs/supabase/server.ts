import { Database } from "@/types/supabase"
import { createServerClient } from '@supabase/ssr/dist/main/createServerClient'
import { cookies } from "next/headers"

export function createSupabaseAppServerClient() {
	const cookieStore = cookies()

	return createServerClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!, {
		cookies: {
			getAll() {
				return cookieStore.getAll()
			},
			setAll(cookiesToSet) {
				try {
					cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
				} catch {
					// The `setAll` method was called from a Server Component.
					// This can be ignored if you have middleware refreshing
					// user sessions.
				}
			},
		},
	})
}
