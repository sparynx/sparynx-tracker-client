import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useFetchAllBudgetsQuery, useDeleteBudgetMutation } from "../../redux/features/budgetsApi";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { gsap } from "gsap";
import { FiPlus, FiClock, FiCheckCircle } from "react-icons/fi"; // Import icons

ChartJS.register(ArcElement, Tooltip, Legend);

const DashBoard = () => {
  const { currentUser } = useAuth();
  const { data: budgets = [], isLoading, error, refetch } = useFetchAllBudgetsQuery();
  const [deleteBudget] = useDeleteBudgetMutation();
  const navigate = useNavigate();
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: [], borderColor: "#fff", borderWidth: 2 }],
  });

  const userBudgets = useMemo(() => {
    return currentUser ? budgets.filter((budget) => budget.userId === currentUser.uid) : [];
  }, [budgets, currentUser]);

  useEffect(() => {
    if (!userBudgets || userBudgets.length === 0) return;

    // Generate Pie Chart Data
    const categories = {};
    userBudgets.forEach((budget) => {
      const category = budget.category || "Uncategorized";
      categories[category] = categories[category] ? categories[category] + 1 : 1;
    });

    setPieData({
      labels: Object.keys(categories),
      datasets: [
        {
          data: Object.values(categories),
          backgroundColor: Object.keys(categories).map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    });
  }, [userBudgets]);

  useEffect(() => {
    if (!isLoading) {
      gsap.fromTo(".dashboard-container", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" });
      gsap.fromTo(".timeline-item", { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power3.out" });
      gsap.fromTo(".no-budget-container", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1, ease: "power3.out" });
    }
  }, [isLoading, userBudgets]);

  // Handle Budget Completion (Deletes Budget)
  const handleComplete = async (id) => {
    try {
      await deleteBudget(id);
      gsap.to(`#budget-${id}`, { opacity: 0, y: -10, duration: 0.5, ease: "power3.out", onComplete: () => refetch() });
    } catch (error) {
      console.error("Error completing budget:", error);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500 text-center">Error: {error.message}</div>;

  return (
    <div className="dashboard-container py-10 px-6 md:px-12">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6"> Dashboard</h1>

      {userBudgets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Budget Categories</h3>
            <div className="h-[300px]">
              <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Vertical Timeline */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Recent Budget Timeline</h3>
            <div className="relative border-l-4 border-blue-500 pl-6 space-y-6">
              {userBudgets
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by recent first
                .map((budget) => (
                  <div key={budget._id} id={`budget-${budget._id}`} className="timeline-item bg-gray-100 p-4 rounded-lg shadow-md relative flex justify-between items-center">
                    <div>
                      <div className="absolute -left-7 top-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <FiClock className="text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800">{budget.name}</h4>
                      <p className="text-gray-600">{budget.category}</p>
                      <p className="text-gray-800 font-bold">&#8358;{budget.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Created on {new Date(budget.createdAt).toLocaleDateString()}</p>
                    </div>
                    {/* Mark as Completed Button */}
                    <button
                      onClick={() => handleComplete(budget._id)}
                      className="flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded-md shadow-md hover:bg-green-600 transition"
                    >
                      <FiCheckCircle size={18} /> Completed
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        // If No Budgets Exist
        <div className="no-budget-container flex flex-col items-center justify-center h-[50vh] md:h-[60vh] text-center px-4 md:px-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-700">
            No Budgets Found!
          </h1>
          <p className="text-sm md:text-lg text-gray-600 mt-2 md:mt-4">
            You don’t have any budgets yet. Click below to add one!
          </p>
          <button
            className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition flex items-center gap-2"
            onClick={() => navigate("/newbudgets")}
          >
            <FiPlus size={20} /> Add Budget
          </button>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
