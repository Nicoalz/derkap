import { TGroupDB } from '@/types/types';
import Link from 'next/link';
import { SquareArrowOutUpRight } from 'lucide-react';
import { Separator } from './ui/separator';
import { Skeleton } from "./ui/skeleton"
import Button from './Button';

const GroupList = ({ groups, isLoadding }: { groups: TGroupDB[], isLoadding: boolean }) => {

  const myGroup = groups.filter((group, index, self) =>
    index === self.findIndex((t) => t.id === group.id)
  );

  const membresGroup = myGroup.map(group => {
    const membres = group.members.filter((member, index, self) =>
      index === self.findIndex((t) => t.profile?.id === member.profile?.id)
    );
    return { ...group, members: membres };
  });

  const limitElements = 5;

  const handleShare = ({ title, id }: { title: string, id: number }) => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Rejoignez mon Groupe sur Derkap !',
          text: `Rejoignez notre groupe "${title}" sur Derkap !`,
          url: `https://www.derkap.vercel.app/groupe/${id}`,
        })
        .catch(error => console.log('Erreur lors du partage', error));
    } else {
      console.log("L'API Web Share n'est pas supportée dans ce navigateur.");
    }
  };

  if (isLoadding) {
    return (
      <div className="w-full p-4 flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 w-full px-4 bg-custom-white border border-custom-black rounded-xl py-4 text-custom-black shadow-card"
          >
            <div className="flex gap-4 items-center justify-start relative w-full">
              <Skeleton
                className="w-16 h-16 rounded"
              />
              <Skeleton className="w-48 h-8" />
              <Button text={<SquareArrowOutUpRight size={14} />} className='absolute right-0 rounded-full aspect-square px-2 py-2' />
            </div>
            <Separator className="w-full bg-gray-400" />
            <ul className="list-none flex gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  className={`flex flex-col items-center ${index !== 0 && '-ml-2'}`}
                  style={{ zIndex: 5 - index }}
                  key={index}
                >
                  <Skeleton
                    className="h-10 w-10 rounded-full"
                  />
                </div>
              ))}

            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full p-4 flex flex-col gap-4">
      {myGroup.length === 0 ? (
        <p className="text-center">No groups at the moment</p>
      ) : (
        <>
          {membresGroup.map(group => (
            <Link
              href={`/groupe/${group.id}`}
              key={group.id}
              className="flex flex-col gap-4 w-full px-4 bg-custom-white border border-custom-black rounded-xl py-4 text-custom-black shadow-card"
            >
              <div className="flex gap-4 items-center justify-start relative w-full">
                <img
                  src={group.img_url ?? ''}
                  alt={group.name}
                  className="w-16 h-16 rounded"
                />
                <span className="text-xl font-semibold max-w-48 overflow-hidden truncate">{group.name}</span>
                <Button text={<SquareArrowOutUpRight size={14} />} className='absolute right-0 rounded-full aspect-square px-2 py-2' onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleShare({ title: group.name, id: group.id });
                }} />
              </div>
              <Separator className="w-full bg-gray-400" />
              <ul className="list-none flex gap-2">
                {group.members
                  .filter((member, idx, self) =>
                    idx === self.findIndex((t) => t.profile?.id === member.profile?.id)
                  )
                  .slice(0, limitElements)
                  .map((member, index) => (
                    member.profile && (
                      <div
                        className={`flex flex-col items-center ${index !== 0 && '-ml-2'}`}
                        style={{ zIndex: group.members.length - index }}
                        key={index}
                      >
                        <img
                          src={member.profile.avatar_url ?? ''}
                          className="min-w-10 min-h-10 max-h-10 max-w-10 rounded-full"
                        />
                      </div>
                    )
                  ))}

                {group.members.length > limitElements && (
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 border border-custom-black rounded-full -ml-2 flex items-center justify-center">
                      <p className="text-lg text-custom-black">
                        +{group.members.length - limitElements}
                      </p>
                    </div>
                  </div>
                )}
              </ul>

            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default GroupList;
