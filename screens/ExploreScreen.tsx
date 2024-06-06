import Image from 'next/image';

const ExploreScreen: React.FC = () => {
  const communities = ['PSG', 'Foot', 'Tennis', 'Music', 'DRILLFR', "DBZ>", 'eSport World', 'ActuNews', 'Cats & the world', 'BasketTeam', "SwissTransfer", "MangaGroup", 'Vegeteam']
  const categories = ['Sport', 'Musique', 'Jeux Vidéos', 'Actualités', 'Animaux', 'Cuisine', 'Yoga', 'Méditation', 'Running', 'Cyclisme', 'Natation', 'Football', 'Basketball', 'Tennis', 'Golf', 'Rugby', 'Handball', 'Volleyball', 'MMA', 'UFC']
  return (
    <div className="w-full flex flex-col items-center mb-32">
      <input
        type="text"
        placeholder="Rechercher"
        className="w-52 p-2 border-2 border-gray-300 rounded-md my-4 "
      />
      <div className='w-full flex flex-col px-4 my-4'>
        <p className='text-xl font-bold text-custom-primary'>
          Catégories
        </p>
        <div className='w-full flex justify-start items-center flex-wrap'>
          {
            categories.map((category, i) => (
              <p className='rounded-md m-2 p-2 bg-custom-primary text-white'>
                {category}
              </p>
            ))
          }
        </div>
      </div>
      <div className='w-full flex flex-col px-4 my-4'>
        <p className='text-xl font-bold text-custom-primary'>
          Communautés
        </p>
        <div className='w-full flex justify-start items-center flex-wrap'>
          {
            communities.map((community, i) => (
              <div className='flex flex-col items-center justify-start w-16 m-2'>
                <Image key={i} src={`https://picsum.photos/20${i}`} alt='Post' width={100} height={100}
                  className='rounded-md w-16 h-16'
                />
                <p className='text-[0.5rem]'>
                  {community}
                </p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ExploreScreen;
