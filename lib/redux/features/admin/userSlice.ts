import { createSlice } from '@reduxjs/toolkit';

const lecturerSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        isLoading: false,
        error: false,
    },
    reducers: {
        getUsersStart: (state) => {
            state.isLoading = true;
        },
        getUsersSuccess: (state, action) => {
            state.users = action.payload;
            state.error = false;
            state.isLoading = false;
        },
        getUsersFailure: (state) => {
            state.isLoading = false;
            state.error = true;
        },
    },
});

export default lecturerSlice.reducer;
export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailure
} = lecturerSlice.actions;
