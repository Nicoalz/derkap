import Image from 'next/image';
import { TUser } from '../types';

const ProfileScreen: React.FC = () => {
  const user: TUser = {
    name: 'Nicolas',
    username: 'Nicoalz',
    img: 'https://picsum.photos/500',
  }
  const communities = ['IIMPACT', 'Paris 15']
  const postsAmount = 10
  return (
    <div className="w-full flex flex-col items-center mb-32">
      <div className='flex flex-col items-center'>
        <p>@{user.username}</p>
        <Image src={user.img} alt={user.name} width={70} height={70}
          className='rounded-full my-2'
        />
        <p>{user.name}</p>
        <div className='flex justify-between items-center gap-x-8 my-4'>
          <div className='flex flex-col justify-center items-center'>
            <p>Abonnés</p>
            <p>123</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <p>Abonnements</p>
            <p>102</p>
          </div>
        </div>
      </div>
      <div className='my-4'>
        <button className='bg-custom-primary text-white p-2 rounded-md'>Modifier</button>
      </div>
      <div className='w-full flex flex-col px-4 my-4'>
        <p className='text-xl font-bold text-custom-primary'>
          Mes Communautés
        </p>
        <div className='flex justify-start items-center overflow-auto'>
          {
            communities.map((community, i) => (
              <div className='flex flex-col items-center justify-center'>
                <Image key={i} src={`https://picsum.photos/20${i}`} alt='Post' width={100} height={100}
                  className='rounded-md m-2'
                />
                <p>
                  {community}
                </p>
              </div>
            ))
          }
        </div>
      </div>
      <div className='w-full flex flex-col px-4 my-4'>
        <p className='text-xl font-bold text-custom-primary'>
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
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
