import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkToken } from "@/lib/utils";

const PublicRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const user = await checkToken();
      setIsAuthenticated(!!user);
    };
    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to='/all-product' />;
};

export default PublicRoute;
