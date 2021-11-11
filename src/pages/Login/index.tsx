import React, { useEffect } from "react";
import { Button, Form, Input, Typography } from "antd";
import styled from "@emotion/styled";
import loginBg from "assets/img/login-bg.png";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "context/authContext";
import { useAsync } from "hooks/useAsync";
import Helmet from "react-helmet";
import { Logo } from "components/Logo";

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const { run, error, isLoading } = useAsync();

  const onFinish = (values: { account: string; password: string }) => {
    run(login(values));
  };

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <Container>
      <Helmet title={"登录"} />
      <Inner>
        <Logo />
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

          {error && (
            <Form.Item>
              <Typography.Text type={"danger"}>{error.message}</Typography.Text>
            </Form.Item>
          )}

          <Form.Item>
            <Button
              loading={isLoading}
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
  height: 100%;
  background: url(${loginBg}) no-repeat center center/cover;
`;

const Inner = styled.div`
  margin: auto;
`;
