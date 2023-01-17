import {BsFillSunFill, BsFillMoonFill} from "react-icons/bs";

const TopNav = ({ setIsOpen, setIsDarkMode, isDarkMode }) => {
  const handleMenuClick = () => {
    setIsOpen(true);
  };

  const handleDarkToggleClick = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <header className="h-12 bg-green-600 dark:bg-gray-500 px-8 w-screen fixed grid grid-cols-3">
      <button
        onClick={handleMenuClick}
        className="justify-self-start"
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

      <button className={`h-9 w-9 justify-self-end place-self-center flex justify-center items-center text-white text-xl font-bold ${isDarkMode ? 'bg-gray-400' : 'bg-green-500'} rounded-full hover:brightness-90`} onClick={handleDarkToggleClick}>
        {isDarkMode ?  <BsFillSunFill className="h-6 w-6"/> : <BsFillMoonFill className="h-6 w-6"/>}
      </button>
    </header>
  );
};

export default TopNav;
