import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element: Component, ...rest }) {
  
  const [auth, setAuth] = useState(false);
  console.log(token);
  console.log(rest);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token retrieved from localStorage: ", token);
  
    if (token) {
      setAuth(true);
    } else {
      console.log("No token found, redirecting to login.");
    }
  }, []); 

 
  return auth ? <Component {...rest} /> : <Navigate to="/Login" replace />;
}
