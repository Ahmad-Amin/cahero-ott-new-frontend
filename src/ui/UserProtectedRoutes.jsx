import React from "react";
import { Navigate } from "react-router-dom";
import { toast, isActive } from "react-toastify";
import { useSelector } from "react-redux";

const UserProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user); 

  if (!user) {
    if (!toast.isActive("login-required-toast")) { 
      toast.error("You need to log in to access this page.", {
        toastId: "login-required-toast", 
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    return <Navigate to="/" />; 
  }

  return children; 
};

export default UserProtectedRoute;
