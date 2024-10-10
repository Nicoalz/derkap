import React, { useEffect, useState } from 'react';
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
import { handleAskNotification } from '@/libs/notificationHelper';
import { createSupabaseFrontendClient } from '@/libs/supabase/client';
import { useUser } from '@/contexts/user-context';
import { updateAvatarProfile } from '@/functions/profile-actions';
interface GroupeHeaderProps {
  isUserProfil: boolean;
  children?: React.ReactNode;
  link?: string;
}

const ProfileHeader: React.FC<GroupeHeaderProps> = ({
  isUserProfil,
  children,
}) => {
  const [isInfoChanged, setIsInfoChanged] = useState(false);
  const { updateUserData, userData: currentUserData } = useUser();

  const [userImage, setUserImage] = useState<File | string | null>(
    `${currentUserData.avatar_url}?${currentUserData.avatarTimestamp}`,
  );
  const [preview, setPreview] = useState<string | null>(
    `${currentUserData.avatar_url}?${currentUserData.avatarTimestamp}`,
  );
  const [isNotificationSupported, setIsNotificationSupported] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    localStorage.removeItem('groups');
    await signoutSupabase();
  };

  useEffect(() => {
    if (typeof Notification !== 'undefined') {
      setIsNotificationSupported(true);
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserImage(file);
      setPreview(URL.createObjectURL(file));
      setIsInfoChanged(true);
    }
  };

  const handleSubmit = async () => {
    if (userImage && userImage instanceof File) {
      try {
        // CONVERT FILE TO BASE64 TO PASS TO SERVER
        const reader = new FileReader();
        reader.readAsDataURL(userImage);
        reader.onload = async () => {
          const base64data = reader.result as string;
          const { data, error } = await updateAvatarProfile(base64data);

          if (error) {
            console.error(error);
            toast.error("Impossible de modifier l'image");
            return;
          }
          updateUserData({ avatar_url: data?.publicUrl });
          toast.success('Informations mises à jour');
        };
      } catch (error) {
        console.error(error);
        toast.error("Une erreur s'est produite lors du traitement de l'image");
      }
    } else {
      toast.error('Veuillez sélectionner une nouvelle image');
    }
  };

  const membreSince = () => {
    const date = new Date(currentUserData.created_at);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleResetNotification = async () => {
    try {
      await handleAskNotification();
      toast.success('Notifications réinitialisées');
    } catch (error: any) {
      toast.error(error?.message);
    }
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
                      width={150}
                      height={150}
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
                <p className="text-sm">{currentUserData.username}</p>
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <p>Email</p>
                <p className="text-sm">{currentUserData.email}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-gray-600 text-center text-sm">
                Membre depuis le {membreSince()}
              </p>
              {isNotificationSupported &&
                Notification.permission === 'denied' && (
                  <p className="text-xs text-red-500 text-justify">
                    Avant de les réinitialiser, autorise les notifications de
                    Derkap dans les réglages de ton smartphone !
                  </p>
                )}
              <Button
                text="Réinitialiser les notifications"
                className={cn('w-full')}
                isCancel={
                  isNotificationSupported &&
                  Notification.permission === 'denied'
                }
                onClick={handleResetNotification}
              />
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
