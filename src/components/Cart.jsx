const Cart = ({ isOpen, setIsOpen }) => {
  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  const classChange = () => {
    return isOpen
      ? "fixed inset-0 w-80 ml-0 bg-gray-100 dark:bg-gray-600 transition-all ease-in duration-300 z-10 px-6 py-6"
      : "fixed inset-0 w-64 -ml-96 ease-in-out duration-300 z-10";
  };

  return (
    <div>
      <div className={classChange()}>
    
      </div>
      {isOpen ? (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 w-screen h-screen bg-gray-800/20 z-1"
        >
          hello
        </div>
      ) : null}
    </div>
  );
};

export default Cart