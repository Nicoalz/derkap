'use client';

import Button from '@/components/Button';
import Input from '@/components/form/Input';
import {
  createGroup,
  deleteGroup,
  getGroups,
  joinGroup,
  leaveGroup,
} from '@/functions/group-action';
import { getPosts } from '@/functions/post-action';
import { getProfile } from '@/functions/profile-actions';
import { addVote, getVotes } from '@/functions/vote-action';
import { TGroupDB, TPostDB, TProfileDB, TVoteDB } from '@/types/types';
import { useState } from 'react';

export default function TestFunctionScreen() {
  const loadingText = 'Chargement...';

  const [profile, setProfile] = useState<TProfileDB>();
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  const [groups, setGroups] = useState<TGroupDB[]>();
  const [isLoadingGettingGroup, setIsLoadingGettingGroup] = useState(false);

  const [newGroup, setNewGroup] = useState<TGroupDB>();
  const [isLoadingCreatingGroup, setIsLoadingCreatingGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const [isLoadingDeletingGroup, setIsLoadingDeletingGroup] = useState(false);
  const [idGroupToDelete, setIdGroupToDelete] = useState(0);

  const [isLoadingJoiningGroup, setIsLoadingJoiningGroup] = useState(false);
  const [inviteCodeJoin, setInviteCodeJoin] = useState('');

  const [isLoadingLeavingGroup, setIsLoadingLeavingGroup] = useState(false);

  const [postsByChallenge, setPostsByChallenge] = useState<TPostDB[]>();
  const [isLoadingGettingPosts, setIsLoadingGettingPosts] = useState(false);
  const [idChallengeToGetPosts, setIdChallengeToGetPosts] = useState(0);

  const [isLoadingGettingVotes, setIsLoadingGettingVotes] = useState(false);
  const [idChallengeToGetVotes, setIdChallengeToGetVotes] = useState(0);

  const [isLoadingAddingVote, setIsLoadingAddingVote] = useState(false);
  const [idPostToAddVote, setIdPostToAddVote] = useState(0);
  const [vote, setVote] = useState<TVoteDB[]>();

  const handleGetProfile = async () => {
    setIsLoadingProfile(true);
    // IF EMPTY, GET PROFILE OF CURRENT USER
    const { data, error } = await getProfile({});
    // OR GET PROFILE OF A SPECIFIC USER
    // const { data, error } = await getProfile({ userId: '123' });
    setIsLoadingProfile(false);
    if (error) return console.error(error);
    if (data) setProfile(data);
  };

  const handleGetGroups = async () => {
    setIsLoadingGettingGroup(true);
    // IF EMPTY, GET GROUPS OF CURRENT USER
    const { data, error } = await getGroups({});
    // OR GET GROUPS OF A SPECIFIC USER
    // const { data, error } = await getGroups({ userId: '123' });
    setIsLoadingGettingGroup(false);
    if (error) return console.error(error);
    if (data) setGroups(data);
  };

  const handleCreateGroup = async () => {
    setIsLoadingCreatingGroup(true);
    const { data, error } = await createGroup({ name: newGroupName });
    setIsLoadingCreatingGroup(false);
    if (error) return console.error(error);
    if (data) setNewGroup(data);
  };

  const handleDeleteGroup = async () => {
    setIsLoadingDeletingGroup(true);
    const { error } = await deleteGroup({ group_id: idGroupToDelete });
    setIsLoadingDeletingGroup(false);
    if (error) return console.error(error);
  };

  const handleJoinGroup = async () => {
    setIsLoadingJoiningGroup(true);
    const { error } = await joinGroup({ invite_code: inviteCodeJoin });
    setIsLoadingJoiningGroup(false);
    if (error) return console.error(error);
  };

  const handleLeaveGroup = async () => {
    setIsLoadingLeavingGroup(true);
    const { error } = await leaveGroup({ group_id: inviteCodeJoin });
    setIsLoadingLeavingGroup(false);
    if (error) return console.error(error);
  };

  const handleGetVotes = async () => {
    setIsLoadingGettingVotes(true);

    // GET ALL VOTES OF A SPECIFIC CHALLENGE
    const { data, error } = await getVotes({
      challenge_id: idChallengeToGetVotes,
    });
    setIsLoadingGettingVotes(false);
    if (error) return console.error(error);
    if (data) setVote(data);
  };

  const handleGetPosts = async () => {
    setIsLoadingGettingPosts(true);
    // GET ALL POSTS OF A SPECIFIC CHALLENGE
    const { data, error } = await getPosts({
      challenge_id: idChallengeToGetPosts,
    });
    setIsLoadingGettingPosts(false);
    if (error) return console.error(error);
    if (data) setPostsByChallenge(data);
  };

  const handleAddVote = async () => {
    setIsLoadingAddingVote(true);
    // ADD VOTE FOR A SPECIFIC POST
    // EACH USER CAN VOTE FOR ONE POST BY CHALLENGE
    // IF USER VOTE FOR ANOTHER POST, THE PREVIOUS VOTE IS DELETED
    // const { error } = await addVote({ post_id: idPostToAddVote });
    // setIsLoadingAddingVote(false);
    // if (error) return console.error(error);
  };

  return (
    <div className="p-3">
      <h2 className=" font-champ text-lg"> TESTER LES FONCTIONS DB</h2>
      <div className="flex flex-col gap-y-2 mt-8">
        <h3 className="font-champ">Profile</h3>
        <Button
          disabled={isLoadingProfile}
          className="w-fit disabled:bg-gray-400"
          text={isLoadingProfile ? loadingText : 'Get Profile'}
          onClick={handleGetProfile}
        />
        {profile && (
          <pre className="bg-white max-h-[700px] overflow-auto">
            {JSON.stringify(profile, null, 2)}
          </pre>
        )}
      </div>

      <div className="flex flex-col gap-y-2 mt-8">
        <h3 className="font-champ">Group</h3>
        <Button
          disabled={isLoadingGettingGroup}
          className="w-fit disabled:bg-gray-400"
          text={isLoadingGettingGroup ? loadingText : 'Get Groups'}
          onClick={handleGetGroups}
        />
        <pre className="bg-white max-h-[700px] overflow-auto">
          {JSON.stringify(groups, null, 2)}
        </pre>

        <div className="flex gap-x-4">
          <Input
            className="w-fit"
            placeholder="Group Name"
            onChange={e => setNewGroupName(e.target.value)}
          />
          <Button
            disabled={isLoadingCreatingGroup}
            className="w-fit disabled:bg-gray-400"
            text={isLoadingCreatingGroup ? loadingText : 'Create Goup'}
            onClick={handleCreateGroup}
          />
        </div>
        <pre className="bg-white max-h-[700px] overflow-auto">
          {JSON.stringify(newGroup, null, 2)}
        </pre>

        <div className="flex gap-x-4">
          <Input
            className="w-fit"
            placeholder="Invite Code"
            onChange={e => setInviteCodeJoin(e.target.value)}
          />
          <Button
            disabled={isLoadingJoiningGroup}
            className="w-fit disabled:bg-gray-400"
            text={isLoadingJoiningGroup ? loadingText : 'Join Goup'}
            onClick={handleJoinGroup}
          />
        </div>

        <div className="flex gap-x-4">
          <Input
            className="w-fit"
            placeholder="Group ID"
            onChange={e => setInviteCodeJoin(e.target.value)}
          />
          <Button
            disabled={isLoadingLeavingGroup}
            className="w-fit disabled:bg-gray-400"
            text={isLoadingLeavingGroup ? loadingText : 'Leave Goup'}
            onClick={handleLeaveGroup}
          />
        </div>

        <div className="flex gap-x-4">
          <Input
            className="w-fit max-w-[100px]"
            placeholder="Group ID"
            onChange={e => setIdGroupToDelete(Number(e.target.value))}
          />
          <Button
            disabled={isLoadingDeletingGroup}
            className="w-fit disabled:bg-gray-400"
            text={isLoadingDeletingGroup ? loadingText : 'Delete Goup'}
            onClick={handleDeleteGroup}
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-2 mt-8">
        <h3 className="font-champ">Posts</h3>
        <div className="flex gap-x-4">
          <Input
            className="w-fit max-w-[120px]"
            placeholder="Challenge ID"
            onChange={e => setIdChallengeToGetPosts(Number(e.target.value))}
          />
          <Button
            disabled={isLoadingGettingPosts}
            className="w-fit disabled:bg-gray-400"
            text={isLoadingGettingPosts ? loadingText : 'Get Challenge Posts'}
            onClick={handleGetPosts}
          />
        </div>
        <pre className="bg-white max-h-[700px] overflow-auto">
          {JSON.stringify(postsByChallenge, null, 2)}
        </pre>
      </div>

      <div className="flex flex-col gap-y-2 mt-8">
        <h3 className="font-champ">Votes</h3>
        <div className="flex gap-x-4">
          <Input
            className="w-fit max-w-[120px]"
            placeholder="Challenge ID"
            onChange={e => setIdChallengeToGetVotes(Number(e.target.value))}
          />
          <Button
            disabled={isLoadingGettingVotes}
            className="w-fit disabled:bg-gray-400"
            text={isLoadingGettingVotes ? loadingText : 'Get Challenge Votes'}
            onClick={handleGetVotes}
          />
        </div>
        <pre className="bg-white max-h-[700px] overflow-auto">
          {JSON.stringify(vote, null, 2)}
        </pre>
        <div className="flex gap-x-4">
          <Input
            className="w-fit max-w-[100px]"
            placeholder="Post ID"
            onChange={e => setIdPostToAddVote(Number(e.target.value))}
          />
          <Button
            disabled={isLoadingAddingVote}
            className="w-fit disabled:bg-gray-400"
            text={isLoadingAddingVote ? loadingText : 'Add Vote for Post'}
            onClick={handleAddVote}
          />
        </div>
      </div>
    </div>
  );
}
