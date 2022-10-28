import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
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
	url: string
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

const storiesSlice = createSlice({
	name: 'stories',
	initialState,
	reducers: {
		//TODO
		update: (state) => {
			state.stories[0].title = "TODO"
		}
	},
	extraReducers(builder) {
		builder
			.addCase(fetchStories.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(fetchStories.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.stories = state.stories.concat(action.payload)
			})
			.addCase(fetchStories.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	}
})

export const { update } = storiesSlice.actions
export const selectStories = (state: RootState) => state.stories
export default storiesSlice.reducer
