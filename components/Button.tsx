import Link from 'next/link';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { cn } from '../libs/utils';

// property) JSX.IntrinsicElements.button: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  text: string;
  isCancel?: boolean;
  asLink?: boolean;
  url?: string;
}
export default function Button({ text, url, isCancel, asLink, className, ...props }: ButtonProps) {

  if (asLink) {
    return (
      <Link href={url ?? ""} className={cn(" bg-custom-primary text-white py-2 px-4 rounded-xl  text-sm", className, { "bg-gray-200 text-custom-black": isCancel })}> {text} </Link>
    )
  }
  return (



    <button  {...props} className={cn(" bg-custom-primary text-white py-2 px-4 rounded-xl  text-sm", className, { "bg-gray-200 text-custom-black": isCancel })} > {text} </button >
  )
}
