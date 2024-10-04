'use client';

import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { signinSupabase } from '../../functions/supabase/signin-supabase';
import { cn } from '../../libs/utils';
import { default as Input } from '../form/Input';

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignUp = async (formData: FormData) => {
    const formValues = {
      email: formData.get('email')?.toString() || '',
      password: formData.get('password')?.toString() || '',
    };

    if (!formValues.email || !formValues.password) {
      return toast.error('Veuillez remplir tous les champs');
    }

    setIsLoading(true);

    try {
      const error = await signinSupabase({ formValues });

      if (error) {
        toast.error(error);
      }
    } catch (error) {
      toast.error('Une erreur inattendue est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSignUp(new FormData(e.target as HTMLFormElement));
      }}
      className="max-w-[550px] flex self-center gap-6 flex-col w-full"
    >
      <div className="flex flex-col gap-3">
        <Input placeholder="Email" type="email" name="email" />
        <Input placeholder="Mot de passe" type="password" name="password" />
      </div>
      <input
        disabled={isLoading}
        type="submit"
        value={isLoading ? 'Chargement...' : 'Se connecter'}
        className={cn(
          'bg-red-500 cursor-pointer text-white py-1 transition-transform rounded',
          { 'bg-gray-200 ': isLoading },
        )}
      />
      <a href="/inscription" className="flex items-center">
        S&apos;inscrire <ChevronRight size={20} />
      </a>
    </form>
  );
}
