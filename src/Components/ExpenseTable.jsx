import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, patchExpense } from "../redux/actions";
import SearchBox from "./SearchBox";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { ClipLoader } from "react-spinners";

function ExpenseTable() {
  const expenses = useSelector((state) => state.expenses);
  const [searchItem, setSearchItem] = useState("");
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const itemsPerPage = 5;
  const dropdownRef = useRef(null);

  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState(null);

  const patchData = (id) => {
    const data = expenses.find((expense) => expense.id === id);
    try {
      setLoadingId(id);
      dispatch(patchExpense(data));
      setOpenDropdown(null);
    } catch (err) {
      console.error("Patch failed:", err);
      setError("Failed to update expense.");
    } finally {
      setLoadingId(null);
    }
  };

  const deleteData = (id) => {
    try {
      setLoadingId(id);
      dispatch(deleteExpense(id));
      setOpenDropdown(null);
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Failed to delete expense.");
    } finally {
      setLoadingId(null);
    }
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="w-full mx-auto p-4 bg-white rounded-xl shadow-lg mt-4 overflow-x-auto">
        <SearchBox searchItem={searchItem} setSearchItem={setSearchItem} />
        <table className="min-w-full divide-y divide-gray-200 shadow-lg overflow-x-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-[40px] px-1 py-3 text-left"></th>
              <th className="px-6 py-3 text-md max-lg:text-sm text-center font-medium text-gray-700 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-md max-lg:text-sm text-center font-medium text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-md max-lg:text-sm text-center font-medium text-gray-700 uppercase tracking-wider">
                Amount Paid
              </th>
              <th className="px-6 py-3 text-md max-lg:text-sm text-center font-medium text-gray-700 uppercase tracking-wider">
                Paid To
              </th>
              <th className="px-6 py-3 text-md max-lg:text-sm text-center font-medium text-gray-700 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-md max-lg:text-sm text-center font-medium text-gray-700 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="w-[40px] px-1 py-2 relative">
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className="p-1 hover:bg-gray-100 rounded-full transition duration-200 focus:outline-none"
                      title="More actions"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                    {openDropdown === item.id && (
                      <div className="absolute left-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                        {loadingId ? (
                          <span lassName="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                            <ClipLoader size={80} color="#ffffff" />
                          </span>
                        ) : (
                          <>
                            <button
                              onClick={() => patchData(item.id)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                              <Edit className="w-4 h-4 text-blue-500" />
                              Edit
                            </button>
                            <button
                              onClick={() => deleteData(item.id)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </td>
                <td
                  title={item.description}
                  className="px-6 py-4 text-ellipsis truncate overflow-hidden whitespace-nowrap max-w-[120px] text-center text-md text-gray-800"
                >
                  {item.description}
                </td>
                <td
                  title={item.category}
                  className="px-6 py-4 text-ellipsis truncate overflow-hidden whitespace-nowrap max-w-[120px] text-center text-md text-gray-800"
                >
                  {item.category}
                </td>
                <td
                  title={`₹ ${item.amount}`}
                  className="px-6 py-4 text-ellipsis truncate overflow-hidden whitespace-nowrap max-w-[120px] text-center text-md text-green-600 font-medium"
                >
                  <span className="text-black font-bold">&#8377; </span>
                  {item.amount}
                </td>
                <td
                  title={item.paidTo}
                  className="px-6 py-4 text-ellipsis truncate overflow-hidden whitespace-nowrap max-w-[120px] text-center text-md"
                >
                  {item.paidTo}
                </td>
                <td
                  title={item.date}
                  className="px-6 py-4 text-ellipsis truncate overflow-hidden whitespace-nowrap max-w-[120px] text-center text-md"
                >
                  {item.date}
                </td>
                <td
                  title={item.time}
                  className="px-6 py-4 text-ellipsis truncate overflow-hidden whitespace-nowrap max-w-[120px] text-center text-md"
                >
                  {item.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {dataToDisplay.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No expenses found
          </div>
        )}

        {dataToDisplay.length > 0 && (
          <div className="flex justify-center items-center mt-4 space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
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
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(dataToDisplay.length / itemsPerPage)
              }
            >
              Next
            </button>
          </div>
        )}
      </div>

      {error && (
        <div>
          <h1 className="text-red-600">Something went wrong!!!</h1>
        </div>
      )}
    </div>
  );
}

export default ExpenseTable;
