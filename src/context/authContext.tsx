import React, { useState, ReactNode, useEffect } from "react";
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
        login: (form: AuthLoginForm) => Promise<void>;
        register: (form: AuthRegisterForm) => Promise<void>;
        loginOut: () => Promise<void>;
      }
    | undefined
  >(undefined);

const initialUser = async () => {
  let user = null;
  let userData = auth.getUser();
  if (userData) {
    user = JSON.parse(userData);
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<auth.User | null>(null);

  // 函数式编程中的 point free 概念
  const login = (form: AuthLoginForm) => auth.login(form).then(setUser);
  const register = (form: AuthRegisterForm) =>
    auth.register(form).then(setUser);
  const loginOut = () => auth.loginOut().then(() => setUser(null));

  useEffect(() => {
    initialUser().then(setUser);
  }, []);

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
