import React, { useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux'
import {SetTokens, SetUserProperties} from '../redux/user'

export const UpdateFetch = () => {
    let user = useSelector((state) => {return state.user.user}); 
    dispatch = useDispatch()
    const dispatch = useDispatch();
    fetch(`https://waisys.dev.m0e.space/api/auth/refreshToken`, {
        method: "POST",
        headers: { Authorization: `Bearer ${user.refreshToken}`},
  
      }).then((value) => {
        let obj = value.json().then((e) => {
          return e;
        });
        return obj;
      })
      .then((obj) => {
        if (obj) {
          dispatch(SetTokens(obj));
        }
    })
};