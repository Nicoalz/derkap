"use client";
import KapsDay from '@/components/KapsDay';
import KapsImage from '@/components/KapsImage';
import { mockedChallenges as challenges } from '@/libs/mockedChallenges';
import { mockedKaps } from '@/libs/mockedKaps';
import { useChallengeStore } from '@/libs/store/useChallengeStore';
import { TChallenge } from '@/types';
import { TKaps } from '@/types/Kaps';
import { ChevronLeftIcon } from 'lucide-react'; // Import de l'icône de flèche gauche de Lucide Icons
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChallengerBox from '../../../components/ChallengeBox';

export default function KapsDetailScreen({ params }: { params: { id: string } }) {
  const { id } = params;
  const [kaps, setKaps] = useState<TKaps | null>(null);
  const [derkarpImages, setDerkarpImages] = useState<string[]>([""]); // urls des images des défis d'une kaps
  const [relatedChallenge, setRelatedChallenge] = useState<TChallenge>();
  const { setChallenge } = useChallengeStore();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const selectedKaps = mockedKaps.find(kap => kap.id === id);
      setKaps(selectedKaps || null);
    }
  }, [id]);

  useEffect(() => {
    if (kaps) {
      const selectedImages = kaps.derkapImages;


      if (selectedImages) setDerkarpImages(selectedImages);

      const challengeForKaps = challenges.find(challenge => challenge.kapsId === "kaps" + kaps.id)

      if (challengeForKaps) setRelatedChallenge(challengeForKaps);
    }
  }, [kaps]);

  const redirectToChallenge = (challenge: TChallenge) => {
    if (!challenge) return;
    if (!challenge.id) return;
    setChallenge(challenge);
    router.push(`/challenge/${challenge.id}`);
  };

  const handleBackClick = () => {
    router.push('/kaps');
  };

  if (!kaps) return <div>Loading...</div>;

  return (
    <div className="w-full mb-32 -mt-12">
      <div className='w-full flex flex-col gap-4'>
        <div className='absolute py-12 px-2 z-50'>
          <ChevronLeftIcon onClick={handleBackClick} className="cursor-pointer text-2xl text-white " /> {/* Bouton de retour */}
        </div>
        <div className='w-full flex justify-items-center gap-x-3'>
          <KapsImage kaps={kaps} />
        </div>
        <div className='p-2'>
          {relatedChallenge && (<ChallengerBox challenge={relatedChallenge} className='mt-4' onClick={() => redirectToChallenge(relatedChallenge)} />)}
        </div>
        <div className='p-2'>
          <KapsDay images={derkarpImages} />
        </div>
      </div>
    </div>
  );
}
