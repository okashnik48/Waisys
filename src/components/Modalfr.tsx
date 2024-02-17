import React, { FC, useEffect, useState } from "react";

import authService from "../services/auth.service";

import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { SetTokens, SetUserProperties } from "../store/slices/user";

import userService from "../services/user.service";

import { useAppDispatch, useAppSelector } from "../store/store-hooks";

import { Alert } from "antd";

const { Title } = Typography;

interface AlertProps {
  type?: "success" | "info" | "warning" | "error";
  message: string;
  description: string;
}

interface ModalProps {}

const Modalfr: FC<ModalProps> = () => {
  const [loginInput, setLoginInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  const [alertProps, setAlertProps] = useState<AlertProps>({
    message: "",
    description: "",
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);

  let user = useAppSelector((state: any) => state.user.user);
  const dispatch = useAppDispatch();

  const [loginTriger, { isError, isLoading, isSuccess }] =
    authService.useLoginMutation();

  useEffect(() => {
    type Tokens = {
      accessToken: string;
      refreshToken: string;
    };

    const storedTokensString = localStorage.getItem("tokens");
    const storedTokens: Tokens | null = storedTokensString
      ? JSON.parse(storedTokensString)
      : null;

    console.log(storedTokens);

    if (storedTokens !== null) {
      console.log("WORK");
      const { accessToken, refreshToken } = storedTokens;
      dispatch(SetTokens({ accessToken, refreshToken }));

      dispatch(userService.endpoints.userInfo.initiate({ accessToken }))
        .unwrap()
        .then((data) => {
          dispatch(SetUserProperties(data));
        });
    } else {
      console.error("No tokens found in localStorage");
    }
  }, []);

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
        setShowAlert(true);
        console.log(data);
        console.log(data.message);
        setAlertProps({
          type: "error",
          message: "Login error",
          description: data.message,
        });
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
      <div style={{ position: "absolute", top: 0, right: 0 }}>
        {showAlert && (
          <Alert
            type={alertProps.type}
            description={alertProps.description}
            message={alertProps.message}
            onClose={() => setShowAlert(false)}
            closable
          />
        )}
      </div>
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
