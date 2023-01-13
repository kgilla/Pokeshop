const TopNav = ({ setIsOpen }) => {
  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <header className="h-12 bg-green-600 px-8 w-screen fixed grid grid-cols-3">
      <button
        onClick={handleClick}
        className="px-3 py-1 justify-self-start self-center"
      >
        <svg viewBox="0 0 100 80" width="20" height="20" fill="white">
          <rect width="100" height="15"></rect>
          <rect y="30" width="100" height="15"></rect>
          <rect y="60" width="100" height="15"></rect>
        </svg>
      </button>

      <h1 className="text-white text-lg font-bold place-self-center">
        Pokestore
      </h1>
    </header>
  );
};

export default TopNav;
