import { configureStore } from "@reduxjs/toolkit";
import storiesReducer from './storiesSlice';
export const store = configureStore({
    reducer: {
        stories: storiesReducer
    },
});
