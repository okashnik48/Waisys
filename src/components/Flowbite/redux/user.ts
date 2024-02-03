import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

import { useAppDispatch } from '../../../App';
import { serviceApi } from '../../../services/app.service';

interface UserState {
  user: {
    accessToken: string,
    refreshToken: string,
    id: string,
    firstName: string,
    lastName: string,
    role: string,
    username: string
  };
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface UserProperties {
  [key: string]: any;
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
    SetUserProperties: (state, action: PayloadAction<UserProperties>) => {
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



export default UserSlice.reducer;
