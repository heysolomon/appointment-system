import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    loginLoading: false,
    loginSucc: false,
    loginError: false,
    loginErrorMessage: '',
    registerLoading: false,
    registerSucc: false,
    registerError: false,
    registerErrorMessage: '',
  },
  reducers: {
    loginStart: (state: { loginLoading: boolean; loginSucc: boolean; }) => {
      state.loginLoading = true;
      state.loginSucc = false;
    },
    loginSuccess: (state: { userData: any; loginSucc: boolean; loginError: boolean; loginLoading: boolean; }, action: { payload: any; }) => {
      state.userData = action.payload;
      state.loginSucc = true;
      state.loginError = false;
      state.loginLoading = false;
    },
    loginFailure: (state: { userData: null; loginErrorMessage: any; loginLoading: boolean; loginError: boolean; }, action: { payload: any; }) => {
      state.userData = null;
      state.loginErrorMessage = action.payload;
      state.loginLoading = false;
      state.loginError = true;
    },
  },
});

export default userSlice.reducer;
export const {
  loginStart,
  loginSuccess,
  loginFailure,
} = userSlice.actions;
