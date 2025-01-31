import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  useFetchAllBudgetsQuery,
  useDeleteBudgetMutation,
} from "../../redux/features/budgetsApi";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { gsap } from "gsap";
import { FiPlus } from "react-icons/fi"; // Import the plus icon

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const { currentUser } = useAuth();
  const { data: budgets = [], isLoading, error } = useFetchAllBudgetsQuery();
  const [deleteBudget] = useDeleteBudgetMutation();
  const navigate = useNavigate();
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: [], borderColor: "#fff", borderWidth: 2 }],
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    return hour < 12
      ? "Good morning"
      : hour < 18
      ? "Good afternoon"
      : "Good evening";
  };

  const getUserName = () =>
    currentUser
      ? currentUser.displayName || currentUser.email.split("@")[0]
      : "Guest";

  const userBudgets = useMemo(() => {
    return currentUser
      ? budgets.filter((budget) => budget.userId === currentUser.uid)
      : [];
  }, [budgets, currentUser]);

  useEffect(() => {
    if (!userBudgets || userBudgets.length === 0) return;

    // Extract categories and generate pie chart data
    const categories = {};
    userBudgets.forEach((budget) => {
      const category = budget.category || "Uncategorized";
      categories[category] = categories[category] ? categories[category] + 1 : 1;
    });

    const chartData = {
      labels: Object.keys(categories),
      datasets: [
        {
          data: Object.values(categories),
          backgroundColor: Object.keys(categories).map(
            () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
          ),
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    };
    setPieData(chartData);
  }, [userBudgets]);

  useEffect(() => {
    if (!isLoading) {
      gsap.fromTo(
        ".welcome-text",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      );
      gsap.fromTo(
        ".add-button",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, delay: 1.5, ease: "elastic.out(1, 0.5)" }
      );
    }
  }, [isLoading]);

  const handleDelete = async (id) => {
    try {
      await deleteBudget(id);
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500 text-center">Error: {error.message}</div>;

  return (
    <div className="py-10 px-6 md:px-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
            {getGreeting()}, {getUserName()}!
          </h1>
          <p className="text-sm md:text-lg text-gray-600 mt-2 md:mt-4">
            Here’s a summary of your budget categories
          </p>
        </div>
        <button
          className="mt-4 md:mt-0 px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition flex items-center gap-2 add-button"
          onClick={() => navigate("/newbudgets")}
        >
          <FiPlus size={18} /> <span className="hidden sm:inline">Add Budget</span>
        </button>
      </div>

      {/* If Budgets Exist */}
      {userBudgets.length > 0 ? (
        <div className="space-y-6">
          {/* Pie Chart */}
          {pieData.datasets && pieData.datasets.length > 0 && (
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <h3 className="text-lg md:text-xl font-semibold mb-4">Budget Categories</h3>
              <div className="h-[250px] md:h-[300px]">
                <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
          )}

          {/* Budget List */}
          <div className="space-y-4 md:space-y-6">
            {userBudgets.map((budget) => (
              <div
                key={budget._id}
                className="bg-gray-100 border border-gray-200 p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition relative"
              >
                <Link to={`/budget/${budget._id}`} className="text-blue-700 hover:underline">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 md:mb-2">
                    {budget.name}
                  </h3>
                </Link>
                <p className="text-sm md:text-base text-gray-600">{budget.description}</p>
                <div className="text-xs md:text-sm text-gray-500 mt-2 md:mt-4">
                  <p>
                    <strong>Created:</strong> {new Date(budget.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Updated:</strong> {budget.updatedAt ? new Date(budget.updatedAt).toLocaleDateString() : "Not yet Updated"}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(budget._id)}
                  className="absolute right-4 top-4 md:right-6 md:top-6 px-3 py-1 md:px-4 md:py-2 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-400 transition text-sm md:text-base"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh] md:h-[60vh] text-center px-4 md:px-6">
          <h1 className="welcome-text text-2xl md:text-3xl font-bold text-gray-700">
            {getGreeting()}, {getUserName()}!
          </h1>
          <p className="text-sm md:text-lg text-gray-600 mt-2 md:mt-4">
            You don’t have any budgets yet. Click below to add one!
          </p>
          <button
            className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 mt-3 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition flex items-center gap-2"
            onClick={() => navigate("/newbudgets")}
          >
            <FiPlus size={18} /> <span className="hidden sm:inline">Add Budget</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
