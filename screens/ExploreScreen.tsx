const ExploreScreen: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center mb-32">
      <input
        type="text"
        placeholder="Rechercher"
        className="w-52 p-2 border-2 border-gray-300 rounded-md my-4 "
      />
    </div>
  );
};

export default ExploreScreen;
