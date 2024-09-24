import { useState } from 'react';
import { toast } from 'sonner';
import { ImageIcon } from 'lucide-react';
import { Input } from './ui/input';
import { createGroup } from '@/functions/group-action';
import { TGroupDB } from '@/types/types';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface GroupFormProps {
  onCloseDrawer: () => void;
  groups: TGroupDB[];
  setGroups: React.Dispatch<React.SetStateAction<TGroupDB[]>>;
}

const GroupForm: React.FC<GroupFormProps> = ({
  onCloseDrawer,
  groups,
  setGroups,
}) => {
  const [groupName, setGroupName] = useState('');
  const [missingName, setMissingName] = useState(false);
  const [, setGroupImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGroupImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCreateGroup = async () => {
    if (isRequestInProgress) return;

    if (!groupName) {
      return setMissingName(true);
    }

    setIsRequestInProgress(true);
    const { data, error } = await createGroup({ name: groupName });
    if (error) return toast.error("Une erreurs s'est produite...");
    if (data) {
      setGroups([...groups, data]);
      toast.success('Groupe créé avec succès');
      onCloseDrawer();
      router.push(`/groupe/${data.id}`);
      setIsRequestInProgress(false);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center justify-cente h-fit gap-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <p>Nom du groupe</p>
        <Input
          type="text"
          placeholder="Vacances Portugal 🇵🇹"
          value={groupName}
          onChange={e => setGroupName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {missingName && (
          <span className="text-red-500 text-xs">
            Vous devez remplir ce champs
          </span>
        )}
      </div>

      <div className="w-full h-fit p-6 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            width={24}
            height={24}
            className="w-24 h-24 object-cover rounded mb-2"
          />
        ) : (
          <ImageIcon size={48} className="text-gray-400 mb-2" />
        )}
        <p className="text-gray-600 mb-2 text-center tetx-sm">
          Sélectionner une image pour illustrer votre groupe
        </p>
        <label
          htmlFor="image-upload"
          className="cursor-pointer bg-purple-600/50 text-white py-1 px-2 rounded text-sm"
        >
          Choisir une image
        </label>
        <Input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <Button
        text={isRequestInProgress ? 'Chargement...' : 'Créer'}
        onClick={handleCreateGroup}
        className={cn(
          isRequestInProgress && 'cursor-not-allowed bg-gray-400',
          'w-full',
        )}
        disabled={isRequestInProgress}
      />
    </div>
  );
};

export default GroupForm;
