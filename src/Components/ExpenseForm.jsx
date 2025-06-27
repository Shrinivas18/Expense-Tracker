import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, updateExpense } from "../redux/actions";
import { v4 as uuid } from "uuid";
import { calculateTotalExpense } from "../commons/budgetCalculation";

function ExpenseForm() {
  const [formData, setFormData] = useState({
    id: "",
    description: "",
    amount: "",
    category: "other",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [sumOfExpenses, setSumOfExpenses] = useState(0);
  const [limit, setLimit] = useState(0);

  const dispatch = useDispatch();

  const budgetValue = useSelector((state) => state.budget);
  const editExpense = useSelector((state) => state.editExpenseData);
  const expenses = useSelector((state) => state.expenses);
  console.log("budgetValue", budgetValue);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSum = calculateTotalExpense(sumOfExpenses, formData.amount);
    setSumOfExpenses(newSum);
    const newLimit = limit - Number(formData.amount);
    setLimit(newLimit);
    console.log("limit:::", newLimit);
    console.log(newSum);
    if (editExpense) {
      dispatch(updateExpense(formData));
      setIsEdit(false);
    } else {
      const newData = { ...formData, id: uuid() };
      dispatch(addExpense(newData));
    }

    setFormData({
      id: "",
      description: "",
      amount: "",
      category: "other",
    });
  };

  useEffect(() => {
    if (editExpense) {
      setFormData(editExpense);
      setIsEdit(true);
    }
  }, [editExpense]);

  useEffect(() => {
    setLimit(budgetValue);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold max-md:text-2xl">Expenses</h1>
      <div className="bg-white mt-5 shadow-md rounded-lg ">
        <form
          className="grid grid-cols-4 pl-7 pr-7 pt-7 pb-4 gap-2 max-md:flex max-md:flex-col max-md:gap-2 max-md:p-4"
          onSubmit={handleSubmit}
        >
          <input
            className="border p-2 rounded-md shadow-md"
            name="description"
            value={formData.description}
            onChange={handleChange}
            type="text"
            placeholder="Enter Description"
            required
          />
          <input
            className="border p-2 rounded-md shadow-md"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter Amount"
            required
          />
          <select
            className="border p-2 rounded-md shadow-md"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="other">Other</option>
            <option value="food">Food</option>
            <option value="transportation">Transportation</option>
            <option value="entertainment">Entertainment</option>
            <option value="utilities">Utilities</option>
          </select>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white rounded-md shadow-lg cursor-pointer max-md:p-2"
          >
            {isEdit ? "Update Expense" : "Add Expense"}
          </button>
        </form>
        <div className=" pl-7 pb-1 text-gray-500">
          <h2>
            <strong className="text-gray-900">Limit Left: </strong>
            <strong>$ </strong>
            {limit}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ExpenseForm;
