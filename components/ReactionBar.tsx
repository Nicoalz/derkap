
import { TPostDb } from '../types';
import ReactionEmoji from './ReactionEmoji';

interface ReactionBar {
  post?: TPostDb;
}

const ReactionBar: React.FC<ReactionBar> = ({ post }) => {
  return (
    <div className='w-full flex justify-center items-center gap-x-3  rounded-lg '>
      <ReactionEmoji emoji='🤣' post={post} />
      <ReactionEmoji emoji='🥰' post={post} />
      <ReactionEmoji emoji='🤯' post={post} />
      <ReactionEmoji emoji='😢' post={post} />
    </div>
  );
};

export default ReactionBar;
