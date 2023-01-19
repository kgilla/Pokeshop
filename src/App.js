import { useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import TopNav from "./components/TopNav";
import SideNav from "./components/SideNav";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    
    if(localStorage.theme) setIsDarkMode(localStorage.theme)
    
    console.log(localStorage)
  }, [])

  return (
    <div className={isDarkMode ? "dark dark:bg-black " : ""}>
      <TopNav
        setIsOpen={setIsOpen}
        setIsDarkMode={setIsDarkMode}
        isDarkMode={isDarkMode}
      />
      <SideNav
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="bg-slate-200 min-h-screen dark:bg-gray-900">
        <div className="min-h-screen container m-auto py-24 px-12 bg-white dark:bg-gray-700">
          <Outlet />
        </div>
      </div>
      <footer className="bg-green-500 h-12">
        This is a footer
      </footer>
    </div>
  );
};

export default App;
