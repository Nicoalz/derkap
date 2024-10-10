import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SheetComponent from './SheetComponent';
import Button from './Button';
import { TGroupDB, TChallengeDB } from '@/types/types';
import { toast } from 'sonner';
import { deleteGroup, leaveGroup, updateGroup } from '@/functions/group-action';
import Image from 'next/image';
import StatusLabel from './StatusLabel';
import GroupMembersList from './group/GroupMembersList';
import { cn } from '@/lib/utils';

interface groupHeaderProps {
  groupData?: TGroupDB;
  setGroupData: (group: TGroupDB) => void;
  children?: React.ReactNode;
  link?: string;
  currentChallenge?: TChallengeDB;
}

const GroupHeader: React.FC<groupHeaderProps> = ({
  groupData,
  currentChallenge,
  setGroupData,
  children,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [, setIsInfoChanged] = useState<boolean>(false);
  const [groupName, setgroupName] = useState(groupData?.name || '');
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const membresGroup = groupData?.members.filter(
    (member, index, self) =>
      index === self.findIndex(t => t.profile?.id === member.profile?.id),
  );

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Rejoignez notre group',
          text: `Rejoignez notre group "${groupData?.name}" sur Derkap ! Le code d'accès est ${groupData?.invite_code}`,
          url: `https://derkap.vercel.app/group/${groupData?.id}`,
        })
        .catch(() => toast.error('Erreur lors du partage'));
    } else {
      toast.error("L'API Web Share n'est pas supportée dans ce navigateur.");
    }
  };

  const handleDeleteGroup = async () => {
    if (!groupData?.id) {
      return;
    }
    const { error } = await deleteGroup({ group_id: groupData.id });
    if (!error) {
      router.push('/');
      return toast.success('group supprimé avec succès');
    }
    if (error) return toast.error("Une erreur s'est produite...");
  };

  const handleLeaveGroup = async () => {
    if (!groupData?.id) {
      return;
    }
    const { error } = await leaveGroup({ group_id: groupData.id?.toString() });
    if (!error) {
      router.push('/');
      return toast.success('group quitté avec succès');
    }
    if (error) return toast.error("Une erreur s'est produite...");
  };

  const handleUpdateGroup = async () => {
    setIsUpdating(true);
    if (!groupData?.id) {
      return toast.error('group introuvable');
    }
    if (groupName === groupData?.name) {
      return toast.error('Aucune modification détectée');
    }
    const { data, error } = await updateGroup({
      group_id: groupData?.id,
      name: groupName,
    });
    if (error) {
      setIsUpdating(false);
      return toast.error('Erreur lors de la modification');
    }
    if (data) {
      setIsEditing(false);
      setIsUpdating(false);
      const newGroup = { ...groupData, name: data.name };
      setGroupData(newGroup);

      return toast.success('group modifié avec succès');
    }
  };

  const createAt = () => {
    const date = new Date(groupData?.created_at ?? '');
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isBtnDisabled =
    isUpdating || !groupName || groupName === groupData?.name;

  return (
    <header className="w-full flex justify-between items-center p-4 h-fit fixed top-0 bg-[#f1d7f3] z-10">
      <div className="flex items-center gap-x-2" onClick={() => router.back()}>
        <ChevronLeft size={24} />
      </div>

      <SheetComponent
        trigger={
          <h1 className="abs-center font-champ text-xl tracking-wider capitalize max-w-52 text-wrap overflow-hidden text-ellipsis text-center">
            {groupData?.name}
          </h1>
        }
        title="Info du group"
      >
        <div className="flex flex-col justify-between gap-2 h-full">
          {isEditing ? (
            <div className="h-full flex flex-col gap-4 items-start justify-between">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <p>Nom du group</p>
                <Input
                  type="name"
                  id="name"
                  placeholder="DerkapUser"
                  value={groupName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setgroupName(e.target.value);
                    setIsInfoChanged(true);
                  }}
                />
              </div>
              <Button
                text="Supprimer le group"
                className="w-full bg-red-500"
                onClick={handleDeleteGroup}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {groupData?.img_url ? (
                <Image
                  src={groupData?.img_url}
                  alt="Logo group"
                  width={100}
                  height={100}
                  className="w-24 h-24 rounded-full border bg-custom-white"
                />
              ) : (
                <div className="flex items-center justify-center w-24 h-24 rounded-full border bg-custom-white">
                  <p>{groupData?.name.charAt(0)}</p>
                </div>
              )}

              <p className="text-center text-lg font-semibold">
                {groupData?.name}
              </p>
              <span className="text-gray-500 text-sm">
                {membresGroup?.length}
                /10 membres
              </span>

              <GroupMembersList group={groupData} />

              <div className="flex flex-col items-center mt-32 gap-4">
                <h2 className="text-3xl">Code d&apos;accès</h2>
                <h3 className="text-xl font-bold font-champ">
                  {groupData?.invite_code}
                </h3>
                <Button text="Partager" onClick={handleShare} />
              </div>
            </div>
          )}

          <div className="flex gap-2">
            {isEditing ? (
              <Button
                text={isUpdating ? 'Chargement...' : 'Modifier'}
                className={cn('w-full', { 'bg-gray-300': isBtnDisabled })}
                disabled={isBtnDisabled}
                onClick={handleUpdateGroup}
              />
            ) : (
              <div className="w-full flex flex-col gap-4">
                <p className="text-gray-600 text-center text-sm">
                  Créé le {createAt()}
                </p>
                <div className="flex gap-2">
                  <Button
                    text="Modifier"
                    className="w-full"
                    onClick={() => setIsEditing(!isEditing)}
                  />
                  <Button
                    text="Quitter"
                    className="w-full bg-red-500"
                    onClick={handleLeaveGroup}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetComponent>

      <StatusLabel challengeStatus={currentChallenge?.status} />
    </header>
  );
};

export default GroupHeader;
