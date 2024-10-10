'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';
import { ChevronRight } from 'lucide-react';
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
        toast.success('Inscription réussie !');
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
      className="max-w-[550px] flex self-center gap-6 flex-col w-full"
    >
      <div className="flex flex-col gap-3">
        <Input
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
        value={isLoading ? 'Chargement...' : "S'inscrire"}
        className={cn(
          'bg-red-500 cursor-pointer text-white py-1 transition-transform rounded',
          { 'bg-gray-200 ': isLoading },
        )}
      />
      <a href="/connexion" className="flex items-center">
        Se connecter <ChevronRight size={20} />
      </a>
    </form>
  );
}
