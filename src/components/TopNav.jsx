import {BsFillSunFill, BsFillMoonFill, BsFillCartFill} from "react-icons/bs";
import {BiMenu} from "react-icons/bi";

const TopNav = ({ setIsNavOpen, setIsCartOpen, setIsDarkMode, isDarkMode }) => {
  const handleMenuClick = () => {
    setIsNavOpen(true);
  };

  const handleDarkToggleClick = () => {
    localStorage.setItem('theme', !isDarkMode)
    setIsDarkMode(!isDarkMode)
  }

  const handleCartClick = () => {
    setIsCartOpen(true)
  }

  const iconSize = "h-6 w-6";

  return (
    <header className="h-16 bg-green-600 dark:bg-gray-500 px-8 w-screen fixed  flex justify-between border-b-2 border-green-700 dark:border-gray-900 transition-all ease-linear duration-200">       
      <NavButton clickHandler={handleMenuClick} isDarkMode={isDarkMode}>
          <BiMenu className={iconSize}/>
      </NavButton>

      <h1 className="text-white text-xl font-bold place-self-center font-out">
        Pokestore
      </h1>

      <div className="flex justify-end">
        <NavButton clickHandler={handleDarkToggleClick} isDarkMode={isDarkMode}>
          {isDarkMode ?  <BsFillSunFill className={iconSize}/> : <BsFillMoonFill className={iconSize}/>}
        </NavButton>
        <span className="w-6"/>
        <NavButton clickHandler={handleCartClick} isDarkMode={isDarkMode}>
          <BsFillCartFill className={iconSize}/>
        </NavButton>
      </div>

    </header>
  );
};

const NavButton = ({clickHandler, isDarkMode, children}) => {
  return (
    <button className={`h-12 w-12 justify-self-end place-self-center flex justify-center items-center text-white text-xl font-bold ${isDarkMode ? 'bg-gray-600' : 'bg-green-700'} rounded-full hover:brightness-90 transition-all ease-linear duration-200`} onClick={clickHandler}>
    {children}
  </button>
  )

}

export default TopNav;
