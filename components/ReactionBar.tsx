
"use client";
import { useState } from 'react';
import { useUser } from '../contexts/user-context';
import { Json } from '../types/supabase';
import ReactionEmoji from './ReactionEmoji';

interface ReactionBar {
  post_id?: number;
  reactions: Json[] | null;

}

const ReactionBar: React.FC<ReactionBar> = ({ post_id, reactions }) => {

  const { userData } = useUser();
  const { id: user_id } = userData
  const userEmojiUsed = (reactions?.find((reaction: any) => reaction?.user_id === user_id) as any)?.emoji;
  const [emojiUsed] = useState(userEmojiUsed);

  const handleClick = async (emoji: string) => {
  }

  return (
    <div className='w-full flex justify-center items-center gap-x-3  rounded-lg '>
      <ReactionEmoji emoji='🤣' onClick={() => handleClick("🤣")} emojiUsed={emojiUsed} />
      <ReactionEmoji emoji='🥰' onClick={() => handleClick("🥰")} emojiUsed={emojiUsed} />
      <ReactionEmoji emoji='🤯' onClick={() => handleClick("🤯")} emojiUsed={emojiUsed} />
      <ReactionEmoji emoji='😢' onClick={() => handleClick("😢")} emojiUsed={emojiUsed} />
    </div>
  );
};

export default ReactionBar;
