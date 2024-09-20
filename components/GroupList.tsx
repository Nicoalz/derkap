import { TGroupDB } from '@/types/types';
import Link from 'next/link';
import { toast } from 'sonner';
import { SquareArrowOutUpRight } from 'lucide-react';

import { Separator } from './ui/separator';
import { Skeleton } from './ui/skeleton';
import Button from './Button';

const GroupList = ({
  groups,
  isLoadding,
  setIsCreateGroupDrawerOpen,
  setIsJoinGroupDrawerOpen,
}: {
  groups: TGroupDB[];
  isLoadding: boolean;
  setIsCreateGroupDrawerOpen: (value: boolean) => void;
  setIsJoinGroupDrawerOpen: (value: boolean) => void;
}) => {
  const limitElements = 5;

  const myGroup = groups.filter(
    (group, index, self) => index === self.findIndex(t => t.id === group.id),
  );
  const membresGroup = myGroup.map(group => {
    const membres = group.members.filter(
      (member, index, self) =>
        index === self.findIndex(t => t.profile?.id === member.profile?.id),
    );
    return { ...group, members: membres };
  });
  const handleShare = ({
    title,
    id,
    invite_code,
  }: {
    title: string;
    id: number;
    invite_code: string;
  }) => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Rejoignez mon Groupe sur Derkap !',
          text: `Rejoignez notre groupe "${title}" sur Derkap ! Le code d'accès est ${invite_code}`,
          url: `https://derkap.vercel.app/groupe/${id}`,
        })
        .catch(error => console.log('Erreur lors du partage', error));
    } else {
      toast.info('Votre navigateur ne supporte pas le partage');
    }
  };

  if (isLoadding) {
    return (
      <div className="w-full h-full overflow-scroll no-scrollbar flex flex-col gap-4 p-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`flex flex-col gap-4 w-full px-4 bg-custom-white border border-custom-black rounded-xl py-4 text-custom-black shadow-element ${index === membresGroup.length - 1 && 'mb-16'}`}
          >
            <div className="flex gap-4 items-center justify-start relative w-full">
              <Skeleton className="w-16 h-16 rounded" />
              <Skeleton className="w-48 h-8" />
              <Button
                text={<SquareArrowOutUpRight size={14} />}
                className="absolute right-0 rounded-full aspect-square px-2 py-2"
              />
            </div>
            <Separator className="w-full bg-gray-400" />
            <ul className="list-none flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  className={`flex flex-col items-center ${index !== 0 && '-ml-2'}`}
                  style={{ zIndex: 5 - index }}
                  key={index}
                >
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-scroll no-scrollbar flex flex-col gap-4 p-4">
      {myGroup.length === 0 ? (
        <div className='h-full flex flex-col items-center justify-between'>
          <div></div>
          <div className='flex flex-col gap-2 items-center justify-center'>
            <p className='text-xs'>Pas de groupe pour le moment...</p>
            <p className='font-champ text-4xl text-center'>Créez en un dès maintenant !</p>
          </div>
          <div className='w-full flex gap-2 items-center justify-center'>
            <Button
              text="Créer un groupe"
              className="focus:outline-none focus:ring focus:ring-violet-300 w-full"
              onClick={() => setIsCreateGroupDrawerOpen(true)}
            />
            <Button
              text="Rejoindre un groupe"
              className="focus:outline-none focus:ring focus:ring-violet-300 w-full"
              onClick={() => setIsJoinGroupDrawerOpen(true)}
            />
          </div>
        </div>
      ) : (
        <>
          {membresGroup.map((group, index) => (
            <Link
              href={`/groupe/${group.id}`}
              key={group.id}
              className={`flex flex-col gap-4 w-full px-4 bg-custom-white border border-custom-black rounded-xl py-4 text-custom-black shadow-element ${index === membresGroup.length - 1 && 'mb-16'}`}
            >
              <div className="flex gap-4 items-center justify-start relative w-full">
                {group.img_url ? (
                  <img
                    src={group.img_url}
                    alt={group.name}
                    className="w-16 h-16 rounded"
                  />
                ) : (
                  <div className="flex items-center justify-center border rounded w-16 h-16">
                    <p>
                      {group.name
                        .split(' ')
                        .map(word => word.charAt(0))
                        .join('')}
                    </p>
                  </div>
                )}

                <span className="text-xl font-semibold max-w-48 overflow-hidden truncate">
                  {group.name}
                </span>
                <Button
                  text={<SquareArrowOutUpRight size={14} />}
                  className="absolute right-0 rounded-full aspect-square px-2 py-2 focus:outline-none focus:ring focus:ring-violet-300"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleShare({
                      title: group.name,
                      id: group.id,
                      invite_code: group.invite_code ?? '',
                    });
                  }}
                />
              </div>
              <Separator className="w-full bg-gray-400" />
              <ul className="list-none flex">
                {group.members
                  .filter(
                    (member, idx, self) =>
                      idx ===
                      self.findIndex(t => t.profile?.id === member.profile?.id),
                  )
                  .slice(0, limitElements)
                  .map((member, index) =>
                    member.profile?.avatar_url ? (
                      <div
                        className={`flex flex-col items-center ${index !== 0 && '-ml-2'}`}
                        style={{ zIndex: group.members.length - index }}
                        key={index}
                      >
                        <img
                          src={member.profile.avatar_url}
                          className="min-w-10 min-h-10 max-h-10 max-w-10 rounded-full"
                        />
                      </div>
                    ) : (
                      <div
                        className={`${index !== 0 && '-ml-2'}`}
                        style={{ zIndex: group.members.length - index }}
                        key={index}
                      >
                        <p className="flex items-center justify-center w-10 h-10 rounded-full border bg-custom-white">
                          {member.profile?.username?.charAt(0)}
                        </p>
                      </div>
                    ),
                  )}

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
