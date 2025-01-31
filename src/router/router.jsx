import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from '../pages/home/Home';
import Login from '../components/Login';
import Signup from '../components/Signup';
import ProtectedRoute from './ProtectedRoute';
import CreateNewBudget from '../pages/CreateNewBudget';
import SingleBudget from '../pages/SingleBudget';
import EditBudget from '../pages/EditBudget';
import DashBoard from '../pages/home/DashBoard';
import PrivacyPolicy from '../components/PrivacyPolicy';
import Contact from '../components/Contact';
import About from '../components/About';
import NotFound from '../components/NotFound';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <ProtectedRoute><Home/></ProtectedRoute>
            },
            {
                path: "/dashboard",
                element: <DashBoard/>
            },
            {
                path: "/signin",
                element: <Login/>
            },
            {
                path: "/signup",
                element: <Signup/>
            },
            {
                path: "/newbudgets",
                element: <CreateNewBudget/>
            },
            {
                path: "/budget/:id",
                element: <SingleBudget/>
            },
            {
                path: "/edit-budget/:id",
                element:<EditBudget/>
            },
            {
                path: "/contact",
                element: <Contact/>
            },
            {
                path: "/about",
                element: <About/>
            },
            {
                path: "/privacy",
                element: <PrivacyPolicy/>
            },
            {
                path: "*",
                element: <NotFound/>
            }
        ]
    }
]);

export default router;