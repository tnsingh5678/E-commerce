import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element: Component, ...rest }) {
  const token = localStorage.getItem('token');
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [token]);

 
  return auth ? <Component {...rest} /> : <Navigate to="/Login" replace />;
}
