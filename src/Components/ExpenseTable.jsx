import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, patchExpense } from "../redux/actions";
import SearchBox from "./SearchBox";

function ExpenseTable() {
  const expenses = useSelector((state) => state.expenses);
  const [searchItem, setSearchItem] = useState("");
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const patchData = (id) => {
    const data = expenses.find((expense) => expense.id === id);
    dispatch(patchExpense(data));
  };

  const deleteData = (id) => {
    dispatch(deleteExpense(id));
  };

  const filteredData = expenses.filter((item) =>
    item.description.toLowerCase().includes(searchItem.toLowerCase())
  );

  const dataToDisplay = searchItem ? filteredData : expenses;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataToDisplay.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchItem]);

  return (
    <div>
      <div className="w-full mx-auto p-4 bg-white rounded-xl shadow-lg mt-4 overflow-x-auto">
        <SearchBox searchItem={searchItem} setSearchItem={setSearchItem} />
        <table className="min-w-full divide-y divide-gray-200 shadow-lg overflow-x-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item) => {
              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                    <span className="text-black text-bold">&#8377; </span>
                    {item.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm mr-2 cursor-pointer"
                      onClick={() => patchData(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm cursor-pointer bold"
                      onClick={() => deleteData(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="text-sm text-gray-700">
            Page {currentPage} of{" "}
            {Math.ceil(dataToDisplay.length / itemsPerPage)}
          </span>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(dataToDisplay.length / itemsPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseTable;
