import { toast } from 'sonner';
import { TGroupDB } from '@/types/types';

export const getLastStatusSeen = () => {
  const localStoredLastStatusSeen = localStorage.getItem('lastStatusSeen');
  if (!localStoredLastStatusSeen) return [];
  return JSON.parse(localStoredLastStatusSeen || '{}') as {
    groupId: number;
    status: 'posting' | 'voting' | 'ended';
  }[];
};

export const updateLastStatusSeen = ({
  groupId,
  newStatus,
}: {
  groupId: number;
  newStatus: 'posting' | 'voting' | 'ended';
}) => {
  let lastStatusSeen = getLastStatusSeen();
  if (!lastStatusSeen) lastStatusSeen = [];
  const newLastStatusSeen = lastStatusSeen.filter(
    status => status.groupId !== groupId,
  );
  newLastStatusSeen.push({ groupId, status: newStatus });
  localStorage.setItem('lastStatusSeen', JSON.stringify(newLastStatusSeen));
};

export const addLastStatusSeenToGroups = ({
  groups,
}: {
  groups: TGroupDB[];
}): TGroupDB[] => {
  let groupsToReturn = groups;
  try {
    const lastStatusSeen = getLastStatusSeen();
    if (!lastStatusSeen.length) return groups;
    const groupsWLastSeenStatus = groups.map(group => {
      const lastStatus = lastStatusSeen.find(
        status => status.groupId === group.id,
      );
      if (lastStatus) {
        if (lastStatus.status !== group.challengeStatus) {
          return { ...group, hasNewStatus: true };
        }
      }
      return group;
    });
    groupsToReturn = groupsWLastSeenStatus;
  } catch (error) {
    console.error(error);
  } finally {
    return groupsToReturn;
  }
};
