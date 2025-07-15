import React, { useState } from "react";
import menu from "../assets/menu.png";
import menuOpened from "../assets/menu-opened.png";
import { NavLink } from "react-router-dom";

function SideBar() {
  const [showSideBar, setShowSideBar] = useState(false);

  const getLinkClasses = ({ isActive }) =>
    `shadow-lg px-4 py-2  max-md-p-1 text-md bold rounded-md transition-all duration-300 &#8377; ${
      isActive ? "bg-blue-500 text-white" : "text-gray-800 hover:bg-gray-200"
    }`;

  return (
    <div
      className={
        showSideBar
          ? `transition-all duration-300 ease-in-out shadow-lg w-full lg:w-[20%] pt-5 max-lg:w-full max-lg:pt-1`
          : `transition-all duration-300 ease-in-out shadow-lg w-full lg:w-[5%] pt-5 max-lg:pt-1`
      }
    >
      <div className="flex flex-row lg:flex-col gap-4 p-2 max-lg:pb-2 pl-1">
        {showSideBar ? (
          <img
            className="lg:w-9 lg:h-9 max-lg:w-6 max-lg:h-6 cursor-pointer max-lg:mt-3 transition-all duration-300 ease-in-out transform"
            title="Close Menu"
            onClick={() => setShowSideBar(!showSideBar)}
            src={menuOpened}
            alt="Collapse Navigation Bar"
          />
        ) : (
          <img
            className="lg:w-6 lg:h-6 max-lg:w-6 max-lg:h-6 cursor-pointer max-lg:mt-3 transition-all duration-300 ease-in-out transform"
            title="Open Menu"
            onClick={() => setShowSideBar(!showSideBar)}
            src={menu}
            alt="Expand Navigation Bar"
          />
        )}
        {showSideBar && (
          <nav className="flex flex-row flex-wrap lg:flex-col lg:gap-5 max-md:text-[12px] max-md:gap-0 max-lg:gap-2 text-md w-full">
            <NavLink className={getLinkClasses} to="/">
              Dashboard
            </NavLink>
            <NavLink className={getLinkClasses} to="/budget">
              Budget
            </NavLink>
            <NavLink className={getLinkClasses} to="/expenseBuilder">
              Daily Expense
            </NavLink>
            <NavLink className={getLinkClasses} to="/expenseHistory">
              Expense History
            </NavLink>
            <NavLink className={getLinkClasses} to="/about">
              About
            </NavLink>
          </nav>
        )}
      </div>
    </div>
  );
}

export default SideBar;
