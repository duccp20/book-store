import React from "react";
import { Navigate } from "react-router-dom";
import NotPermitted from "../NotPermitted";
import { useSelector } from "react-redux";

const RoleBaseRoute = (props) => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const role = useSelector((state) => state.account.user.role);

  if (isAdminRoute && role === "ADMIN") {
    return <>{props.children}</>;
  } else {
    return (
      <>
        <NotPermitted />
      </>
    );
  }
};
const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  console.log(isAuthenticated, "isAuthenticated trong ProtectedRoute");
  return (
    <>
      {isAuthenticated ? (
        <RoleBaseRoute>{props.children}</RoleBaseRoute>
      ) : (
        <Navigate to="/login"></Navigate>
      )}
    </>
  );
};

export default ProtectedRoute;
