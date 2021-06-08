import React, { useState, ReactNode } from "react";
import * as auth from "authProvider";

interface AuthLoginForm {
  account: string;
  password: string;
}

interface AuthRegisterForm {
  nickname: string;
  password: string;
  phone: string;
  captcha: string;
}

const AuthContext =
  React.createContext<
    | {
        user: auth.User | null;
        login: (form: AuthLoginForm, cb: () => {}) => Promise<void>;
        register: (form: AuthRegisterForm, cb: () => {}) => Promise<void>;
        loginOut: () => Promise<void>;
      }
    | undefined
  >(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<auth.User | null>(null);

  // 函数式编程中的 point free 概念
  const login = (form: AuthLoginForm, cb: () => {}) =>
    auth
      .login(form)
      .then(setUser)
      .finally(() => cb());
  const register = (form: AuthRegisterForm, cb: () => {}) =>
    auth
      .register(form)
      .then(setUser)
      .finally(() => cb());
  const loginOut = () => auth.loginOut().then(() => setUser(null));

  return (
    <AuthContext.Provider
      value={{ user, login, register, loginOut }}
      children={children}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth 必须在 AuthProvider 中使用");
  }

  return context;
};