import { configureStore } from "@reduxjs/toolkit"

import storiesReducer from './storiesSlice'
import commentsReducer from './commentsSlice'

export const store = configureStore({
	reducer: {
		stories: storiesReducer,
		comments: commentsReducer
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
