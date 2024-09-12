
"use client";
import { useState } from 'react';
import { useUser } from '../contexts/user-context';
import { insertReactionToPost } from '../functions/supabase/post/reaction';
import { TReaction } from '../types';
import { Json } from '../types/supabase';
import ReactionEmoji from './ReactionEmoji';

interface ReactionBar {
  post_id?: number;
  reactions: Json[] | null;

}

const ReactionBar: React.FC<ReactionBar> = ({ post_id, reactions }) => {

  const { userData } = useUser();
  const { id: user_id } = userData
  const userEmojiUsed = (reactions?.find((reaction: any) => reaction?.user_id === user_id) as TReaction)?.emoji;
  const [emojiUsed, setEmojiUsed] = useState(userEmojiUsed);

  const handleClick = async (emoji: string) => {
    if (!post_id) return;
    const { error } = await insertReactionToPost({ post_id, emoji })
    if (error) {
      console.error(error)
    }

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
