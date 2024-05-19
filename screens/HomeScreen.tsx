import CaptureButton from '@/components/CaptureButton';
import ChallengerBox from '@/components/ChallengeBox';
import Feed from '@/components/Feed';

const HomeScreen: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center relative flex-1 mb-32">
      <ChallengerBox />
      <Feed />
      <CaptureButton />
    </div>
  );
};

export default HomeScreen;
