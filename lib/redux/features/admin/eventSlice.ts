import { createSlice } from '@reduxjs/toolkit';

const eventSlice = createSlice({
    name: 'event',
    initialState: {
        events: [],
        upcomingEvent: [],
        isLoading: false,
        eventsLoading: false,
        loginErrorMessage: '',
        upcomingLoading: false,
    },
    reducers: {
        getEventsStart: (state) => {
            state.eventsLoading = true;
        },
        getEventsSuccess: (state, action) => {
            state.events = action.payload;
            state.eventsLoading = false;
        },
        getEventsFailure: (state) => {
            state.events = [];
            state.eventsLoading = false;
        },
        getUpcomingEventsStart: (state) => {
            state.upcomingLoading = true;
        },
        getUpcomingEventsSuccess: (state, action) => {
            state.upcomingEvent = action.payload;
            state.upcomingLoading = false;
        },
        getUpcomingEventsFailure: (state) => {
            state.upcomingEvent = [];
            state.upcomingLoading = false;
        },
        createEventsStart: (state) => {
            state.isLoading = true;
        },
        createEventsSuccess: (state) => {
            state.isLoading = false;
        },
        createEventsFailure: (state) => {
            state.isLoading = false;
        },
        bookEventStart: (state) => {
            state.isLoading = true;
        },
        bookEventSuccess: (state) => {
            state.isLoading = false;
        },
        bookEventFailure: (state) => {
            state.isLoading = false;
        },
    },
});

export default eventSlice.reducer;
export const {
    getEventsStart,
    getEventsSuccess,
    getEventsFailure,
    getUpcomingEventsStart,
    getUpcomingEventsSuccess,
    getUpcomingEventsFailure,
    createEventsStart,
    createEventsSuccess,
    createEventsFailure,
    bookEventStart,
    bookEventSuccess,
    bookEventFailure
} = eventSlice.actions;
