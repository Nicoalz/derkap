'use client';

import { useState } from 'react';
import { User } from 'lucide-react';
import Link from 'next/link';
import PullToRefresh from 'react-simple-pull-to-refresh';
import GroupForm from '@/components/GroupForm';
import GroupList from '@/components/GroupList';
import DrawerComponent from '@/components/DrawerComponent';
import Button from '@/components/Button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

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

const HomeScreen = () => {
  const currentUser: Profile = {
    id: 999,
    username: 'MonProfil',
    avatar_url: 'https://via.placeholder.com/40',
  };

  const mockGroups: Group[] = [
    {
      id: 1,
      name: 'Groupe 1',
      img_url: 'https://via.placeholder.com/150',
      profiles: [
        {
          id: 1,
          username: 'Alice',
          avatar_url: 'https://via.placeholder.com/40',
        },
        {
          id: 2,
          username: 'Bob',
          avatar_url: 'https://via.placeholder.com/40',
        },
      ],
    },
    {
      id: 2,
      name: 'Groupe 2',
      img_url: 'https://via.placeholder.com/150',
      profiles: [],
    },
  ];

  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [isCreateGroupDrawerOpen, setIsCreateGroupDrawerOpen] =
    useState<boolean>(false);
  const [isJoinGroupDrawerOpen, setIsJoinGroupDrawerOpen] =
    useState<boolean>(false);

  const handleRefresh = async () => {
    console.log('refreshing');
  };

  const createGroup = (name: string, imageFile: File | null) => {
    if (imageFile) {
      const newGroup: Group = {
        id: groups.length + 1,
        name,
        img_url: URL.createObjectURL(imageFile),
        profiles: [],
      };
      setGroups([...groups, newGroup]);
    }
  };

  return (
    <div className="w-full flex flex-col items-center relative flex-1 mb-32 no-scrollbar">
      <div className="w-full flex justify-end p-8">
        <Link href={'/profile'} className="flex items-center gap-x-2">
          <User size={24} />
        </Link>
      </div>

      <PullToRefresh
        className="no-scollbar w-full"
        pullingContent={''}
        onRefresh={handleRefresh}
      >
        <div className="relative flex flex-col w-full gap-8 no-scrollbar">
          <div className="flex justify-center w-full gap-4">
            <Button
              text="Créer un groupe"
              onClick={() => setIsCreateGroupDrawerOpen(true)}
            />
            <Button
              text="Rejoindre un groupe"
              onClick={() => setIsJoinGroupDrawerOpen(true)}
            />

            <DrawerComponent
              trigger={null}
              title="Créer un groupe"
              isOpen={isCreateGroupDrawerOpen}
              onClose={() => setIsCreateGroupDrawerOpen(false)}
            >
              <GroupForm
                onCreateGroup={createGroup}
                onCloseDrawer={() => setIsCreateGroupDrawerOpen(false)}
              />
            </DrawerComponent>

            <DrawerComponent
              trigger={null}
              title="Rejoindre un groupe"
              isOpen={isJoinGroupDrawerOpen}
              onClose={() => setIsJoinGroupDrawerOpen(false)}
            >
              <div className="w-full flex flex-col p-6 gap-12 mb-12">
                <Input placeholder="Code d'invitation" />
                <Button
                  text="Rejoindre"
                  onClick={() => toast.info("La fonction n'existe pas encore")}
                />
              </div>
            </DrawerComponent>
          </div>

          <GroupList groups={groups} currentUser={currentUser} />
        </div>
      </PullToRefresh>
    </div>
  );
};

export default HomeScreen;
