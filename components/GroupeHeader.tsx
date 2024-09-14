import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

import { Input } from '@/components/ui/input';
import SheetComponent from './SheetComponent';
import Button from './Button';
import { TGroupDB } from '@/types/types';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

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
  const [isInfoChanged, setIsInfoChanged] = useState<boolean>(false);
  const [groupeName, setGroupeName] = useState(groupeData?.name);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Rejoignez notre Groupe',
          text: `Rejoignez notre groupe "${groupeData?.name}" sur Derkap ! Le code d'accès est ${groupeData?.invite_code}`,
          url: window.location.href,
        })
        .then(() => console.log('Partage réussi'))
        .catch(error => console.log('Erreur lors du partage', error));
    } else {
      console.log("L'API Web Share n'est pas supportée dans ce navigateur.");
    }
  };

  const handleSubmit = () => {
    if (groupeName) {
      toast.success('Informations mises à jour');
    } else {
      toast.error('Veuillez remplir tous les champs');
    }
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
    <header className="w-full flex justify-between items-center p-6 md:px-12 h-fit relative">
      <Link href="/" className="flex items-center gap-x-2">
        <ChevronLeft size={24} />
      </Link>

      <SheetComponent
        trigger={
          <h1 className="abs-center font-champ text-xl tracking-wider capitalize max-w-52 text-wrap overflow-hidden text-ellipsis text-center">
            {groupeData?.name}
          </h1>
        }
        title="Info du Groupe"
      >
        <div className="flex flex-col justify-between h-full">
          {isEditing ? (
            <div className="flex flex-col gap-4 items-start justify-center">
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
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <img
                src="https://picsum.photos/80"
                alt="Logo Groupe"
                className="w-32 rounded-full"
              />
              <p className="text-center text-lg font-semibold">
                {groupeData?.name}
              </p>
              <span className="text-gray-500 text-sm">9/10 memebres</span>
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
                className={cn('w-full', !isInfoChanged && 'bg-gray-300')}
                disabled={!isInfoChanged}
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
                  <Button text="Quitter" className="w-full bg-red-500" />
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
