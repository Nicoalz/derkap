'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { toast } from 'sonner';
import { Plus, User } from 'lucide-react';
import NotificationFirstTime from '@/components/NotificationFirstTime';
import { getGroups, joinGroup } from '@/functions/group-action';
import { TGroupDB } from '@/types/types';
import GroupForm from '@/components/GroupForm';
import GroupList from '@/components/GroupList';
import DrawerComponent from '@/components/DrawerComponent';
import Button from '@/components/Button';
import { Input } from '@/components/ui/input';
import { getCurrentChallengesStatus } from '@/functions/challenge-action';
import { addLastStatusSeenToGroups } from '@/libs/lastStatusSeen';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const HomeScreen = () => {
  const [NotificationFirstTimeSeen, setNotificationFirstTimeSeen] = useState<
    'loading' | 'true' | 'false'
  >('loading');
  const [isLoadingGettingGroup, setIsLoadingGettingGroup] = useState(true);
  const [inviteCodeJoin, setInviteCodeJoin] = useState<string>('');
  const [groups, setGroups] = useState<TGroupDB[]>([]);
  const [isCreateGroupDrawerOpen, setIsCreateGroupDrawerOpen] =
    useState<boolean>(false);
  const [isJoinGroupDrawerOpen, setIsJoinGroupDrawerOpen] =
    useState<boolean>(false);
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const [isServiceWorkerReady, setServiceWorkerReady] = useState(false);
  const [isNotificationSupported, setNotificationSupported] = useState(false);
  const [permission, setPermission] = useState('default'); // 'default', 'granted', 'denied'

  const router = useRouter();

  useEffect(() => {
    const localGroups = localStorage.getItem('groups');
    if (localGroups) {
      setGroups(JSON.parse(localGroups));
      setIsLoadingGettingGroup(false);
    }
  }, []);

  const fetchStatus = async ({ groups }: { groups: TGroupDB[] }) => {
    try {
      const { data, error } = await getCurrentChallengesStatus({
        group_ids: groups.map(group => group.id),
      });
      if (error) {
        toast.error('Erreur lors de la récupération des status');
      }
      if (data) {
        const groupsWStatus = groups.map(group => {
          const status = data.find(
            challengeStatus => challengeStatus.group_id === group.id,
          );
          return {
            ...group,
            challengeStatus: status && status.status,
          };
        });
        const groupsWLastSeenStatus = addLastStatusSeenToGroups({
          groups: groupsWStatus,
        });
        setGroups(groupsWLastSeenStatus);
      }
    } catch (error) {
      toast.error('Erreur lors de la récupération des status');
    }
  };

  useEffect(() => {
    const notifSeenExpireStored = localStorage.getItem('notifSeenExpire');
    if (notifSeenExpireStored) {
      const expiry = parseInt(notifSeenExpireStored);
      // it has not expired
      if (expiry > new Date().getTime()) {
        setNotificationFirstTimeSeen('true');
        return;
      }
    }
    // if it has expired or not set
    setNotificationFirstTimeSeen('false');
  }, []);

  // Check if notifications and service workers are supported
  useEffect(() => {
    if ('serviceWorker' in navigator && 'Notification' in window) {
      setNotificationSupported(true);

      // Check for service worker readiness
      navigator.serviceWorker.ready
        .then(registration => {
          console.log('Service worker is ready:', registration);
          setServiceWorkerReady(true);
        })
        .catch(error => {
          console.error('Error with service worker readiness:', error);
        });

      // Check for current notification permission status
      setPermission(Notification.permission);
    } else {
      setNotificationSupported(false);
    }
  }, []);
  const updateNotifFirstTimeSeen = () => {
    const now = new Date();
    const expiresIn = 7 * 24 * 60 * 60 * 1000; // 7 days
    const expiry = now.getTime() + expiresIn;
    localStorage.setItem('notifSeenExpire', expiry.toString());
    setNotificationFirstTimeSeen('true');
  };

  const handleGetGroups = async () => {
    try {
      const { data, error } = await getGroups({});

      if (error) {
        toast.error('Erreur lors de la récupération des groupes');
      }
      if (data) {
        setGroups(data);
        localStorage.setItem('groups', JSON.stringify(data));
        fetchStatus({ groups: data });
      }
    } catch (error) {
      toast.error('Erreur lors de la récupération des groupes');
    } finally {
      setIsLoadingGettingGroup(false);
    }
  };

  const handleJoinGroup = async () => {
    if (isRequestInProgress) return;

    setIsRequestInProgress(true);
    const { data, error } = await joinGroup({ invite_code: inviteCodeJoin });

    if (data) {
      toast.success('Vous avez rejoint le groupe avec succès');
      setInviteCodeJoin('');
      router.push(`/groupe/${data?.id}`);
      setIsRequestInProgress(false);
    }
    if (error) return toast.error("Code d'invitation invalide");
  };

  useEffect(() => {
    handleGetGroups();
  }, []);

  return (
    <PullToRefresh
      className="w-full flex flex-col items-center flex-1 no-scrollbar relative"
      pullingContent={''}
      onRefresh={handleGetGroups}
    >
      <>
        {isNotificationSupported &&
          isServiceWorkerReady &&
          (permission === 'default' || permission === 'denied') &&
          NotificationFirstTimeSeen === 'false' && (
            <NotificationFirstTime
              updateNotifFirstTimeSeen={updateNotifFirstTimeSeen}
              permission={permission}
            />
          )}
        <header className="w-full flex items-center justify-between p-4 gap-2 h-fit min-h-[10vh]">
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
              <Button
                text={isRequestInProgress ? 'Chargement...' : 'Rejoindre'}
                onClick={handleJoinGroup}
                className={cn(
                  isRequestInProgress && 'cursor-not-allowed bg-gray-400',
                )}
                disabled={isRequestInProgress}
              />
            </div>
          </DrawerComponent>
        </header>

        <div className="absolute left-0 top-[4rem] z-[2] w-full h-4 bg-gradient-to-b from-[#f1d8f2] to-[#f1d8f2]/0 content-['']"></div>
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
