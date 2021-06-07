import { baseUrl } from "http/index";

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  token: string;
}

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: { account: string; password: string }) => {
  const { account } = data;
  let url = "/login/cellphone";
  if (account.indexOf("@") > -1) {
    url = "/login";
  } else {
  }
  return fetch(`${baseUrl}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response: Response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};

export const register = (data: {
  nickname: string;
  password: string;
  phone: string;
  captcha: string;
}) => {
  return fetch(`${baseUrl}/register/cellphone`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response: Response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};

export const loginOut = async () =>
  window.localStorage.removeItem(localStorageKey);
