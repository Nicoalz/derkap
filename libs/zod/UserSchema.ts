import { z } from 'zod';

const uppercaseRegex = /[A-Z]/;
const digitRegex = /\d/;

export const signUpSchema = z.object({
  username: z
    .string()
    .min(1, { message: "L'identifiant est requis" })
    .min(3, { message: "L'identifiant doit contenir au moins 3 caractères" }),
  email: z.string().email('Veuillez entrer une adresse email valide'),
  password: z
    .string()
    .min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
    .regex(uppercaseRegex, {
      message: 'Le mot de passe doit contenir au moins une majuscule',
    })
    .regex(digitRegex, {
      message: 'Le mot de passe doit contenir au moins un chiffre',
    }),
});

export const signUpEmailSchema = z.object({
  email: z.string().email('Veuillez entrer une adresse email valide'),
});

export const signUpUsernameSchema = z.object({
  username: z
    .string()
    .min(1, { message: "L'identifiant est requis" })
    .min(3, { message: "L'identifiant doit contenir au moins 3 caractères" }),
});

export const signUpPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
    .regex(uppercaseRegex, {
      message: 'Le mot de passe doit contenir au moins une majuscule',
    })
    .regex(digitRegex, {
      message: 'Le mot de passe doit contenir au moins un chiffre',
    }),
});
