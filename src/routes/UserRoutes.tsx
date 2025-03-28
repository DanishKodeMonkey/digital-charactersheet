import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "../pages/user/UserPage.tsx";
import { useAuth } from "../context/authentication/AuthContext.tsx";

const UserRoutes = () => {
  const isAuthenticated = useAuth();

  return (
    <Routes>
      <Route
        path="/settings"
        element={isAuthenticated
          ? <UserPage />
          : <Navigate to="/auth/signin" />}
      />
      <Route path="*" element={<Navigate to="/settings" />} />
    </Routes>
  );
};

export default UserRoutes;
