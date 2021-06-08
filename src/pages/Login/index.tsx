import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import styled from "@emotion/styled";
import loginBg from "img/login-bg.png";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "context/authContext";

const Login = () => {
  const history = useHistory();
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: { account: string; password: string }) => {
    setLoading(true);
    login(values).finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user) {
      history.replace("/");
    }
  }, [user, history]);

  console.log(user);

  return (
    <Container>
      <Inner>
        <Logo>
          <LogoSpan backgroundColor={"#032C9E"}>E</LogoSpan>
          <LogoSpan backgroundColor={"#0E36A6"}>M</LogoSpan>
          <LogoSpan backgroundColor={"#1742BB"}>C</LogoSpan>
          <MusicText>music</MusicText>
          <span>(Mock 网易云)</span>
        </Logo>
        <Form onFinish={onFinish}>
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
              loading={loading}
              htmlType={"submit"}
              size={"large"}
              type={"primary"}
              block
            >
              登录
            </Button>
          </Form.Item>
          <Form.Item>
            还没有网易云的账号，<Link to="/register">点击去注册</Link>
          </Form.Item>
          <Form.Item>
            不想登陆？直接 <Link to="/">聆听音乐</Link>
          </Form.Item>
        </Form>
      </Inner>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex: 1;
  background: url(${loginBg}) no-repeat center center/cover;
`;

const Inner = styled.div`
  margin: auto;
`;

const Logo = styled.h1`
  margin-bottom: 10rem;
  text-transform: uppercase;
  text-align: center;
  height: 6.4rem;
  line-height: 6.4rem;
`;

const LogoSpan = styled.span<{
  backgroundColor?: string;
}>`
  width: 5.7rem;
  display: inline-block;
  text-align: center;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : undefined};
  color: white;
`;

const MusicText = styled.span`
  letter-spacing: 1.5rem;
  margin-left: 1rem;
`;
