import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchBudgetByIdQuery } from "../redux/features/budgetsApi"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";  // Firebase authentication
import Swal from "sweetalert2";
import Loader from "../components/Loader";

// Inline global styles
const globalStyles = `
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .fade-in {
    animation: fadeIn 1s ease-in-out;
  }
`;

const SingleBudget = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { data: budget, error, isLoading } = useFetchBudgetByIdQuery(id); 
  const [currentUser, setCurrentUser] = useState(null);  // State to store the current user

  // Get the current time of day for the greeting message
  const getTimeOfDay = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning";
    if (hours < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Fetch user info from Firebase Authentication
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);  // Set the user object when logged in
      } else {
        navigate("/login");  // Redirect if no user is authenticated
      }
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, [navigate]);

  const greetingMessage = currentUser ? `${getTimeOfDay()}, ${currentUser.displayName || "User"}` : "Loading...";

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to fetch budget details.",
        icon: "error",
      });
      navigate("/"); 
    }
  }, [error, navigate]);

  if (isLoading || !currentUser) {
    return <Loader />;
  }

  if (!budget) {
    return <p>No budget found!</p>;
  }

  // Format the date for display
  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      {/* Global Styles */}
      <style>{globalStyles}</style>

      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-3xl p-8 bg-white border-2 border-gray-300 rounded-lg shadow-xl fade-in">
          {/* Greeting Message */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-wide">{greetingMessage}</h2>
            <p className="text-gray-600 font-medium opacity-80">Here are the details of your selected budget plan.</p>
          </div>

          <div className="space-y-6">
            {/* Budget Name */}
            <div className="card-detail">
              <h3 className="text-lg font-bold text-gray-800 tracking-wide">Budget Name</h3>
              <p className="text-gray-900 text-xl">{budget.name}</p>
            </div>
            
            {/* Description */}
            <div className="card-detail">
              <h3 className="text-lg text-gray-800 tracking-wide">Description</h3>
              <p className="text-gray-900 text-xl">{budget.description}</p>
            </div>

            {/* Amount */}
            <div className="card-detail">
              <h3 className="text-lg text-gray-800 tracking-wide">Amount</h3>
              <p className="text-gray-900 text-xl">&#8358;{budget.amount}</p> {/* Naira symbol */}
            </div>

            {/* Category */}
            <div className="card-detail">
              <h3 className="text-lg text-gray-800 tracking-wide">Category</h3>
              <p className="text-gray-900 text-xl">{budget.category}</p>
            </div>

            {/* Start Date */}
            <div className="card-detail">
              <h3 className="text-lg text-gray-800 tracking-wide">Start Date</h3>
              <p className="text-gray-900 text-xl">{formatDate(budget.startDate)}</p>
            </div>

            {/* End Date */}
            <div className="card-detail">
              <h3 className="text-lg text-gray-800 tracking-wide">End Date</h3>
              <p className="text-gray-900 text-xl">{formatDate(budget.endDate)}</p>
            </div>

            <div className="mt-4">
              <button
                onClick={() => navigate(`/edit-budget/${budget._id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transform transition-all duration-300 ease-in-out"
              >
                Edit Budget
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBudget;
