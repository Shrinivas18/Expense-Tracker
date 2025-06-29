import React from "react";
import { useSelector } from "react-redux";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import donutchart from "../assets/donut-chart.png";

const COLORS = ["#FF7A7A", "#FFB366", "#7B68EE", "#5DADE2", "#6BCAA6"];
function Piechart() {
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

  const hasData = groupedData.length > 0;

  return (
    <div className="p-2 mt-5 max-md:mt-2">
      {hasData ? (
        <ResponsiveContainer width="100%" height={300}>
          <RePieChart>
            <Pie
              data={groupedData}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="100%"
              paddingAngle={1.5}
              dataKey="amount"
              nameKey="category"
            >
              {groupedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={CustomTooltip} />
            <Legend content={CustomLegend} />
          </RePieChart>
        </ResponsiveContainer>
      ) : (
        <img
          className="w-32 mx-auto opacity-60"
          src={donutchart}
          alt="Donut Chart"
          title="No Expense Present"
        />
      )}
    </div>
  );
}

export default Piechart;
