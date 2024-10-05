'use client';
import { cn } from '@/libs/utils';
import Button from './Button';
import { handleAskNotification } from '@/libs/notificationHelper';
import { toast } from 'sonner';
import { useState } from 'react';
import Loader from '@/components/Loader';
interface NotificationFirstTimePermission
  extends React.HTMLAttributes<HTMLDivElement> {
  permission: 'default' | 'denied';
  updateNotifFirstTimeSeen: () => void;
}
const NotificationFirstTime = ({
  permission,
  updateNotifFirstTimeSeen,
  className,
  ...props
}: NotificationFirstTimePermission) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleOk = async () => {
    try {
      setIsLoading(true);
      await handleAskNotification();
    } catch (e) {
      toast.error('Erreur lors de la demande de notification');
    } finally {
      updateNotifFirstTimeSeen();
      setIsLoading(false);
    }
  };

  return (
    <div
      {...props}
      className={cn(
        'z-10 absolute bg-black/60 w-screen h-screen flex justify-center items-center',
        className,
      )}
    >
      <div className="w-56 h-56 p-4 bg-gradient-linear gap-y-4 text-center rounded-xl flex flex-col justify-center items-center">
        {permission === 'default' ? (
          <p>
            Active les notifs pour être au courant des nouveaux posts et
            challenges de tes potes !
          </p>
        ) : (
          <p>
            Tu as refusé les notifs, active les dans les réglages de ton
            smartphone, puis va les réinitialiser dans ton profil pour être au
            courant des nouveaux posts et challenges de tes potes !
          </p>
        )}

        {isLoading ? (
          <Loader className="" />
        ) : (
          <Button text="Ok" onClick={handleOk} />
        )}
      </div>
    </div>
  );
};

export default NotificationFirstTime;
