import React, { useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux'
import {SetTokens, SetUserProperties} from './redux/user'

export const UpdateFetch = () => {
    dispatch = useDispatch();
    let CookieTokens = {}
    CookieTokens.accessToken = document.cookie.split("; ").find((row) => row.startsWith("accessToken="))?.split("=")[1]
    CookieTokens.refreshToken = document.cookie.split("; ").find((row) => row.startsWith("refreshToken="))?.split("=")[1]
    dispatch(SetTokens(CookieTokens))
};