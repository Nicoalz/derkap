import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

import { Input } from '@/components/ui/input';
import SheetComponent from './SheetComponent';
import Button from './Button';
import { TGroupDB } from '@/types/types';
import { toast } from 'sonner';
import { deleteGroup, leaveGroup } from '@/functions/group-action';
import Image from 'next/image';

interface GroupeHeaderProps {
  groupeData?: TGroupDB;
  children?: React.ReactNode;
  link?: string;
}

const GroupeHeader: React.FC<GroupeHeaderProps> = ({
  groupeData,
  children,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [, setIsInfoChanged] = useState<boolean>(false);
  const [groupeName, setGroupeName] = useState(groupeData?.name || '');
  const router = useRouter();

  const membresGroup = groupeData?.members.filter(
    (member, index, self) =>
      index === self.findIndex(t => t.profile?.id === member.profile?.id),
  );

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Rejoignez notre Groupe',
          text: `Rejoignez notre groupe "${groupeData?.name}" sur Derkap ! Le code d'accès est ${groupeData?.invite_code}`,
          url: `https://derkap.vercel.app/groupe/${groupeData?.id}`,
        })
        .catch(() => toast.error('Erreur lors du partage'));
    } else {
      toast.error("L'API Web Share n'est pas supportée dans ce navigateur.");
    }
  };

  const handleSubmit = () => {
    if (groupeName) {
      toast.success('Informations mises à jour');
      setIsEditing(false);
    } else {
      toast.error('Veuillez remplir tous les champs');
    }
  };

  const handleDeleteGroup = async () => {
    if (!groupeData?.id) {
      return;
    }
    const { error } = await deleteGroup({ group_id: groupeData.id });
    if (!error) {
      router.push('/');
      return toast.success('Groupe supprimé avec succès');
    }
    if (error) return toast.error("Une erreur s'est produite...");
  };

  const handleLeaveGroup = async () => {
    if (!groupeData?.id) {
      return;
    }
    const { error } = await leaveGroup({ group_id: groupeData.id?.toString() });
    if (!error) {
      router.push('/');
      return toast.success('Groupe quitté avec succès');
    }
    if (error) return toast.error("Une erreur s'est produite...");
  };

  const createAt = () => {
    const date = new Date(groupeData?.created_at ?? '');
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <header className="w-full flex justify-between items-center p-4 h-fit relative">
      <div className="flex items-center gap-x-2" onClick={() => router.back()}>
        <ChevronLeft size={24} />
      </div>

      <SheetComponent
        trigger={
          <h1 className="abs-center font-champ text-xl tracking-wider capitalize max-w-52 text-wrap overflow-hidden text-ellipsis text-center">
            {groupeData?.name}
          </h1>
        }
        title="Info du Groupe"
      >
        <div className="flex flex-col justify-between gap-2 h-full">
          {isEditing ? (
            <div className="h-full flex flex-col gap-4 items-start justify-between">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <p>Nom du groupe</p>
                <Input
                  type="name"
                  id="name"
                  placeholder="DerkapUser"
                  value={groupeName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setGroupeName(e.target.value);
                    setIsInfoChanged(true);
                  }}
                />
              </div>
              <Button
                text="Supprimer le groupe"
                className="w-full bg-red-500"
                onClick={handleDeleteGroup}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {groupeData?.img_url ? (
                <Image
                  src={groupeData?.img_url}
                  alt="Logo Groupe"
                  width={24}
                  className="w-24 h-24 rounded-full border bg-custom-white"
                />
              ) : (
                <div className="flex items-center justify-center w-24 h-24 rounded-full border bg-custom-white">
                  <p>{groupeData?.name.charAt(0)}</p>
                </div>
              )}

              <p className="text-center text-lg font-semibold">
                {groupeData?.name}
              </p>
              <span className="text-gray-500 text-sm">
                {membresGroup?.length}
                /10 memebres
              </span>
              <div className="flex flex-col items-center mt-32 gap-4">
                <h2 className="text-3xl">Code d&apos;accès</h2>
                <h3 className="text-xl font-bold font-champ">
                  {groupeData?.invite_code}
                </h3>
                <Button text="Partager" onClick={handleShare} />
              </div>
            </div>
          )}

          <div className="flex gap-2">
            {isEditing ? (
              <Button
                text="Modifier"
                className="w-full"
                onClick={handleSubmit}
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

      {children}
    </header>
  );
};

export default GroupeHeader;
