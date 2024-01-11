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
    reset: (state: { loginLoading: boolean; loginSucc: boolean; loginError: boolean; loginErrorMessage: string; registerLoading: boolean; registerSucc: boolean; registerError: boolean; registerErrorMessage: string; }) => {
      state.loginLoading = false;
      state.loginSucc = false;
      state.loginError = false;
      state.loginErrorMessage = '';
      state.registerLoading = false;
      state.registerSucc = false;
      state.registerError = false;
      state.registerErrorMessage = '';
    },
    resetData: (state: { adminData: null; adminToken: null; }) => {
      state.adminData = null;
      state.adminToken = null;
    },
  },
});

export default adminSlice.reducer;
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  setToken,
  resetData,
  reset,
} = adminSlice.actions;
