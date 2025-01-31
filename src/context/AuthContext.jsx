import React, { createContext, useContext, useEffect, useState } from 'react';

import {auth} from "../firebase/firebase.config"


import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
  } from 'firebase/auth';

  const AuthContext = createContext();

  export const useAuth = () => {
    return useContext(AuthContext);
  };


  export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    // Register user
    const registerUser = async (email, password) => {
      return await createUserWithEmailAndPassword(auth, email, password);
    };
  
    // Login user
    const loginUser = async (email, password) => {
      return await signInWithEmailAndPassword(auth, email, password);
    };
  
    // Signup with Google account
    const signInWithGoogle = async () => {
      const googleProvider = new GoogleAuthProvider();
      return await signInWithPopup(auth, googleProvider);
    };
  
    // Logout the user
    const logOut = () => {
      return signOut(auth);
    };
  
    // Manage user state
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });
  
      return unsubscribe;
    }, []);
  
    const value = {
      currentUser,
      registerUser,
      loginUser,
      signInWithGoogle,
      logOut,
    };
  
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  };