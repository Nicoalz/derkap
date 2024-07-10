type FiltreBoutonProps = {
  label: string;
  emoji: string;
  onClick?: () => void;
  active?: boolean;
  color?: string;
  colorActive?: string;
}

export default function FiltreBouton({ label, emoji, onClick, active }: FiltreBoutonProps) {
  return (
    <div className={`flex items-center justify-center rounded-lg p-2 cursor-pointer font-semibold border-solid border-2 ${active ? `bg-custom-violet text-custom-white` : `bg-transparent text-custom-black border-custom-black`}`} onClick={onClick}>
      <p className='text-md flex gap-2 items-center'>{label} <span>{emoji}</span></p>
    </div>
  )
}
