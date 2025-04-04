import React, { FC } from "react";

import authService from "../services/auth.service";

import { Form, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { SetTokens, SetUserProperties } from "../store/slices/user";

import userService from "../services/user.service";

import { useAppDispatch } from "../store/store-hooks";

import { useForm } from "react-hook-form";

import { CoreInputRequired } from "../ui-kit/CoreInputRequired";
import { CorePasswordInput } from "../ui-kit/CorePasswordInput";

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
    loginTrigger({
      password: data.password,
      username: data.name,
    })
      .unwrap()
      .then(({ accessToken, refreshToken }) => {
        dispatch(SetTokens({ accessToken, refreshToken }));
        localStorage.setItem(
          "tokens",
          JSON.stringify({ accessToken, refreshToken })
        );
        dispatch(userService.endpoints.userInfo.initiate(null))
          .unwrap()
          .then((data) => {
            dispatch(SetUserProperties(data));
          });
      })
      .catch(() => {
        
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
        <Title level={3}>Авторизація</Title>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={handleSubmit(onSubmit, (error) => {
            console.log("error", error);
          })}
        >
            <CoreInputRequired
              control={control}
              label="Логін"
              name="name"
              type="text"
              prefix={<UserOutlined className="site-form-item-icon" />}
              size="large"
              placeholder="Ваш логін"
              rules={[{ required: true, message: "Введіть ваш логін!" }]}
            />
            <CorePasswordInput
              type="password"
              placeholder="Ваш пароль"
              label="Пароль"
              control={control}
              name="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              size="large"
              rules={[{ required: true, message: "Введіть ваш пароль!" }]}
            />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Увійти в аккаунт
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Auth;
