import React from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};
export const ProtectedRouteAdmin: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  return children;
};

export const ProtectedRouteUser: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  return children;
};
