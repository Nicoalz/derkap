'use client';

import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import Link from 'next/link';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { toast } from 'sonner';
import { getGroups, joinGroup } from '@/functions/group-action';
import { TGroupDB } from '@/types/types';
import GroupForm from '@/components/GroupForm';
import GroupList from '@/components/GroupList';
import DrawerComponent from '@/components/DrawerComponent';
import Button from '@/components/Button';
import { Input } from '@/components/ui/input';


const HomeScreen = () => {
  const [isLoadingGettingGroup, setIsLoadingGettingGroup] = useState(true);
  const [inviteCodeJoin, setInviteCodeJoin] = useState<string>('');

  const [groups, setGroups] = useState<TGroupDB[]>([]);
  const [isCreateGroupDrawerOpen, setIsCreateGroupDrawerOpen] =
    useState<boolean>(false);
  const [isJoinGroupDrawerOpen, setIsJoinGroupDrawerOpen] =
    useState<boolean>(false);

  const handleRefresh = async () => {
    console.log('refreshing');
  };

  const handleGetGroups = async () => {
    const { data, error } = await getGroups({});
    setIsLoadingGettingGroup(false);
    if (error)  {
      console.error(error)
      toast.error('Erreur lors de la récupération des groupes')
    }
    if (data) setGroups(data);
  };

  const handleJoinGroup = async () => {
    const { error } = await joinGroup({ invite_code: inviteCodeJoin });
    if (error) return console.error(error);
  };

  useEffect(() => {
    handleGetGroups();
  }, []);

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
                onCloseDrawer={() => setIsCreateGroupDrawerOpen(false)}
                groups={groups}
                setGroups={setGroups}
              />
            </DrawerComponent>

            <DrawerComponent
              trigger={null}
              title="Rejoindre un groupe"
              isOpen={isJoinGroupDrawerOpen}
              onClose={() => setIsJoinGroupDrawerOpen(false)}
            >
              <div className="w-full flex flex-col p-6 gap-12 mb-12">
                <Input placeholder="Code d'invitation" value={inviteCodeJoin} onChange={e => setInviteCodeJoin(e.target.value)} />
                <Button
                  text="Rejoindre"
                  onClick={handleJoinGroup}
                />
              </div>
            </DrawerComponent>
          </div>

          <GroupList groups={groups} isLoadding={isLoadingGettingGroup} />
        </div>
      </PullToRefresh>
    </div>
  );
};

export default HomeScreen;
