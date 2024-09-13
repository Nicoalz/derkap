"use client";
import Button from '@/components/Button';
import { useUser } from '@/contexts/user-context';
import { signoutSupabase } from '@/functions/supabase/signout-supabase';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


const ProfileScreen = () => {
  const { userData } = useUser();
  const { username, name } = userData
  const handleSignOut = async () => {
    await signoutSupabase()
  }
  return (
    <div className="w-full flex flex-col items-center mb-32">
      <div className='w-full flex justify-between  p-8 '>
        <Link href={"/"} className='flex items-center gap-x-2'>
          <ChevronLeft size={24} />
          Retour
        </Link>
      </div>
      <div className='flex flex-col items-center pt-2'>
        <Image src={userData.avatar_url ?? ""} alt={name ?? ""} width={70} height={70}
          className='rounded-full my-2 w-24 h-24 object-cover border-2 border-custom-primary bg-custom-white'
        />
        <h2 className='font-champ text-custom-black text-[16px]' > {name || username || ""}</h2>
        <p className='text-[10px] text-slate-400'>@{username}</p>
      </div >
      <Button className='w-fit' text="Se déconnecter" onClick={handleSignOut} />
    </div>
  )
}


export default ProfileScreen;
