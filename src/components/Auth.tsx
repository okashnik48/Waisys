import React, { FC, ReactNode, useEffect, useState } from "react";

import authService from "../services/auth.service";

import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { SetTokens, SetUserProperties } from "../store/slices/user";

import userService from "../services/user.service";

import { useAppDispatch } from "../store/store-hooks";

import { toast } from "react-toastify";

import { useForm, Controller } from "react-hook-form";

import { CoreInput } from "../ui-kit/CoreInput";

const { Title } = Typography;

type DefaultValues = {
  name: string;
  password: string;
};

const Auth: FC = () => {
  const { handleSubmit, control } = useForm<DefaultValues>({
    defaultValues: {
      name: "",
      password: "",
    },
  });
  const dispatch = useAppDispatch();

  const [loginTrigger] = authService.useLoginMutation();

  const onSubmit = (data: DefaultValues) => {
    console.log(data);
    loginTrigger({
      password: data.password,
      username: data.name,
    })
      .unwrap()
      .then(({ accessToken, refreshToken }) => {
        console.log("@3423")
        dispatch(SetTokens({ accessToken, refreshToken }));
        localStorage.setItem(
          "tokens",
          JSON.stringify({ accessToken, refreshToken })
        );
        dispatch(userService.endpoints.userInfo.initiate(""))
          .unwrap()
          .then((data) => {
            dispatch(SetUserProperties(data));
          });
      })
      .catch(() =>{
        console.log("324234")
      })
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
          onFinish={handleSubmit(onSubmit, (error) => {
            console.log("error", error);
          })}
        >
          <Form.Item
            name="username"
          >
            <CoreInput
              control={control}
              label="Login"
              name="name"
              type="text"
              prefix={<UserOutlined className="site-form-item-icon" />}
              size="large"
              placeholder="Your login"
              rules={[{ required: true, message: "Please input your login!" }]}
            />
          </Form.Item>
          <Form.Item
            name="password"
          >
            <CoreInput
              type="password"
              placeholder="Your password"
              label="Password"
              control={control}
              name="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              size="large"
              rules={[{ required: true, message: "Please input your password!" }]}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in to your account
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Auth;
