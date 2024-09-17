import { useState } from 'react';
import { toast } from 'sonner';
import { ImageIcon } from 'lucide-react';
import { Input } from './ui/input';
import { createGroup } from '@/functions/group-action';
import { TGroupDB } from '@/types/types';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

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
  const [groupImage, setGroupImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGroupImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCreateGroup = async () => {
    const { data, error } = await createGroup({ name: groupName });
    if (error) return console.error(error);
    if (data) {
      setGroups([...groups, data]);
      onCloseDrawer();
      toast.success('Groupe créé avec succès');
      router.push(`/groupe/${data.id}`);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <Input
        type="text"
        placeholder="Nom du groupe"
        value={groupName}
        onChange={e => setGroupName(e.target.value)}
        className="w-full p-2 mb-4 border rounded text-center"
      />

      <div className="w-full p-6 bg-gray-100 rounded-lg flex flex-col items-center justify-center mb-4">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
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

      <Button text="Créer" onClick={handleCreateGroup} className="w-full" />
    </div>
  );
};

export default GroupForm;
