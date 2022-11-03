import { generations } from "../utils/const";

const SideNav = ({ isOpen, setIsOpen, setGeneration }) => {
  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  const handleMenuItemClick = (generation) => {
    setGeneration(generation);
    setIsOpen(false);
  };

  const classChange = () => {
    return isOpen
      ? "fixed inset-0 w-64 ml-0 bg-green-200 transition-all ease-in-out duration-300 z-10"
      : "fixed inset-0 w-64 -ml-96 bg-green-200 ease-in-out duration-300 z-10";
  };

  return (
    <div>
      <div className={classChange()}>
        <h1 className="px-3 font-bold text-lg">Generations</h1>
        <ul className="flex flex-col px-4">
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
  const handleClick = () => {
    clickHandler(generation[0]);
  };

  return (
    <li>
      <button
        onClick={handleClick}
        className="w-full px-4 py-1 rounded-md mb-2 bg-green-600 text-white hover:drop-shadow-sm hover:bg-green-700"
      >
        {generation[1]}
      </button>
    </li>
  );
};

export default SideNav;
