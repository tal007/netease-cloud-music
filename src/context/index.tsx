import { ErrorBoundary, FullPageErrorCallback } from "components/ErrorBoundary";
import { ReactNode } from "react";
import { AuthProvider } from "./authContext";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary fallbackRender={FullPageErrorCallback}>
      <AuthProvider children={children} />;
    </ErrorBoundary>
  );
};
