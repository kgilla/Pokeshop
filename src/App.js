import { useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import TopNav from "./components/TopNav";
import SideNav from "./components/SideNav";
import Cart from "./components/Cart";

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {  
    if (localStorage.theme) {
      setIsDarkMode(localStorage.theme === "true" ? true : false)
    }
  }, [])

  return (
    <div className={isDarkMode ? "dark" : ""} >
      <TopNav
        setIsNavOpen={setIsNavOpen}
        setIsCartOpen={setIsCartOpen}
        setIsDarkMode={setIsDarkMode}
        isDarkMode={isDarkMode}
      />
      <SideNav
        isOpen={isNavOpen}
        setIsOpen={setIsNavOpen}
      />
      <Cart
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
      />
      <div className="bg-slate-200 min-h-screen dark:bg-gray-900 bg-cover bg-fixed" 
      style={{backgroundImage: isDarkMode ? "url(/darkBackground.png)" : "url(/lightBackground.png"}}>
        <div className="min-h-screen container m-auto py-24 px-12 bg-white dark:bg-gray-700">
          <Outlet />
        </div>
      </div>
      <footer className="h-24 bg-green-600 dark:bg-gray-500 px-8 border-gray-300 dark:border-gray-900">
        This is a footer
      </footer>
    </div>
  );
};

export default App;
