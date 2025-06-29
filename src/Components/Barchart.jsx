import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import barchart from "../assets/bar-chart.png";

const COLORS = ["#7B68EE", "#FF7A7A", "#FFB366", "#5DADE2", "#6BCAA6"];

function Barchart() {
  const expenses = useSelector((state) => state.expenses) || [];

  const groupedData = expenses.reduce((acc, curr) => {
    const existing = acc.find((item) => item.category === curr.category);
    if (existing) {
      existing.amount += Number(curr.amount);
    } else {
      acc.push({
        category: curr.category,
        amount: Number(curr.amount),
      });
    }
    return acc;
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-300 rounded shadow-md p-2 text-sm">
          <p>
            {data.category.toUpperCase()}: ₹ {data.amount}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = () => {
    return (
      <ul className="flex flex-wrap gap-4 justify-center mt-4 text-sm">
        {groupedData.map((entry, index) => (
          <li key={index} className="flex items-center gap-2">
            <span
              className="inline-block w-4 h-4 rounded"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></span>
            <span className="text-gray-800">{entry.category}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-2 mt-5">
      {groupedData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <ReBarChart
            data={groupedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis />
            <Tooltip content={CustomTooltip} />
            <Bar dataKey="amount">
              {groupedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
            <Legend content={CustomLegend} />
          </ReBarChart>
        </ResponsiveContainer>
      ) : (
        <img
          className="w-32 mx-auto opacity-60"
          src={barchart}
          alt="Bar Chart"
          title="No Expense Present"
        />
      )}
    </div>
  );
}

export default Barchart;
