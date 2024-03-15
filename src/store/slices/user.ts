import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UsersTypes from '../types/users-types';

interface UserState {
  user: UsersTypes.UserProps
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      accessToken: '',
      refreshToken: '',
      id: '',
      firstName: '',
      lastName: '',
      role: '',
      username: ''
    },
  } as UserState,
  reducers: {
    SetTokens: (state, action: PayloadAction<Tokens>) => {
      state.user.accessToken = action.payload.accessToken;
      state.user.refreshToken = action.payload.refreshToken;
    },
    SetUserProperties: (state, action: PayloadAction<UsersTypes.UserInfo>) => {
      state.user = { ...state.user, ...action.payload };
    },
    ClearUserProperties: (state, action: PayloadAction<undefined>) => {
      return {
        user: {
          accessToken: '',
          refreshToken: '',
          id: '',
          firstName: '',
          lastName: '',
          role: '',
          username: ''
        },
      };
    },
    
  },
});



export const { SetTokens, SetUserProperties,  ClearUserProperties} = UserSlice.actions;



export const userReducer = UserSlice.reducer;
