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
import { getProfile } from '@/functions/profile-actions';
import { TGroupDB, TProfileDB } from '@/types/types';
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
  // const [idGroupToLeave, setIdGroupToLeave] = useState(0);

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
    </div>
  );
}
