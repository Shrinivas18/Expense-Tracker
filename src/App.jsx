import { Route, Routes } from "react-router-dom";
import "./App.css";
import Budget from "./Components/Budget";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseTable from "./Components/ExpenseTable";
import SideBar from "./Components/SideBar";
import TopBar from "./Components/TopBar";

function App() {
  return (
    <div>
      <TopBar />
      <div className="h-screen flex lg:flex-row max-md:flex-col md:flex-col bg-gray-100">
        <SideBar />
        <div className="shadow-xl p-5 w-[100%] overflow-y-auto h-screen">
          <Routes>
            <Route path="/" element={<Budget />} />
            <Route
              path="/expenses"
              element={
                <>
                  <ExpenseForm />
                  <ExpenseTable />
                </>
              }
            />
            <Route path="/menu3" element={<Budget />} />
            <Route path="/menu4" element={<Budget />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
