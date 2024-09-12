"use client";
import KapsBox from '@/components/KapsBox';
import { useUser } from '@/contexts/user-context';
import { mockedKaps } from '@/libs/mockedKaps';
import { TKaps } from '@/types/Kaps';
import { ChevronLeft, SettingsIcon, Users } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useRerender from '../app/store/useRerender';
import Button from '../components/Button';
import CategoriesFilter from '../components/CategoriesFilter';
import { ScrollArea } from '../components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { UserCard } from '../components/UserCard';
import { getMyFriends } from '../functions/supabase/post/user/friend-request';
import { signoutSupabase } from '../functions/supabase/signout-supabase';
import { mockedCategories } from '../libs/mockedCategories';
import { TUserFriend } from '../types';

const ProfileScreen = ({ friendsCount }: { friendsCount: number }) => {
  const { userData } = useUser();
  const { username, name } = userData
  const [friends, setFriends] = useState<TUserFriend[]>([])
  const [kaps] = useState<TKaps[]>(mockedKaps.slice(0, 2))
  const { render } = useRerender()
  const [open, setOpen] = useState(false)

  const handleSignOut = async () => {
    await signoutSupabase()
  }

  const handleGetMyFriends = async () => {

    const { data, error } = await getMyFriends()
    if (error) {
      console.error(error)
      return
    }
    data && setFriends(data)
  }

  useEffect(() => {
    handleGetMyFriends()
  }, [])

  return (
    <div className="w-full flex flex-col items-center mb-32 px-2">
      <div className='flex w-full justify-end px-4 gap-x-4'>
        <Sheet onOpenChange={setOpen} open={open} >
          <SheetTrigger>
            <Users />
          </SheetTrigger>
          <SheetContent className='w-screen bg-gradient-linear'>
            <SheetClose className='flex items-center gap-x-1 pb-4'>
              <ChevronLeft />
              Retour
            </SheetClose>
            <ScrollArea className='h-screen'>
              <SheetHeader className='mt-2'>
                <SheetTitle>Mes amis</SheetTitle>
                <div className='flex flex-col gap-y-4 pt-6'>

                  {
                    friends?.map((friend, i) => (
                      <CardFriend friend={friend} key={i} />
                    ))}
                  {friends.length == 0 && <div>
                    <p className='text-center mb-4'>Vous n'avez pas encore d'amis</p>
                    <Button asLink url='/kaps' text='Ajouter des amis' className='w-full' />
                  </div>
                  }
                </div>

              </SheetHeader>
            </ScrollArea>
          </SheetContent>
        </Sheet>

        <SettingsIcon size={24} className='text-custom-black font-bold' />
      </div>

      <div className='flex flex-col items-center'>
        <Image src={userData.avatar_url ?? ""} alt={name ?? ""} width={70} height={70}
          className='rounded-full my-2 w-24 h-24 object-cover border-2 border-custom-primary bg-custom-white'
        />
        <h2 className='font-champ text-custom-black text-[16px]' > {name || username || ""}</h2>
        <p className='text-[10px] text-slate-400'>@{username}</p>
        <button className=' flex flex-col items-center gap-x-12 my-4' onClick={() => setOpen(true)}>
          <p>
            Amis
          </p>
          <h2 className='font-champ text-custom-black text-[16px]'>{friendsCount}</h2>
        </button>
      </div>
      <div className='w-full flex flex-col my-4'>
        <h2 className='font-champ text-custom-black text-[22px]'>Kaps</h2>
        <CategoriesFilter categories={mockedCategories} withAdmin={true} />
        <div className='gap-y-2'>
          {
            kaps.map((kap, i) => (
              <KapsBox key={kap.id} kaps={kap} className='my-4' />
            ))
          }
        </div>
      </div>
      <Button className='w-fit' text="Se déconnecter" onClick={handleSignOut} />

    </div>
  )
}

export default ProfileScreen;

const CardFriend = ({ friend }: { friend: TUserFriend }) => {
  const { userData } = useUser();

  const { id: user_id } = userData
  const { accept_user, request_user, user_a, user_r } = friend
  console.log({ accept_user, request_user, user_a, user_r })
  const userUsed = user_a?.id == user_id ? user_r : user_a
  const { avatar_url, name, username, id } = userUsed ?? {}

  return (
    id && <UserCard isOnProfile avatar_url={avatar_url ?? "/mrderka.png"} name={name ?? ""} username={username ?? ""} friendStatus={"accepted"} user_id={id} />
  )
}
