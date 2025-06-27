import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBudget } from "../redux/actions";
import Piechart from "./Piechart";
import Barchart from "./Barchart";

function Budget() {
  const dispatch = useDispatch();
  const budgetValue = useSelector((state) => state.budget);

  const [newBudget, setNewBudget] = useState("");

  const updateAmounts = (e) => {
    e.preventDefault();
    // dispatch(setBudget(newBudget, total_expense, remainingBudget));
    dispatch(setBudget(newBudget));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold max-md:text-2xl">Budget</h1>
      <div className="shadow-md bg-white mt-5 p-6 rounded-xl ">
        <form
          className="flex max-md:flex max-md:flex-col max-md:gap-2"
          onSubmit={updateAmounts}
        >
          <input
            type="text"
            placeholder="Enter Budget"
            className="w-[90%] mr-5 border rounded-lg px-4 shadow-md max-md:w-[100%]"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
          />
          <button
            className="w-32 break-words text-center bg-blue-600 p-3 hover:bg-blue-700 
            cursor-pointer text-white rounded-lg max-md:w-[100%] max-md:p-1"
            type="submit"
          >
            Set Budget
          </button>
        </form>

        <div className="flex flex-wrap max-md:flex-col max-md:mt-1 gap-4 mt-8 p-5 text-wrap">
          <div className="bg-purple-50 p-2 rounded-lg w-[32%]  max-md:w-[80%]">
            <h3 className="text-purple-500 font-bold text-[0.8rem]">
              Total Budget
            </h3>
            <p className="text-[1.5rem] max-md:text-[1rem]">
              &#8377; {budgetValue}
            </p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg w-[32%] max-md:w-[80%]">
            <h3 className="text-green-500 font-bold text-[0.8rem]">
              Total Expense
            </h3>
            <p className="text-[1.5rem] max-md:text-[1rem]">&#8377;</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg w-[32%] max-md:w-[80%]">
            <h3 className="text-yellow-500 font-bold text-[0.8rem]">
              Remaining
            </h3>
            <p className="text-[1.5rem] max-md:text-[1rem]">&#8377;</p>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold mt-5">Expense Distribution</h2>
      <div className="flex flex-col sm:flex-row sm:gap-5 gap-10 mb-5 max-md:mb-1">
        <div className="w-[80%] md:w-[60%] sm:w-[50%] ">
          <Piechart />
        </div>
        <div className="w-[80%] md:w-[60%] sm:w-[50%] ">
          <Barchart />
        </div>
      </div>
    </div>
  );
}

export default Budget;
