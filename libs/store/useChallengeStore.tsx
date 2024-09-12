import { create } from "zustand";
import { TChallenge } from '../../types/Challenge';

interface ChallengeState {
  challenge?: TChallenge;
  setChallenge: (challenge: TChallenge) => void;

}

export const useChallengeStore = create<ChallengeState>((set) => ({
  challenge: undefined,
  setChallenge: (challenge) => set({ challenge }),

}));
