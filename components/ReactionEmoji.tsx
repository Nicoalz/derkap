import { TPostDb } from '../types';

interface ReactionEmojiProps {
  post?: TPostDb;
  emoji: string;
}

const ReactionEmoji: React.FC<ReactionEmojiProps> = ({ post, emoji }) => {
  return (
      <p className='bg-white/60 bg-blur text-4xl flex items-center justify-center text-black/70 w-14 h-14 rounded-full'>
        {emoji}
      </p>
  );
};

export default ReactionEmoji;

