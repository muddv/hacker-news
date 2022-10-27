import { configureStore } from "@reduxjs/toolkit"

import counterReducer from './counterSlice'
import storiesReducer from './storiesSlice'

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		news: storiesReducer
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
