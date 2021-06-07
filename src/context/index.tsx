import { ReactNode } from "react";
import { AuthProvider } from "./authContext";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider children={children} />;
};
