import adminSlice from "./features/admin/adminSlice";
import { combineReducers } from '@reduxjs/toolkit';
import lecturerSlice from "./features/admin/userSlice";


export const reducer = combineReducers({
  admin: adminSlice,
  user: lecturerSlice,
})


