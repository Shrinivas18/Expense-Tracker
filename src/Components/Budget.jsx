import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBudget } from "../redux/actions";
import Piechart from "./Piechart";
import Barchart from "./Barchart";
import {
  SAVE_BUDGET,
  SET_NEW_BUDGET,
  UPDATE_BUDGET,
} from "../commons/constants";

function Budget() {
  const dispatch = useDispatch();
  const currState = useSelector((state) => state);

  const [budgetStored, setBudgetStored] = useState(false);
  const [budgetAmount, setBudgetAmount] = useState("");

  const handleSubmit = (actionType) => {
    const disabled = false;
    switch (actionType) {
      case SAVE_BUDGET:
        setBudgetStored(true);
        break;
      case UPDATE_BUDGET:
        setBudgetStored(false);
        break;
      case SET_NEW_BUDGET:
        setBudgetStored(false);
        break;
      default:
        setBudgetStored(false);
    }
    if (actionType === SET_NEW_BUDGET) {
      setBudgetAmount("");
      dispatch(setBudget(0, actionType));
    } else {
      dispatch(setBudget(budgetAmount, actionType));
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold max-md:text-2xl">Budget</h1>
      <div className="shadow-md bg-white mt-5 p-6 rounded-xl">
        <form
          className="flex max-md:flex max-md:flex-col max-md:gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="number"
            placeholder="Set your budget amount here..."
            className="w-[90%] mr-5 border rounded-lg px-4 shadow-md max-md:p-2 max-md:w-[100%]"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
            disabled={budgetStored}
            title={budgetStored ? "Please use the buttons" : ""}
          />

          {budgetStored ? (
            <div className="flex flex-row gap-1 ">
              <button
                type="button"
                className="w-32 bg-blue-600 p-2 max-md:p-1 max-md:w-full hover:bg-blue-700 text-white rounded-lg"
                onClick={() => handleSubmit(UPDATE_BUDGET)}
              >
                Update
              </button>
              <button
                type="button"
                className="w-32 bg-blue-600 p-2 max-md:p-1 max-md:w-full hover:bg-blue-700 text-white rounded-lg"
                onClick={() => handleSubmit(SET_NEW_BUDGET)}
              >
                New Budget
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="w-32 bg-blue-600 p-2 max-md:p-1 max-md:w-full hover:bg-blue-700 text-white rounded-lg"
              onClick={() => handleSubmit(SAVE_BUDGET)}
            >
              Set Budget
            </button>
          )}
        </form>

        {budgetStored && (
          <span className="flex-col flex-wrap p-2 text-red-300">
            Please use buttons to update or set new budget amount.
          </span>
        )}

        <div className="flex flex-wrap max-md:flex-col max-md:mt-1 gap-4 mt-8 p-5">
          <div className="bg-purple-50 p-2 rounded-lg w-[32%] max-md:w-[80%]">
            <h3 className="text-purple-500 font-bold text-[0.8rem]">
              Total Budget
            </h3>
            <p className="text-[1.5rem] max-md:text-[1rem]">
              ₹ {currState.budget}
            </p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg w-[32%] max-md:w-[80%]">
            <h3 className="text-green-500 font-bold text-[0.8rem]">
              Total Expense
            </h3>
            <p className="text-[1.5rem] max-md:text-[1rem]">
              ₹ {currState.totalExpense}
            </p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg w-[32%] max-md:w-[80%]">
            <h3 className="text-yellow-500 font-bold text-[0.8rem]">
              Remaining
            </h3>
            <p className="text-[1.5rem] max-md:text-[1rem]">
              ₹ {currState.remaining}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-5">Expense Distribution</h2>
      <div className="flex flex-col sm:flex-row sm:gap-5 gap-10 mb-5 max-md:mb-1">
        <div className="w-[80%] md:w-[60%] sm:w-[50%]">
          <Piechart />
        </div>
        <div className="w-[80%] md:w-[60%] sm:w-[50%]">
          <Barchart />
        </div>
      </div>
    </div>
  );
}

export default Budget;
