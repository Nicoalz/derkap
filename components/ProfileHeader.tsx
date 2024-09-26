import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ChevronLeft, Ellipsis, ImageIcon, LogOut } from 'lucide-react';

import { Input } from '@/components/ui/input';
import SheetComponent from './SheetComponent';
import { TProfileDB } from '@/types/types';
import { signoutSupabase } from '@/functions/supabase/signout-supabase';
import Button from './Button';
import Image from 'next/image';

interface GroupeHeaderProps {
  isUserProfil: boolean;
  userData: TProfileDB;
  children?: React.ReactNode;
  link?: string;
}

const ProfileHeader: React.FC<GroupeHeaderProps> = ({
  isUserProfil,
  userData,
  children,
}) => {
  const [isInfoChanged, setIsInfoChanged] = useState(false);
  const [userImage, setUserImage] = useState<File | string | null>(
    userData.avatar_url,
  );
  const [preview, setPreview] = useState<string | null>(userData.avatar_url);
  const [userName, setUserName] = useState(userData.username);
  const [userEmail, setUserEmail] = useState(userData.email);
  const router = useRouter();

  const handleSignOut = async () => {
    localStorage.removeItem('groups');
    await signoutSupabase();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserImage(file);
      setPreview(URL.createObjectURL(file));
      setIsInfoChanged(true);
    }
  };

  const handleSubmit = () => {
    if (userName && userEmail && userImage) {
      toast.success('Informations mises à jour');
    } else {
      toast.error('Veuillez remplir tous les champs');
    }
  };

  const membreSince = () => {
    const date = new Date(userData.created_at);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <header className="w-full flex justify-between items-center p-4 md:px-12 h-fit relative">
      <div className="flex items-center gap-x-2" onClick={() => router.back()}>
        <ChevronLeft size={24} />
      </div>
      {isUserProfil && (
        <SheetComponent trigger={<Ellipsis />} title="Mes infos">
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-4 items-start justify-center">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <p>Mon avatar</p>
                <div className="relative w-full p-2 bg-white border rounded-lg flex flex-col gap-2 items-center justify-center">
                  {preview ? (
                    <Image
                      src={preview}
                      alt="Preview"
                      width={24}
                      height={24}
                      className="w-24 aspect-square object-cover rounded bg-white"
                    />
                  ) : (
                    <ImageIcon size={24} className="text-gray-400" />
                  )}
                  <p className="text-gray-600 text-center text-sm">
                    Changer de photo
                  </p>
                  <label
                    htmlFor="image-upload"
                    className="absolute h-full w-full"
                  ></label>
                  <Input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <p>Surnom</p>
                <Input
                  type="name"
                  id="name"
                  placeholder="DerkapUser"
                  value={userName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUserName(e.target.value);
                    setIsInfoChanged(true);
                  }}
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <p>Email</p>
                <Input
                  type="name"
                  id="name"
                  placeholder="thomas@derkap.com"
                  value={userEmail}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUserEmail(e.target.value);
                    setIsInfoChanged(true);
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-gray-600 text-center text-sm">
                Membre depuis le {membreSince()}
              </p>
              <Button
                text="Modifier"
                className={cn('w-full', !isInfoChanged && 'bg-gray-300')}
                disabled={!isInfoChanged}
                onClick={handleSubmit}
              />
              <Button
                className="w-full bg-red-500 flex items-center justify-center gap-2"
                onClick={handleSignOut}
                text={
                  <>
                    Se déconnecter
                    <LogOut size={16} />
                  </>
                }
              />
            </div>
          </div>
        </SheetComponent>
      )}
      {children}
    </header>
  );
};

export default ProfileHeader;
