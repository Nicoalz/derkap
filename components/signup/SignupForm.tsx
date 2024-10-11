'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';
import Link from 'next/link';
import Button from '@/components/Button';
import { signupSupabase } from '../../functions/supabase/signup-supabase';
import { cn } from '../../libs/utils';
import { default as Input } from '../form/Input';
import {
  signUpEmailSchema,
  signUpPasswordSchema,
  signUpSchema,
  signUpUsernameSchema,
} from '../../libs/zod/UserSchema';

export default function SignUpForm() {
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const checkEmailSchema = (e: string) => {
    try {
      signUpEmailSchema.parse({ email: e });
      setEmailError('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.errors[0].message);
      }
    }
  };
  const checkUsernameSchema = (e: string) => {
    try {
      signUpUsernameSchema.parse({ username: e });
      setUsernameError('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setUsernameError(error.errors[0].message);
      }
    }
  };
  const checkPasswordSchema = (e: string) => {
    try {
      signUpPasswordSchema.parse({ password: e });
      setPasswordError('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setPasswordError(error.errors[0].message);
      }
    }
  };

  const handleSignUp = async (formData: FormData) => {
    setIsLoading(true);

    const formValues = {
      email: formData.get('email')?.toString() || '',
      username: formData.get('username')?.toString() || '',
      password: formData.get('password')?.toString() || '',
    };
    try {
      signUpSchema.parse(formValues);
      const error = await signupSupabase({ formValues });

      if (error) {
        toast.error(error);
      } else {
        toast.success('Un email de confirmation vous a été envoyé');
        router.push('/connexion');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.map(error => {
          if (error.path[0] === 'email') {
            setEmailError(error.message);
          }
          if (error.path[0] === 'username') {
            setUsernameError(error.message);
          }
          if (error.path[0] === 'password') {
            setPasswordError(error.message);
          }
        });
        if (error.errors.length <= 1) {
          toast.error(error.errors[0].message);
        } else {
          toast.error('Veuillez corriger les erreurs dans le formulaire');
        }
      } else {
        toast.error('Une erreur inattendue est survenue');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      action={handleSignUp}
      onSubmit={() => setIsLoading(true)}
      className="flex self-center gap-6 flex-col w-full justify-center items-center"
    >
      <div className="flex flex-col w-64 justify-center items-center gap-y-6">
        <div className="flex flex-col gap-y-3 w-full">
          <Input
            className="w-full"
            placeholder="Pseudo"
            type="text"
            name="username"
            errorMsg={usernameError}
            onChange={e => checkUsernameSchema(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            name="email"
            errorMsg={emailError}
            onChange={e => checkEmailSchema(e.target.value)}
          />
          <Input
            placeholder="Mot de passe"
            type="password"
            name="password"
            errorMsg={passwordError}
            onChange={e => checkPasswordSchema(e.target.value)}
          />
        </div>
        <input
          disabled={isLoading}
          type="submit"
          value={isLoading ? 'Chargement...' : 'Inscription'}
          className={cn(
            'bg-custom-primary text-white py-2 px-6 rounded font-bold w-fit',
            { 'bg-gray-200 ': isLoading },
          )}
        />
      </div>
      <Link href="/connexion" className="flex items-center">
        <Button className="bg-gray-500" text="Se connecter" />
      </Link>
    </form>
  );
}
