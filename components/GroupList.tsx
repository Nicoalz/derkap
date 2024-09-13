interface Profile {
  id: number;
  username: string;
  avatar_url: string;
}

interface Group {
  id: number;
  name: string;
  img_url: string;
  profiles: Profile[];
}

interface GroupListProps {
  groups: Group[];
  currentUser: Profile; 
}

const GroupList: React.FC<GroupListProps> = ({ groups, currentUser }) => {
  return (
    <div className='w-full p-4'>
      {groups.length === 0 ? (
        <p className='text-center'>Pas de groupe pour l'instant</p>
      ) : (
        <ul className='space-y-4'>
          {groups.map((group) => (
            <li key={group.id} className='flex flex-col w-full px-4 bg-custom-white border border-custom-black rounded-xl py-4 text-custom-black shadow-card gap-4'>
              <div className='flex gap-4 items-center'>
                <img src={group.img_url} alt={group.name} className='w-16 h-16 rounded' />
                <span className='text-xl font-semibold'>{group.name}</span>
              </div>

              <div className='mt-2'>
                <ul className='ml-4 list-none flex gap-2'>
                  {[currentUser, ...group.profiles.filter(profile => profile.id !== currentUser.id)].map((profile) => (
                    <li key={profile.id} className='flex items-center profile-item'>
                      <span>{profile.username}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroupList;
