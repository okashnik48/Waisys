import React, { FC, useEffect, useState } from "react";

import authService from "../services/auth.service";

import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { SetTokens, SetUserProperties } from "../store/slices/user";

import userService from "../services/user.service";

import { useAppDispatch } from "../store/store-hooks";

import { toast } from "react-toastify";

import { useForm, Controller } from "react-hook-form";

const { Title } = Typography;

type DefaultValues = {
  name: string;
  password: string;
};

// TextInput => ui-kit
export interface CustomInputProps {
  label: string;
  control: any;
  name: string;
  rules: Record<string, any>;
  placeholder: string;
  type: string;
}

const CustomInput = ({
  label,
  type = "text",
  placeholder = "Enter Response",
  ...rest
}: CustomInputProps) => {
  return (
    <div className="input-container">
      <label>{label}</label>
      <Controller
        name={rest.name}
        control={rest.control}
        rules={rest.rules}
        render={({ field, fieldState }) => (
          <Input
            bordered={false}
            {...field}
            type={type}
            placeholder={placeholder}
            className={
              fieldState.invalid ? "custom-input error" : "custom-input"
            }
          />
        )}
      />
    </div>
  );
};

const Auth: FC = () => {
  // const [loginInput, setLoginInput] = useState<string>("");
  // const [passwordInput, setPasswordInput] = useState<string>("");

  const { handleSubmit, control } = useForm<DefaultValues>({
    defaultValues: {
      name: "",
      password: "",
    },
  });

  // let user = useAppSelector((state: any) => state.user.user);
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
          onFinish={handleSubmit(onSubmit, (error) => {
            console.log("error", error);
          })}
        >
          <Form.Item
            name="username"
            // rules={[{ required: true, message: "Please input your login!" }]}
          >
            <CustomInput
              control={control}
              label="Login"
              name="name"
              type="text"
              // prefix={<UserOutlined className="site-form-item-icon" />}
              // size="large"
              placeholder="Your login"
              // {...register("name")}
              // value={loginInput}
              // onChange={(e) => setLoginInput(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            // rules={[{ required: true, message: "Please input your password!" }]}
          >
            <CustomInput
              // prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Your password"
              label="Password"
              control={control}
              name="password"
              // size="large"
              // {...register("password")}
              // value={passwordInput}
              // onChange={(e) => setPasswordInput(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              // onClick={() => {
              //   handlerSubmit((data) => console.log(data));
              //   loginHandler;
              // }}
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
