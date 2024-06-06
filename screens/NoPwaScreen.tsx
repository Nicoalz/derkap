
const NoPwaScreen: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center px-4">
      <p >
        Pour utiliser cette application, veuillez l'installer sur votre appareil.
      </p>
      <p>
        Cliquez sur le bouton "Ajouter à l'écran d'accueil" dans le menu de partage de votre navigateur.
      </p>
    </div>
  );
};

export default NoPwaScreen;
