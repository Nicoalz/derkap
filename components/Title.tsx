import { cn } from '../lib/utils';

interface titleProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
}

export default function Title({ text, className, ...props }: titleProps) {
  return (
    <h2 {...props} className={cn("font-champ text-title", className)}>{text}</h2>
  )
}
