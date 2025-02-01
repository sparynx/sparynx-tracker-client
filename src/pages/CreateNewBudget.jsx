import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useAddBudgetMutation } from "../redux/features/budgetsApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

const CreateNewBudget = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [addBudget, { isLoading, error }] = useAddBudgetMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

 

  const onSubmit = async (data) => {
    if (!currentUser) {
      Swal.fire({
        title: "Login Required",
        text: "You must be logged in to create a budget.",
        icon: "warning",
      });
      return;
    }
  
    try {
      const budgetData = {
        ...data,
        userId: currentUser.uid,
        createdAt: new Date().toISOString(),
      };
  
      // Save budget to the database
      await addBudget(budgetData).unwrap();
  
      // Send email notification to user
      await axios.post("https://sparynx-tracker-server-2.onrender.com/send-email", {
        email: currentUser.email,
        budgetName: budgetData.name,
        amount: budgetData.amount,
        deadline: budgetData.endDate,
      });
  
      Swal.fire({
        title: "Success!",
        text: "Budget added successfully. A confirmation email has been sent!",
        icon: "success",
      });
  
      reset();
      navigate("/");
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Failed to create budget. Please try again.",
        icon: "error",
      });
      console.error("Failed to create budget:", err);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-xl rounded-lg p-6 md:p-8 w-full max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
          Create a New Budget
        </h2>
        {error && <p className="text-red-500 text-center">{error.message}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Budget Name */}
          <div>
            <label className="block text-gray-600 font-medium">Budget Name</label>
            <input
              type="text"
              {...register("name", { required: "Budget name is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-600 font-medium">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
                min: { value: 1, message: "Description must be at least a sentence" },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-600 font-medium">Amount</label>
            <input
              type="number"
              {...register("amount", {
                required: "Amount is required",
                min: { value: 1, message: "Amount must be at least 1" },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-600 font-medium">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Category</option>
              <option value="Personal">Personal</option>
              <option value="Education">Education</option>
              <option value="Business">Business</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-gray-600 font-medium">Start Date</label>
            <input
              type="date"
              {...register("startDate", { required: "Start date is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
          </div>

          {/* End Date */}
          <div>
            <label className="block text-gray-600 font-medium">End Date</label>
            <input
              type="date"
              {...register("endDate", { required: "End date is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:bg-blue-700 transition font-semibold text-lg"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Create Budget"}
            <FiPlus size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewBudget;
