import { useAuth } from "context/authContext";
import { useNavigate } from "react-router";

export const useLoginoutRedirect = () => {
  const { user } = useAuth();
  // 退出登录了需要回到首页
  const navigate = useNavigate();
  if (!user) navigate("/", { replace: true });
};
