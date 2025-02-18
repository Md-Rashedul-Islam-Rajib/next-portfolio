import { ReactNode } from "react";

export type User = {
  _id?: string;
  image?: string;
  name?: string;
  email: string;
  password?: string;
  isBlocked?: boolean; 
  role: "customer" | "admin";
  iat: number;
  exp: number;
};

export type PrivateRoute = {
  allowedRoles: User["role"][];
  children: ReactNode;
};

export type TRoute = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TRoute[];
};

export type TAuthState = {
  user:  User | null;
  token:  string | null;
};