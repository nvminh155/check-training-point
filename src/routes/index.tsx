import { ReactNode } from "react";

import {
  ProtectedRouteAdmin,
  ProtectedRouteUser,
} from "@/components/ProtectedRoute";

export enum ERolePath {
  ADMIN = 2,
  USER = 1,
  GUEST = 0,
}

export const createRoute = (
  path: string,
  element: ReactNode,
  roleAccess?: number
) => {
  switch (roleAccess) {
    case 2:
      element = <ProtectedRouteAdmin>{element}</ProtectedRouteAdmin>;
      break;
    case 1:
      element = <ProtectedRouteUser>{element}</ProtectedRouteUser>;
      break;
    default:
      break;
  }

  return {
    path,
    element,
  };
};

export {};
