import { redirect } from 'next/navigation';
import SignInForm from '../../components/signin/SigninForm';
import { createSupabaseAppServerClient } from '../../libs/supabase/server';

export default async function page() {
  const supabase = createSupabaseAppServerClient();

  const { user } = (await supabase.auth.getUser()).data;

  if (user) {
    redirect('/');
  }
  return (
    <div className="h-screen flex items-center justify-evenly pt-[5vh] flex-col p-5 gap-5">
      <h2 className="text-center text-3xl w-full font-champ">Se connecter</h2>
      <SignInForm />
    </div>
  );
}
