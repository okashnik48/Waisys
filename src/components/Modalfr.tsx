import React, { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import authService from "../services/auth.service";
//import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

import { SetTokens, SetUserProperties } from "./Flowbite/redux/user"

import { useNavigate } from "react-router-dom";
import { store } from "../App";

import userService from "../services/user.service"

import {useAppDispatch, useAppSelector} from "../App"

import { Modal, Typography, TextField, Button } from '@mui/material';

import { ThemeProvider, createTheme } from '@mui/material/styles';

interface ModalProps {}

const Modalfr: FC<ModalProps> = () => {
  const [loginInput, setloginInput] = useState<string>("");
  const [passwordInput, setpasswordInput] = useState<string>("");

const theme = createTheme()

  let user = useAppSelector((state: any) => {
    return state.user.user;
  });
  const dispatch = useAppDispatch();

  const [loginTriger, { isError, isLoading, isSuccess }] = authService.useLoginMutation();
    const [refreshTokenTriger, {}] = authService.useChangeAccessTokenMutation()
    //const { refetch: updateUserInfo } = dispatch(userService.endpoints.userInfo.initiate(""))
  useEffect(() => {
    type ChangeTokenRequest = {
      refreshToken: string,
  }
    
  type Tokens = {
    accessToken: string;
    refreshToken: string;
  }
  
  const storedTokensString = localStorage.getItem("tokens");
  const storedTokens: Tokens | null = storedTokensString ? JSON.parse(storedTokensString) : null;
    
    console.log(storedTokens)

    if (storedTokens !== null) {
      console.log("WORK")
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
        dispatch(SetTokens({ accessToken, refreshToken }))
        localStorage.setItem("tokens",JSON.stringify({ accessToken, refreshToken }));
        console.log(user)
        dispatch(userService.endpoints.userInfo.initiate(''))
        .unwrap()
        .then((data) => {
          dispatch(SetUserProperties(data));
        });
      })
      .catch((error) => {
        console.error("Login error", error);
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <div style={{ margin: '16px', width: '300px' }}>
          <Typography variant="h5" color="textPrimary">
            Login
          </Typography>
          <div style={{ marginTop: '16px' }}>
            <TextField
              id="UserLogin"
              label="Your login"
              fullWidth
              required
              variant="outlined"
              value={loginInput}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setloginInput(event.target.value);
              }}
            />
          </div>
          <div style={{ marginTop: '16px' }}>
            <TextField
              id="password"
              label="Your password"
              type="password"
              fullWidth
              required
              variant="outlined"
              value={passwordInput}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setpasswordInput(event.target.value);
              }}
            />
          </div>
          <div style={{ marginTop: '16px' }}>
            <Button variant="contained" color="primary" onClick={(e) =>{loginHandler(e)}}>
              Log in to your account
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
    );
};

export default Modalfr;