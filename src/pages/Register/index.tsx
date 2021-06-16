import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import styled from "@emotion/styled";
import loginBg from "img/login-bg.png";
import { LockOutlined, MobileOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "context/authContext";
import Helmet from "react-helmet";

const Register = () => {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: {
    nickname: string;
    password: string;
    phone: string;
    captcha: string;
  }) => {
    setLoading(true);
    register(values).finally(() => setLoading(false));
  };

  const onSearch = () => {};

  return (
    <Container>
      <Helmet title={"注册"} />
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
            name={"nickname"}
            rules={[{ required: true, message: "请输入大陆手机号或邮箱" }]}
          >
            <Input
              size={"large"}
              placeholder={"请输入昵称"}
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
          <Form.Item
            name={"phone"}
            rules={[{ required: true, message: "请输入手机号" }]}
          >
            <Input.Search
              size={"large"}
              placeholder={"请输入手机号"}
              prefix={<MobileOutlined className="site-form-item-icon" />}
              enterButton="获取验证码"
              onSearch={onSearch}
              loading
            />
          </Form.Item>
          <Form.Item
            name={"captcha"}
            rules={[{ required: true, message: "请输入验证码" }]}
          >
            <Input
              size={"large"}
              placeholder={"请输入验证码"}
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
              注册
            </Button>
          </Form.Item>
          <Form.Item>
            已经有了网易云的账号，<Link to="/login">直接登陆</Link>
          </Form.Item>
          <Form.Item>
            不想登陆？直接 <Link to="/">聆听音乐</Link>
          </Form.Item>
        </Form>
      </Inner>
    </Container>
  );
};

export default Register;

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
