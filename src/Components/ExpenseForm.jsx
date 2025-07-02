import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, updateExpense } from "../redux/actions";
import { transformDate } from "../commons/transformDate";
import { transformTime } from "../commons/transformTime";

import db from "../firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ClipLoader } from "react-spinners";

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
  const [limit, setLimit] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const budgetValue = useSelector((state) => state.budget);
  const editExpense = useSelector((state) => state.editExpenseData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expenseData = {
      ...formData,
      date: transformDate(),
      time: transformTime(),
    };

    try {
      setisLoading(true);
      if (editExpense) {
        const expenseRef = doc(db, "expenses", formData.id);
        await updateDoc(expenseRef, expenseData);
        dispatch(updateExpense(expenseData));
        setIsEdit(false);
      } else {
        const docRef = await addDoc(collection(db, "expenses"), expenseData);
        dispatch(addExpense({ ...expenseData, id: docRef.id }));
        setError(error);
      }

      setFormData({
        id: "",
        description: "",
        amount: "",
        category: "",
        paidTo: "",
        comment: "",
        date: transformDate(),
        time: transformTime(),
      });

      setisLoading(false);
    } catch (error) {
      console.error("Error adding/updating expense:", error);
      setisLoading(false);
      setError(error);
    }
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
        {isLoading && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <ClipLoader size={80} color="#ffffff" />
          </div>
        )}

        {error && (
          <div>
            <h1 className="text-red-600">Something went wrong!!!</h1>
          </div>
        )}

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
            className="border p-2 rounded-md shadow-md h-[44px] resize-none"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Add comment here..."
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
