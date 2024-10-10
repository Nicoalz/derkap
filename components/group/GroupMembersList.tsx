'use client';
import { cn } from '@/libs/utils';
import Link from 'next/link';
import Image from 'next/image';

import { TGroupDB } from '@/types/types';
interface GroupMembersListProps extends React.HTMLAttributes<HTMLUListElement> {
  group: TGroupDB | undefined;
}

const GroupMembersList = ({
  group,
  className,
  ...props
}: GroupMembersListProps) => {
  const LIMIT_MEMBERS_DISPLAY = 5;
  return (
    <ul
      {...props}
      className={cn(
        'list-none w-full flex items-start justify-center px-2 py-3',
        className,
      )}
    >
      {group?.members?.slice(0, LIMIT_MEMBERS_DISPLAY).map((member, index) =>
        member?.profile?.avatar_url ? (
          <div
            // href={`/profile/${member?.profile?.username}`}
            className={`flex flex-col items-center ${index !== 0 && '-ml-2'}`}
            style={{ zIndex: group?.members?.length - index }}
            key={index}
          >
            <Image
              src={member?.profile?.avatar_url}
              alt={member?.profile?.username + 'photo'}
              width={100}
              height={100}
              className={`min-w-10 min-h-10 max-h-10 max-w-10 rounded-full object-cover`}
            />
          </div>
        ) : (
          <div
            // href={`/profile/${member?.profile?.username}`}
            className={`flex flex-col items-center ${index !== 0 && '-ml-2'}`}
            style={{ zIndex: group?.members?.length - index }}
            key={index}
          >
            <p className="flex items-center justify-center w-10 h-10 rounded-full border bg-custom-white">
              {member?.profile?.username?.charAt(0)}
            </p>
          </div>
        ),
      )}

      {group?.members && group?.members?.length > LIMIT_MEMBERS_DISPLAY && (
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border border-custom-black rounded-full -ml-2 flex items-center justify-center">
            <p className="text-lg text-custom-black">
              +{group?.members.length ? -LIMIT_MEMBERS_DISPLAY : 0}
            </p>
          </div>
        </div>
      )}
    </ul>
  );
};

export default GroupMembersList;
