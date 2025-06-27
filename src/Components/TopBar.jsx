import React from "react";
import expenseTracker from "../assets/expense-tracker.png";
import userProfile from "../assets/user.png";

function TopBar() {
  return (
    <div className="flex justify-between items-center px-4 py-2 shadow-md w-full">
      <img
        className="w-28 md:w-36 lg:w-44 max-w-[60%] h-auto"
        src={expenseTracker}
        alt="Expense Tracker Logo"
      />
      <img
        className="w-8 h-8 md:w-9 md:h-9 object-cover rounded-full border border-gray-300"
        src={userProfile}
        alt="User Profile"
      />
    </div>
  );
}

export default TopBar;
