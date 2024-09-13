import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';

import SheetComponent from './SheetComponent';
import Button from './Button';

interface GroupeHeaderProps {
  title: string;
  children?: React.ReactNode;
  link?: string;
}

const GroupeHeader: React.FC<GroupeHeaderProps> = ({ title, children }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Rejoignez notre Groupe',
          text: `Rejoignez notre groupe "${title}" sur notre application !`,
          url: window.location.href,
        })
        .then(() => console.log('Partage réussi'))
        .catch(error => console.log('Erreur lors du partage', error));
    } else {
      console.log("L'API Web Share n'est pas supportée dans ce navigateur.");
    }
  };

  return (
    <header className="w-full flex justify-between items-center p-6 md:px-12 h-fit relative">
      <Link href={'/'} className="flex items-center gap-x-2">
        <ChevronLeft size={24} />
      </Link>

      <SheetComponent
        trigger={
          <h1 className="abs-center font-champ text-xl tracking-wider capitalize max-w-52 text-wrap overflow-hidden text-ellipsis text-center">
            {title}
          </h1>
        }
        title="Info du Groupe"
      >
        <div className="flex flex-col justify-between h-full">
          {isEditing ? (
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <p>Nom du groupe</p>
              <Input type="name" id="name" placeholder="My Groupe Name" />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <img
                src="https://picsum.photos/80"
                alt="Logo Groupe"
                className="w-32 rounded-full"
              />
              <p className="text-center text-lg font-semibold">{title}</p>
              <span className="text-gray-500 text-sm">9/10 memebres</span>
              <div className="flex flex-col items-center mt-32 gap-4">
                <h2 className="text-3xl">Code d'accès</h2>
                <h3 className="text-xl font-bold font-champ">23SFR4</h3>
                <Button text="Partager" onClick={handleShare} />
              </div>
            </div>
          )}

          <div className="flex gap-2">
            {isEditing ? (
              <Button
                text="Sauvegarder"
                className="w-full"
                onClick={() => setIsEditing(!isEditing)}
              />
            ) : (
              <>
                <Button
                  text="Modifier"
                  className="w-full"
                  onClick={() => setIsEditing(!isEditing)}
                />
                <Button text="Quitter" className="w-full bg-red-500" />
              </>
            )}
          </div>
        </div>
      </SheetComponent>

      {children}
    </header>
  );
};

export default GroupeHeader;
