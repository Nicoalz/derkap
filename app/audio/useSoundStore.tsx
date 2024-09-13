import create from 'zustand';

interface SoundState {
  isSoundEnabled: boolean;
  toggleSound: () => void;
}

export const useSoundStore = create<SoundState>(set => ({
  isSoundEnabled: true,
  toggleSound: () => set(state => ({ isSoundEnabled: !state.isSoundEnabled })),
}));
