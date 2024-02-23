import React, { FC, useEffect, useState } from "react";

import authService from "../services/auth.service";

import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { SetTokens, SetUserProperties } from "../store/slices/user";

import userService from "../services/user.service";

import { useAppDispatch, useAppSelector } from "../store/store-hooks";

import { toast } from "react-toastify";

const { Title } = Typography;

interface ModalProps {}

const Modalfr: FC<ModalProps> = () => {
  const [loginInput, setLoginInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  let user = useAppSelector((state: any) => state.user.user);
  const dispatch = useAppDispatch();

  const [loginTriger, { isError, isLoading, isSuccess }] =
    authService.useLoginMutation();

  const loginHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    loginTriger({
      password: passwordInput,
      username: loginInput,
    })
      .unwrap()
      .then(({ accessToken, refreshToken }) => {
        dispatch(SetTokens({ accessToken, refreshToken }));
        localStorage.setItem(
          "tokens",
          JSON.stringify({ accessToken, refreshToken })
        );
        console.log(user);
        dispatch(userService.endpoints.userInfo.initiate(""))
          .unwrap()
          .then((data) => {
            dispatch(SetUserProperties(data));
          });
      })
      .catch(({ data }) => {
        toast.error(data.message);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div style={{ margin: "16px", width: "300px" }}>
        <Title level={3}>Login</Title>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={loginHandler}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your login!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              size="large"
              placeholder="Your login"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Your password"
              value={passwordInput}
              size="large"
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={loginHandler}
            >
              Log in to your account
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Modalfr;
