import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkToken } from "@/lib/utils";
import Navbar from "@/components/Navbar/Navbar";

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    const verifyToken = async () => {
      const user = await checkToken();
      console.log(user, "ini user");
      setIsAuthenticated(!!user);
    };
    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to='/login' />
  );
}
