import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAppServerClient } from './libs/supabase/server';


export async function middleware(request: NextRequest) {
  console.log("middleware")
  const supabase = createSupabaseAppServerClient()
  console.log("middleware2")
  const { user } = (await supabase.auth.getUser()).data;
  console.log("middleware3")
  if (!user){
      const url = request.nextUrl.clone();
      if (url.pathname != "/inscription") url.pathname = "/connexion";
        return NextResponse.rewrite(url);
  }



}

export const config = {
  matcher: [

    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
