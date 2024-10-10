'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { signinSupabase } from '../../functions/supabase/signin-supabase';
import { cn } from '../../libs/utils';
import { default as Input } from '../form/Input';
import Link from 'next/link';
import Button from '@/components/Button';
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
      className="flex self-center gap-y-6 flex-col items-center justify-center w-full"
    >
      <div className="flex flex-col  w-64 justify-center items-center gap-y-6">
        <div className="flex flex-col gap-y-3 w-full">
          <Input placeholder="Email" type="email" name="email" />
          <Input placeholder="Mot de passe" type="password" name="password" />
        </div>
        <input
          disabled={isLoading}
          type="submit"
          value={isLoading ? 'Chargement...' : 'Connexion'}
          className={cn(
            'bg-custom-primary text-white py-2 px-6 rounded font-bold w-fit',
            { 'bg-gray-200 ': isLoading },
          )}
        />
      </div>
      <Link href="/inscription" className="flex items-center">
        <Button className="bg-gray-500" text="S'inscrire" />
      </Link>
    </form>
  );
}
