'use client';
import { cn } from '../libs/utils';
import Button from './Button';

interface SwitchProps extends React.HTMLAttributes<HTMLDivElement> {
  switch1Text: string;
  switch2Text: string;
  isFirstSwitchActive: boolean;
  setIsFirstSwitchActive: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Switch({ switch1Text, switch2Text, isFirstSwitchActive, setIsFirstSwitchActive, className, ...props }: SwitchProps) {
  return (
    <div {...props} className={cn("p-2 bg-white rounded-xl flex gap-x-2", className)}>
      <Button text={switch1Text} onClick={() => setIsFirstSwitchActive(true)} className={cn("w-1/2 bg-white text-custom-black py-2 rounded-xl", { "bg-custom-primary text-white": isFirstSwitchActive })} />
      <Button text={switch2Text} onClick={() => setIsFirstSwitchActive(false)} className={cn("w-1/2  py-2 rounded-xl", { " bg-white text-custom-black": isFirstSwitchActive })}> {switch2Text} </Button>

    </div >
  )
}
