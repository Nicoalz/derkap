'use client';

import React, { useEffect, useState } from 'react';

import Button from '@/components/Button';
import ChallengeBox from '@/components/ChallengeBox';
import GroupeHeader from '@/components/GroupeHeader';
import { getGroup } from '@/functions/group-action';
import { TGroupDB } from '@/types/types';
import { toast } from 'sonner';

import DrawerComponent from '@/components/DrawerComponent';
import { Input } from '@/components/ui/input';
import {
  createChallenge,
  getCurrentChallenge,
} from '@/functions/challenge-action';

import { TChallengeDB, TPostDB } from '@/types/types';
import { getPosts } from '@/functions/post-action';
import NoChallenge from '@/components/group/NoChallenge';
import ChallengeFinalization from '@/components/group/ChallengeFinalization';
import GroupLoading from '@/components/group/GroupLoading';
import GroupMembersList from '@/components/group/GroupMembersList';
import ChallengeInProgress from '@/components/group/ChallengeInProgress';
import { updateLastStatusSeen } from '@/libs/lastStatusSeen';

const GroupScreen = ({ id }: { id: string }) => {
  const [isLoadding, setIsLoadding] = useState<boolean>(true);
  const [currentGroup, setCurrentGroup] = useState<TGroupDB>();
  const [currentChallenge, setCurrentChallenge] = useState<TChallengeDB>(null);
  const [currentPosts, setCurrentPosts] = useState<TPostDB[]>([]);

  const [isCreateChallengeOpen, setIsCreateChallengeOpen] =
    useState<boolean>(false);
  const [newChallengeDescription, setNewChallengeDescription] =
    useState<string>('');

  const fetchCurrentGroup = async () => {
    const { data: group, error } = await getGroup({ group_id: id });
    if (error) return toast.error('Erreur dans la récupéaration du groupe');
    if (group) setCurrentGroup(group);
  };

  const fetchCurrentChallenge = async () => {
    const { data: challenges, error } = await getCurrentChallenge({
      group_id: id,
    });
    if (error) toast.error('Erreur dans la récupéaration du défi');
    if (challenges) {
      setCurrentChallenge(challenges[0]);
      return challenges[0];
    }
  };

  const fetchCurrentPosts = async ({
    challengeId,
  }: {
    challengeId: number;
  }) => {
    const { data: posts, error } = await getPosts({
      challenge_id: challengeId,
    });
    if (error) return toast.error('Erreur dans la récupéaration des posts');
    if (posts) setCurrentPosts(posts);
  };

  const fetchAllGroupData = async () => {
    setIsLoadding(true);
    try {
      await fetchCurrentGroup();
      const challenge = await fetchCurrentChallenge();
      if (!challenge) return;
      await fetchCurrentPosts({ challengeId: challenge.id });
    } catch (error) {
    } finally {
      setIsLoadding(false);
    }
  };

  useEffect(() => {
    fetchAllGroupData();
  }, [id]);

  useEffect(() => {
    if (currentGroup?.id && currentChallenge?.status) {
      updateLastStatusSeen({
        groupId: currentGroup.id,
        newStatus: currentChallenge.status,
      });
    }
  }, [currentGroup, currentChallenge]);

  const createNewChallenge = async () => {
    try {
      if (!newChallengeDescription)
        return toast.error('Chef, tu dois écrire un défi');

      if (!currentGroup?.id) return;

      const { error } = await createChallenge({
        challenge: {
          description: newChallengeDescription,
          group_id: currentGroup.id,
        },
      });

      if (error) {
        throw new Error('');
      }
      setIsCreateChallengeOpen(false);
    } catch (error) {
      toast.error('Erreur dans la création du défi');
    } finally {
      fetchAllGroupData();
    }
  };

  if (isLoadding) {
    return <GroupLoading />;
  }

  return (
    <div className="h-screen relative">
      <GroupeHeader
        currentChallenge={currentChallenge}
        groupeData={currentGroup}
      />

      <GroupMembersList group={currentGroup} />

      <DrawerComponent
        trigger={null}
        title="Créer un défi"
        isOpen={isCreateChallengeOpen}
        onClose={() => setIsCreateChallengeOpen(false)}
      >
        <div className="w-full flex flex-col p-6 gap-12 mb-12">
          <Input
            placeholder="Description du défi"
            value={newChallengeDescription}
            onChange={e => setNewChallengeDescription(e.target.value)}
          />
          <Button text="Créer" onClick={createNewChallenge} />
        </div>
      </DrawerComponent>

      {!currentChallenge ? (
        <NoChallenge setIsCreateChallengeOpen={setIsCreateChallengeOpen} />
      ) : (
        <div className="w-full  flex flex-col items-center justify-start gap-8 px-6 py-3">
          <ChallengeBox challenge={currentChallenge} />
          {currentChallenge?.status === 'posting' && (
            <ChallengeInProgress
              challenge={currentChallenge}
              group={currentGroup}
              posts={currentPosts}
              fetchAllGroupData={fetchAllGroupData}
            />
          )}
          {(currentChallenge?.status === 'voting' ||
            currentChallenge?.status === 'ended') && (
            <ChallengeFinalization
              posts={currentPosts}
              fetchAllGroupData={fetchAllGroupData}
              challenge={currentChallenge}
              setIsCreateChallengeOpen={setIsCreateChallengeOpen}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default GroupScreen;
