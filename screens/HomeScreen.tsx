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
import { useRouter } from 'next/navigation';

const HomeScreen = () => {
  const [isLoadingGettingGroup, setIsLoadingGettingGroup] = useState(true);
  const [inviteCodeJoin, setInviteCodeJoin] = useState<string>('');
  const router = useRouter();

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
    if (error) {
      console.error(error);
      toast.error('Erreur lors de la récupération des groupes');
    }
    if (data) setGroups(data);
  };

  const handleJoinGroup = async () => {
    const { data, error } = await joinGroup({ invite_code: inviteCodeJoin });
    if (!error) {
      toast.success('Vous avez rejoint le groupe avec succès');
      setInviteCodeJoin('');
      router.push(`/groupe/${data?.id}`);
    }
    if (error) return console.error(error);
  };

  useEffect(() => {
    handleGetGroups();
  }, []);

  return (
    <div className="w-full flex flex-col items-center relative flex-1 no-scrollbar">
      <div className="w-full flex justify-end p-8 h-[10vh]">
        <Link href={'/profile'} className="flex items-center gap-x-2">
          <User size={24} />
        </Link>
      </div>

      <PullToRefresh
        className="no-scollbar w-full h-[90vh]"
        pullingContent={''}
        onRefresh={handleRefresh}
      >
        <div className="flex flex-col w-full gap-4 h-[90vh] relative">
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
                <Input
                  placeholder="Code d'invitation"
                  value={inviteCodeJoin}
                  onChange={e => setInviteCodeJoin(e.target.value)}
                />
                <Button text="Rejoindre" onClick={handleJoinGroup} />
              </div>
            </DrawerComponent>
          </div>
          <div className="before:absolute before:left-0 before:top-16 before:z-[2] before:w-full before:h-[30px] before:bg-gradient-to-b before:from-[#f2daf0] before:to-[#f2daf0]/0 before:content-['']">
          </div>
          <div className='w-full h-full overflow-scroll no-scrollbar'>
            <GroupList groups={groups} isLoadding={isLoadingGettingGroup} />
          </div>
        </div>
      </PullToRefresh>
    </div>
  );
};

export default HomeScreen;
