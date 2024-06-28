"use client";
import Image from 'next/image';

import { useUser } from '../contexts/user-context';
const ProfileScreen: React.FC = () => {
  const { userData } = useUser();
  const communities = ['IIMPACT', 'Paris 15']
  const postsAmount = 10

  return (
    <div className="w-full flex flex-col items-center mb-32">
      <div className='flex flex-col items-center'>
        <Image src={userData.avatar_url ?? ""} alt={userData.name ?? ""} width={70} height={70}
          className='rounded-full my-2 w-20 h-20 object-cover border-2 border-custom-primary'
        />
        <p className='text-champ tracking-widest'>{userData.username}</p>
        <p className='text-[10px] text-slate-400'>@{userData.username}</p>
        <div className='flex justify-between items-center gap-x-8 my-4'>
          <div className='flex flex-col justify-center items-center'>
            <p className='font-semibold text-dmsans'>123</p>
            <p>Followers</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <p className='font-semibold text-dmsans'>102</p>
            <p>Suivi(e)s</p>
          </div>
        </div>
      </div>
      <div className='my-4'>
        <button className='bg-custom-primary text-white p-2 rounded-md text-champ tracking-wider'>Créer ma communauté</button>
      </div>
      <div className='w-full flex flex-col px-4 my-4'>
        <p className='text-xl font-bold text-custom-primary'>
          Mes Communautés
        </p>
        <div className='flex justify-start items-center overflow-auto gap-2'>
          {
            communities.map((community, i) => (
              <div className='flex flex-col items-center justify-center h-64 relative'>
                <Image
                  key={i}
                  src={`https://picsum.photos/20${i}`}
                  alt='Post'
                  width={150}
                  height={300}
                  className='rounded-md m-2 h-full w-full object-cover'
                />
                <div className='w-full h-full absolute inset-0 flex flex-col justify-end text-white p-4'>
                  <p className='text-[12px]'>
                    {community}
                  </p>
                  <p className='text-[10px]'>
                    Catégorie de la communauté
                  </p>
                  <p className='text-[6px] text-slate-400'>
                    @créateur
                  </p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className='w-full flex flex-col px-4 my-4'>
        <p className='text-xl font-bold text-custom-primary'>
          Liste communauté inscrite
        </p>
        <div className='flex justify-start items-center overflow-auto gap-2'>
          {
            communities.map((community, i) => (
              <div className='flex flex-col items-center justify-center h-64 relative'>
                <Image
                  key={i}
                  src={`https://picsum.photos/20${i}`}
                  alt='Post'
                  width={150}
                  height={300}
                  className='rounded-md m-2 h-full w-full object-cover'
                />
                <div className='w-full h-full absolute inset-0 flex flex-col justify-end text-white p-4'>
                  <p className='text-[12px]'>
                    {community}
                  </p>
                  <p className='text-[10px]'>
                    Catégorie de la communauté
                  </p>
                  <p className='text-[6px] text-slate-400'>
                    @créateur
                  </p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className='w-full flex flex-col px-4 my-4'>
        {/* <p className='text-xl font-bold text-custom-primary'>
          Mes Posts
        </p>
        <div className='flex justify-start items-center overflow-auto'>
          {
            Array.from({ length: postsAmount }, (_, i) => (
              <Image key={i} src={`https://picsum.photos/120/20${i}`} alt='Post' width={100} height={200}
                className='rounded-md m-2'
              />
            ))
          }
        </div> */}
      </div>
    </div>
  );
};

export default ProfileScreen;
