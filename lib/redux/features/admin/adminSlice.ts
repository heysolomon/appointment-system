import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    adminData: null,
    adminToken: null,
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
    loginSuccess: (state: { adminData: any; loginSucc: boolean; loginError: boolean; loginLoading: boolean; }, action: { payload: any; }) => {
      state.adminData = action.payload;
      state.loginSucc = true;
      state.loginError = false;
      state.loginLoading = false;
    },
    loginFailure: (state: { adminData: null; loginErrorMessage: any; loginLoading: boolean; loginError: boolean; }, action: { payload: any; }) => {
      state.adminData = null;
      state.loginErrorMessage = action.payload;
      state.loginLoading = false;
      state.loginError = true;
    },
    setToken: (state: { adminToken: any; }, action: { payload: any; }) => {
      state.adminToken = action.payload;
    },
  },
});

export default adminSlice.reducer;
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  setToken,
} = adminSlice.actions;
