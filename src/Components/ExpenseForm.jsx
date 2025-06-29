import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, updateExpense } from "../redux/actions";
import { v4 as uuid } from "uuid";
import { calculateTotalExpense } from "../commons/budgetCalculation";
import { transformDate } from "../commons/transformDate";
import { transformTime } from "../commons/transformTime";

function ExpenseForm() {
  const [formData, setFormData] = useState({
    id: "",
    description: "",
    category: "",
    amount: "",
    paidTo: "",
    date: "",
    time: "",
    comment: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [sumOfExpenses, setSumOfExpenses] = useState(0);
  const [limit, setLimit] = useState(0);

  const dispatch = useDispatch();

  const budgetValue = useSelector((state) => state.budget);
  const editExpense = useSelector((state) => state.editExpenseData);
  const expenses = useSelector((state) => state.expenses);
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
      paidTo: "",
      comment: "",
      date: transformDate(),
      time: transformTime(),
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

  useEffect(() => {
    const interval = setInterval(() => {
      setFormData((prev) => ({
        ...prev,
        date: transformDate(),
        time: transformTime(),
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold max-md:text-2xl">Manage Expenses</h1>
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
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="transportation">Transportation</option>
            <option value="entertainment">Entertainment</option>
            <option value="utilities">Utilities</option>
            <option value="other">Other</option>
          </select>
          <input
            className="border p-2 rounded-md shadow-md"
            name="paidTo"
            value={formData.paidTo}
            onChange={handleChange}
            type="text"
            placeholder="Amount paid to"
            required
          />
          <input
            className="border p-2 rounded-md shadow-md"
            name="date"
            value={formData.date}
            onChange={handleChange}
            type="text"
            disabled
            required
          />
          <input
            className="border p-2 rounded-md shadow-md"
            name="time"
            value={formData.time}
            onChange={handleChange}
            type="text"
            disabled
            required
          />
          <textarea
            className="border p-2 rounded-md shadow-md h-[44px]"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Add comment here..."
            required
          />
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
