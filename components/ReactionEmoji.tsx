import { cn } from '../libs/utils';

interface ReactionEmojiProps extends React.HTMLProps<HTMLButtonElement> {
  post?: any;
  emoji: string;
  emojiUsed: string | null;
}

const ReactionEmoji: React.FC<ReactionEmojiProps> = ({
  emoji,
  onClick,
  emojiUsed,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'bg-white/60 bg-blur text-4xl flex items-center justify-center text-black/70 w-14 h-14 rounded-full',
        {
          'bg-white': emojiUsed !== emoji,
          'bg-custom-pink': emojiUsed === emoji,
        },
      )}
    >
      {emoji}
    </button>
  );
};

export default ReactionEmoji;
