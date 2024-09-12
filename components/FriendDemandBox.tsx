'use client';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { acceptFriend, rejectFriend } from '../functions/supabase/post/user/friend-request';
import useRerender from '../libs/store/useRerender';
import { cn } from '../libs/utils';
import { TFriendshipDB } from '../types';
import Button from './Button';

interface FriendDemandBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  request: TFriendshipDB
}

export default function FriendDemandBox({ request, className, ...props }: FriendDemandBoxProps) {
  const { username, avatar_url, name } = request.request_user ?? {}
  const requestid = request.id
  const [isAccepting, setIsAccepting] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const { rerender } = useRerender()

  const handleAccept = async () => {
    setIsAccepting(true)
    const { error } = await acceptFriend(requestid)
    if (error) {
      toast.error("Erreur lors de l'acceptation de la demande")
      setIsAccepting(false)
      return
    }
    toast.success("Demande d'amis acceptée")
    rerender()
    setIsAccepting(false)

  }

  const handleReject = async () => {
    setIsRejecting(true)
    const { error } = await rejectFriend(requestid)
    if (error) {
      toast.error("Erreur lors du rejet de la demande")
      setIsRejecting(false)
      return
    }
    rerender()
    toast.info("Demande d'amis rejetée")
  }

  return (
    <div {...props} className={cn("rounded-xl gap-x-4 items-center justify-between flex bg-white w-full p-2", className)}>
      <div className='flex items-center gap-x-4'>
        <Image src={avatar_url ?? "/mrderka.png"} alt={username ?? ""} width={60} height={60} className="rounded-xl" />

        <div className='flex flex-col'>
          <p className='text-lg font-[600]'>{name}</p>
          <p className='text-custom-primary text-xs'>@{username}</p>
        </div >
      </div >
      <div className='flex gap-x-2'>
        <Button disabled={isAccepting} text={isAccepting ? "Chargement... " : 'Accepter'} className='bg-custom-primary text-white' onClick={handleAccept} />
        <Button disabled={isRejecting} isCancel text={isRejecting ? "Chargement..." : 'Rejeter'} className='bg-custom-primary text-white' onClick={handleReject} />
      </div>
    </div>
  )
}
