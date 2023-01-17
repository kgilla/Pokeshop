import { generations } from "../utils/const";
import { Link } from "react-router-dom";

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
        <h1 className="font-bold text-lg dark:text-white">Generations</h1>
        <ul className="flex flex-col">
          {Object.entries(generations).map((gen) => (
            <NavButton
              key={gen[0]}
              generation={gen}
              clickHandler={handleMenuItemClick}
            />
          ))}
        </ul>
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

const NavButton = ({ generation, clickHandler }) => {
  return (
    <li>
        <Link to={`generation/${generation[0]}`}>
        <button
          onClick={clickHandler}
          className="w-full px-4 py-1 rounded-md mb-2 bg-green-600 text-white hover:drop-shadow-sm hover:bg-green-700"
        >
          {generation[1]}
        </button>
        </Link>
    </li>
  );
};

export default SideNav;
