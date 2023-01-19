import { generations, types } from "../utils/const";
import { NavLink } from "react-router-dom";

const SideNav = ({ isOpen, setIsOpen }) => {
  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  const classChange = () => {
    return isOpen
      ? "fixed inset-0 w-80 ml-0 bg-gray-100 dark:bg-gray-600 transition-all ease-in-out duration-300 z-10 px-6 py-6"
      : "fixed inset-0 w-64 -ml-96 ease-in-out duration-300 z-10";
  };

  return (
    <div>
      <div className={classChange()}>
        {/* Generations */}
        <NavSection title="Pokemon Generations">
        {Object.entries(generations).map((generation) => (
            <NavButton
              key={generation[0]}
              link={`generation/${generation[0]}`}
              innerText={generation[1]}
              clickHandler={handleMenuItemClick}
            />
          ))}
        </NavSection>

        {/* Pokemon Types */}
        <NavSection title="Pokemon Types">
        {Object.entries(types).map((type) => (
            <NavButton
              key={type[0]}
              link={`type/${type[1]}`}
              innerText={type[1]}
              clickHandler={handleMenuItemClick}
            />
          ))}
        </NavSection>
      </div>
      {isOpen ? (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 w-screen h-screen bg-gray-800/20 z-1"
        ></div>
      ) : null}
    </div>
  );
};

const NavSection = ({title, children}) => {
  return (
  <div>
    <h1 className="font-bold text-lg dark:text-white mb-2">{title}</h1>
    <ul className="flex flex-col mb-4">
      {children}
    </ul>
  </div>
  )
}

const NavButton = ({ link, innerText, clickHandler }) => {
  return (
    <li className="mb-2 w-full flex">
      <NavLink to={link}  onClick={clickHandler}
        className={({ isActive }) =>
        isActive
          ? "w-full p-2 rounded-md bg-green-800 hover:drop-shadow-md hover:bg-green-700 capitalize text-white"
          : "w-full p-2 rounded-md bg-green-600  hover:drop-shadow-sm hover:bg-green-700 capitalize text-white font-semibold"
        }
      > 
      {innerText}
      </NavLink>
    </li>
  );
};

export default SideNav;
