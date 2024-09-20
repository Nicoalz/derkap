'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { toast } from 'sonner';
import { Plus, User } from 'lucide-react';

import { getGroups, joinGroup } from '@/functions/group-action';
import { TGroupDB } from '@/types/types';
import GroupForm from '@/components/GroupForm';
import GroupList from '@/components/GroupList';
import DrawerComponent from '@/components/DrawerComponent';
import Button from '@/components/Button';
import { Input } from '@/components/ui/input';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const HomeScreen = () => {
  const [isLoadingGettingGroup, setIsLoadingGettingGroup] = useState(true);
  const [inviteCodeJoin, setInviteCodeJoin] = useState<string>('');
  const [groups, setGroups] = useState<TGroupDB[]>([]);
  const [isCreateGroupDrawerOpen, setIsCreateGroupDrawerOpen] =
    useState<boolean>(false);
  const [isJoinGroupDrawerOpen, setIsJoinGroupDrawerOpen] =
    useState<boolean>(false);

  const router = useRouter();

  const handleRefresh = async () => {
    handleGetGroups();
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
    if (error) {
      toast.error("Code d'invitation invalide");
      return console.error(error);
    }
  };

  useEffect(() => {
    handleGetGroups();
  }, []);

  return (
    <PullToRefresh
      className="w-full flex flex-col items-center flex-1 no-scrollbar relative"
      pullingContent={''}
      onRefresh={handleRefresh}
    >
      <>
        <header className="w-full flex items-center justify-between p-4 gap-2 h-[10vh]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="p-1 bg-custom-primary text-custom-white rounded-full">
                <Plus size="24" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => setIsCreateGroupDrawerOpen(true)}
              >
                Créer un groupe
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsJoinGroupDrawerOpen(true)}>
                Rejoindre un groupe
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href={'/profile'} className="flex items-center gap-x-2">
            <User size={24} />
          </Link>

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
        </header>

        <div className="before:absolute before:left-0 before:top-[4.5rem] before:z-[2] before:w-full before:h-[40px] before:bg-gradient-to-b before:from-[#f1d8f2] before:to-[#f1d8f2]/0 before:content-['']"></div>
        <div className="flex flex-col w-full h-[90vh]">
          <GroupList
            groups={groups}
            isLoadding={isLoadingGettingGroup}
            setIsCreateGroupDrawerOpen={setIsCreateGroupDrawerOpen}
            setIsJoinGroupDrawerOpen={setIsJoinGroupDrawerOpen}
          />
        </div>
      </>
    </PullToRefresh>
  );
};

export default HomeScreen;
