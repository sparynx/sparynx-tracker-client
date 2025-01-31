import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext'; // Ensure you have this hook implemented

const Login = () => {
  const { loginUser, signInWithGoogle } = useAuth();
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await loginUser(data.email, data.password);
      reset(); // Clear the form
      Swal.fire("Login successful!");
      navigate('/'); // Redirect to Home page
    } catch (error) {
      setMessage("Invalid email or password");
      Swal.fire("Error", error.message || "Invalid email or password", "error");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      setMessage("Google sign-in failed", error.message);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Login to Your Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email:</label>
            <input
              type="email"
              className="w-full border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none transition duration-200 text-gray-800 py-1"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Password:</label>
            <input
              type="password"
              className="w-full border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none transition duration-200 text-gray-800 py-1"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200 focus:outline-none">
            Login
          </button>
        </form>
        {/* Google sign in button */}
        <button
          onClick={handleGoogleSignIn}
          className='gap-1 bg-white text-blue-500 py-2 px-8 rounded-lg border border-blue-500 focus:outline-none mt-4 flex items-center justify-center w-full'>
          <FcGoogle size={24} className='mr-2' />
          Sign in with Google
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don&apos;t have an account? 
          <a href="/signup" className="text-indigo-500 underline hover:text-indigo-600 focus:outline-none focus:underline transition duration-200">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
