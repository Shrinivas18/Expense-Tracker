import React from "react";
import { useNavigate } from "react-router";
import Budget from "./Budget";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <section className="bg-white text-gray-900 py-20 px-6 shadow-sm rounded-xl">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold leading-tight mb-6 text-black max-lg:text-2xl">
            Managing expenses is tough? <br />
            <span className="text-blue-600 text-4xl max-lg:text-2xl">
              Not anymore - take control with ease
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Smart tools to help you stay on top of your finances — no
            spreadsheets, no stress.
          </p>
          <button
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
            type="button"
            onClick={() => navigate("/budget")}
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
