import Image from 'next/image'
import { cn } from '../lib/utils'
import { TUserDb } from '../types'
import Button from './Button'

interface FriendDemandBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  demand: TUserDb
}

export default function FriendDemandBox({ demand, className, ...props }: FriendDemandBoxProps) {
  const { username, avatar_url, id, name } = demand
  return (
    <div {...props} className={cn("rounded-xl gap-x-4 items-center justify-between flex bg-white w-full p-2", className)}>
      <div className='flex items-center gap-x-4'>
        <Image src={avatar_url ?? ""} alt={username ?? ""} width={60} height={60} className="rounded-xl" />

        <div className='flex flex-col'>
          <p className='text-lg font-[600]'>{name}</p>
          <p className='text-custom-primary text-xs'>@{username}</p>
        </div >
      </div >
      <div className='flex gap-x-2'>
        <Button text='Accepter' className='bg-custom-primary text-white' />
        <Button isCancel text='Rejeter' className='bg-custom-primary text-white' />
      </div>
    </div>
  )
}
