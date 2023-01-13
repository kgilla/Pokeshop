import { useState} from "react";
import {Outlet} from "react-router-dom";
import TopNav from "./components/TopNav";
import SideNav from "./components/SideNav";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <TopNav
        setIsOpen={setIsOpen}
      />
      <SideNav
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="bg-slate-200 h-screen">
          <Outlet />
      </div>
    </div>
  );
};

export default App;
