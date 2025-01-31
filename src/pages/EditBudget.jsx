import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchBudgetByIdQuery, useUpdateBudgetMutation } from "../redux/features/budgetsApi";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";

const EditBudget = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { data: budget, error, isLoading, refetch } = useFetchBudgetByIdQuery(id);
  const [updateBudget, { isLoading: isUpdating, error: updateError }] = useUpdateBudgetMutation();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: budget?.name || "",
      description: budget?.description || "",
      amount: budget?.amount || "",
      category: budget?.category || "",
      startDate: budget?.startDate || "",
      endDate: budget?.endDate || "",
    },
  });

  useEffect(() => {
    if (budget) {
      reset(budget); // Reset form with the fetched budget data
    }
  }, [budget, reset]);

  const onSubmit = async (data) => {
    if (!currentUser) {
      Swal.fire({
        title: "Login Required",
        text: "You must be logged in to update the budget.",
        icon: "warning",
      });
      return;
    }

    try {
        const updatedBudget = { 
            ...data, 
            userId: currentUser.uid,
            updatedAt: new Date().toISOString(), // Manually update the updatedAt field
          };
      await updateBudget({ id, ...updatedBudget }).unwrap();

      Swal.fire({
        title: "Success!",
        text: "Budget updated successfully.",
        icon: "success",
      });

      refetch(); // Refetch the budget data

      navigate(`/budget/${id}`); // Redirect to the budget details page
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Failed to update budget. Please try again.",
        icon: "error",
      });
      console.error("Failed to update budget:", err);
    }
  };

  if (isLoading || !budget) {
    return <Loader />;
  }

  if(error) {
    return <div>Error: ,{error.message}</div>
  }
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-semibold mb-4">Edit Budget</h2>
      {updateError && <p className="text-red-500">{updateError.message}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Budget Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Budget Name</label>
          <input
            type="text"
            {...register("name", { required: "Budget name is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
              min: { value: 1, message: "Description must be at least a sentence" },
            })}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            {...register("amount", {
              required: "Amount is required",
              min: { value: 1, message: "Amount must be at least 1" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            <option value="Personal">Personal</option>
            <option value="Education">Education</option>
            <option value="Business">Business</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && <p className="text-red-500">{errors.category.message}</p>}
        </div>

        {/* Start Date */}
        <div className="mb-4">
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            {...register("startDate", { required: "Start date is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
        </div>

        {/* End Date */}
        <div className="mb-4">
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            {...register("endDate", { required: "End date is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Budget"}
        </button>
      </form>
    </div>
  );
};

export default EditBudget;
