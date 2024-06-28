import { cn } from '../lib/utils';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  isCancel?: boolean;
}
export default function Button({ text, isCancel, className, ...props }: ButtonProps) {
  return (
    <button {...props} className={cn(" bg-custom-primary text-white py-2 px-4 rounded-xl  text-sm", className, { "bg-gray-200 text-custom-black": isCancel })}> {text} </button>
  )
}
