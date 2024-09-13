import { useState } from 'react';
import Button from '@/components/Button';
import { ImageIcon } from 'lucide-react';

interface GroupFormProps {
  onCreateGroup: (name: string, imageFile: File | null) => void;
}

const GroupForm: React.FC<GroupFormProps> = ({ onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGroupImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (groupName && groupImage) {
      onCreateGroup(groupName, groupImage);
      setGroupName('');
      setGroupImage(null);
      setPreview(null);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <input
        type="text"
        className="w-full p-2 mb-4 border rounded text-center"
        placeholder="Nom du groupe"
        value={groupName}
        onChange={e => setGroupName(e.target.value)}
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
        <p className="text-gray-600 mb-2">
          Sélectionner une image pour illustrer votre groupe
        </p>
        <label
          htmlFor="image-upload"
          className="cursor-pointer bg-purple-600 text-white py-2 px-4 rounded-lg"
        >
          Choisir une image
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <Button text="Créer" onClick={handleSubmit} className="w-full py-3" />
    </div>
  );
};

export default GroupForm;
