import { cn } from '../libs/utils';

interface titleProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
}

export default function Title({ text, className, ...props }: titleProps) {
  return (
    <h2 {...props} className={cn("font-champ text-[32px] text-custom-black", className)}>{text}</h2>
  )
}
