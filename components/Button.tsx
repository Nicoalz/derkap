import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { cn } from '../lib/utils';

// property) JSX.IntrinsicElements.button: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  text: string;
  isCancel?: boolean;
}
export default function Button({ text, isCancel, className, ...props }: ButtonProps) {
  return (
    <button {...props} className={cn(" bg-custom-primary text-white py-2 px-4 rounded-xl  text-sm", className, { "bg-gray-200 text-custom-black": isCancel })}> {text} </button>
  )
}
