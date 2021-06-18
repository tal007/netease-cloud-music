import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import styled from "@emotion/styled";
import registerBg from "assets/img/register-bg.png";
import logo from "assets/img/logo.svg";
import { LockOutlined, MobileOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "context/authContext";
import Helmet from "react-helmet";
import { useAjax } from "hooks/useAjax";
import { useAsync } from "hooks/useAsync";
import { CustomImage } from "components/CustomImage";
import { Logo } from "components/Logo";

const Register = () => {
  const { register } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [captcha, setCaptcha] = useState("");

  const client = useAjax();
  const { run: getVerificationCode, isLoading: getCodeLoading } = useAsync();
  const { run: checkCode, isLoading } = useAsync();

  const onFinish = (values: {
    nickname: string;
    password: string;
    phone: string;
    captcha: string;
  }) => {
    checkCode(
      client("/captcha/verify", { data: { captcha, phone: phoneNumber } })
    ).then(() => {
      register(values);
    });
  };

  const sendVerificationCode = () => {
    getVerificationCode(
      client("/captcha/sent", { data: { phone: phoneNumber } })
    );
  };

  return (
    <Container>
      <Helmet title={"注册"} />
      <Inner>
        <Logo />
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
              onChange={(e) => setPhoneNumber(e.target.value)}
              onSearch={sendVerificationCode}
              loading={getCodeLoading}
            />
          </Form.Item>
          <Form.Item
            name={"captcha"}
            rules={[{ required: true, message: "请输入验证码" }]}
          >
            <Input
              size={"large"}
              placeholder={"请输入验证码"}
              onChange={(e) => setCaptcha(e.target.value)}
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={isLoading}
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
  height: 100%;
  background: url(${registerBg}) no-repeat center center/cover;
`;

const Inner = styled.div`
  margin: auto;
`;
