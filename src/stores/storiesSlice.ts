import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from './store'

export interface Story {
	by: string,
	descendants: number,
	id: number,
	kids: number[],
	score: number,
	title: string,
	time: number,
	type: 'story',
	url: string,
	dead?: boolean
}

interface StoriesState {
	stories: Story[],
	status: string,
	//TODO think about error type
	error: string | undefined | null
}

const initialState: StoriesState = {
	stories: [],
	status: 'idle',
	error: null
}

export const fetchStories = createAsyncThunk(
	'stories/fetchStories',
	async () => {
		const response = await fetch('http://localhost:8000/news')
			.then((response) => response.json())
		return response
	}
)

export const updateStories = createAsyncThunk(
	'stories/updateStories',
	async () => {
		const response = await fetch('http://localhost:8000/update-news')
			.then((response) => response.json())
		return response
	}
)

const storiesSlice = createSlice({
	name: 'stories',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchStories.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(fetchStories.fulfilled, (state, action) => {
				state.status = 'succeeded'
				//TODO make sure reverse does not cause problems if 
				//client remains active for a long time
				state.stories = state.stories.concat(action.payload).reverse()
			})
			.addCase(fetchStories.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(updateStories.pending, (state, action) => {
				state.status = 'updating'
			})
			.addCase(updateStories.fulfilled, (state, action) => {
				state.status = 'updated'
				state.stories = action.payload.concat(state.stories)
			})
			.addCase(updateStories.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	}
})

export const { update } = storiesSlice.actions
export const selectStories = (state: RootState) => state.stories
export default storiesSlice.reducer
