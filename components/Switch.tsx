'use client';
import { cn } from '../lib/utils';

interface SwitchProps extends React.HTMLAttributes<HTMLDivElement> {
  switch1Text: string;
  switch2Text: string;
  isFirstSwitchActive: boolean;
  setIsFirstSwitchActive: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Switch({ switch1Text, switch2Text, isFirstSwitchActive, setIsFirstSwitchActive, className, ...props }: SwitchProps) {
  return (
    <div {...props} className={cn("p-2 bg-white rounded-xl flex gap-x-2", className)}>
      <button onClick={() => setIsFirstSwitchActive(true)} className={cn("w-1/2 bg-white text-black py-2 rounded-xl", { "bg-custom-primary text-white": isFirstSwitchActive })}> {switch1Text} </button>
      <button onClick={() => setIsFirstSwitchActive(false)} className={cn("w-1/2 bg-custom-primary text-white py-2 rounded-xl", { " bg-white text-black": isFirstSwitchActive })}> {switch2Text} </button>

    </div >
  )
}
