import React, { useState } from "react";
import rightArrow from "../assets/right-arrow.png";
import { NavLink } from "react-router-dom";

function SideBar() {
  const [showSideBar, setShowSideBar] = useState(false);

  const getLinkClasses = ({ isActive }) =>
    `shadow-lg px-4 py-2 text-xl bold rounded-md transition-all duration-300  &#8377; ${
      isActive ? "bg-blue-500 text-white" : "text-gray-800 hover:bg-gray-200"
    }`;

  return (
    <div
      className={showSideBar ? `transition-all duration-300 ease-in-out shadow-lg w-full lg:w-[15%] p-5`:`transition-all duration-300 ease-in-out shadow-lg w-full lg:w-[5%] pt-5`}
    >
      <div className={`flex flex-row lg:flex-col gap-4 p-2 pl-1`}>
        <img
          className="size-8 lg:size-6 cursor-pointer"
          title="Navigation Bar"
          onClick={() => setShowSideBar(!showSideBar)}
          src={rightArrow}
          alt="Expend Navigation Bar"
        />
        {showSideBar && (
          <nav className="flex flex-row flex-wrap lg:flex-col gap-5 text-md w-full">
            <NavLink className={getLinkClasses} to="/">
              Budget
            </NavLink>
            <NavLink className={getLinkClasses} to="/expenses">
              Expenses
            </NavLink>
            <NavLink className={getLinkClasses} to="/menu3">
              Menu 3
            </NavLink>
            <NavLink className={getLinkClasses} to="/menu4">
              Menu 4
            </NavLink>
          </nav>
        )}
      </div>
    </div>
  );
}

export default SideBar;
