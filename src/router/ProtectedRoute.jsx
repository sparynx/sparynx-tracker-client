import Loader from "../components/Loader";

import { useAuth } from "../context/AuthContext";

import { Navigate } from "react-router-dom";

import PropTypes from  "prop-types"

import React from 'react'

const ProtectedRoute = ({children}) => {

    const {currentUser, loading} = useAuth();

    if(loading) {
        return <Loader/>
    }

    if (currentUser) {
        return children
    }

    return <Navigate to="/signin" replace  />
}
 
ProtectedRoute.PropTypes = {
    children: PropTypes.node.isRequired,
}

export default ProtectedRoute