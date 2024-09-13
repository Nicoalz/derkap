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
    <div className="h-full flex-grow flex pt-[5vh] flex-col">
      <h2 className="text-center w-full">Se connecter</h2>
      <SignInForm />
    </div>
  );
}
