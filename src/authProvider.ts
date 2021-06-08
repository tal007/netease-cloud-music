import { baseUrl } from "http/index";

export interface User {
  profile: {
    nickname: string;
    userId: number;
    avatarUrl: string;
  };
  token: string;
}

interface requestData {
  phone?: string;
  email?: string;
  password: string;
}

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = (user: User) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export /**
 *  登陆，接受大陆手机号或者邮箱登陆，非大陆暂时未兼容
 *
 * @param {{ account: string; password: string }} data
 * @return {*}
 */
const login = (data: { account: string; password: string }) => {
  const { account, password } = data;
  let url = "/login/cellphone";
  let passData: requestData = { password };

  if (account.indexOf("@") > -1) {
    url = "/login";
    passData.email = account;
  } else {
    passData.phone = account;
  }

  return fetch(`${baseUrl}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(passData),
  }).then(async (response: Response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};

export /**
 *  注册网易云，修改密码也是这个接口
 *
 * @param {{
 *   nickname: string; 昵称
 *   password: string; 密码
 *   phone: string; 手机号
 *   captcha: string; 验证码
 * }} data
 * @return {*}
 */
const register = (data: {
  nickname: string;
  password: string;
  phone: string;
  captcha: string;
}) => {
  return fetch(`${baseUrl}/register/cellphone`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    credentials: "include",
    mode: "cors",
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
