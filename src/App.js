import { useState} from "react";
import {Outlet} from "react-router-dom";
import TopNav from "./components/TopNav";
import SideNav from "./components/SideNav";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
          <Outlet />
      </div>
    </div>
  );
};

export default App;
