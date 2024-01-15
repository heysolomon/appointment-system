import adminSlice from "./features/admin/userSlice";
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import eventSlice from "./features/admin/eventSlice";

const persistUser = {
  key: 'user',
  storage,
  whitelist: ['userData'],
};

const persistedUser = persistReducer(persistUser, adminSlice);

export const reducer = combineReducers({
  user: persistedUser,
  events: eventSlice,
})


