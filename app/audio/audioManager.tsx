const currentIndex = 0;
const audioFiles = [
  'audio/goofy.mp3',
  'audio/grenade.mp3',
  'audio/nana.mp3',
  'audio/net.mp3',
  'audio/rire.mp3',
  'audio/peter.mp3',
];

export const getRandomAudio = () => {
  const randomIndex = Math.floor(Math.random() * audioFiles.length);
  return audioFiles[randomIndex];
};
