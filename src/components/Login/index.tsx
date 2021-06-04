import { FC, MouseEvent } from "react";
import Cookies from "js-cookie";
import { Form, Input, Button, Typography, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Pubsub from "pubsub-js";
import styled from "@emotion/styled";

import useURLLoader from "../../hooks/useURLLoader";
import { LOGINDATA, ISLOGIN } from "../../constant";
interface loginRequestData {
  phone?: string;
  email?: string;
  password: string;
}

const Login: FC<{ setShowLogin: (boolean: boolean) => void }> = ({
  setShowLogin,
}) => {
  const { ajax, loading } = useURLLoader();

  const login = (values: { account: string; password: string }) => {
    const { account, password } = values;

    const loginData: loginRequestData = {
      password,
    };

    let url = "/login/cellphone";

    if (account.indexOf("@") > -1) {
      loginData.email = account;
      url = "/login";
    } else {
      loginData.phone = account;
    }

    ajax<LoginData>(url, "POST", loginData)
      .then((response) => {
        console.log(response);
        Cookies.set(LOGINDATA, response.profile);
        Pubsub.publish(ISLOGIN, true);
        setShowLogin(false);
      })
      .catch((err) => {
        setShowLogin(false);
      });
  };

  return (
    <Container onClick={(e: MouseEvent) => e.stopPropagation()}>
      <ShadowCard>
        <Form onFinish={login}>
          <Form.Item>
            <Typography.Title level={4}>登录</Typography.Title>
          </Form.Item>
          <Form.Item
            name={"account"}
            rules={[{ required: true, message: "请输入大陆手机号或邮箱" }]}
          >
            <Input
              size={"large"}
              placeholder={"请输入大陆手机号或邮箱"}
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item
            name={"password"}
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password
              size={"large"}
              placeholder={"请输入密码"}
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType={"submit"}
              loading={loading}
              size={"large"}
              type={"primary"}
              block
            >
              登录
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={() => setShowLogin(false)} size={"large"} block>
              取消
            </Button>
          </Form.Item>
        </Form>
      </ShadowCard>
    </Container>
  );
};

export default Login;

const Container = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ShadowCard = styled(Card)`
  margin: auto;
  width: 36rem;
  text-align: center;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.2) 0 0 10px;
`;
