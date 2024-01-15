import adminSlice from "./features/admin/adminSlice";
import { combineReducers } from '@reduxjs/toolkit';
import lecturerSlice from "./features/admin/userSlice";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import eventSlice from "./features/admin/eventSlice";

const persistAdmin = {
  key: 'admin',
  storage,
  whitelist: ['adminData'],
};

const persistedAdmin = persistReducer(persistAdmin, adminSlice);

export const reducer = combineReducers({
  admin: persistedAdmin,
  user: lecturerSlice,
  events: eventSlice,
})


