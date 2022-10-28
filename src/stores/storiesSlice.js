import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
	stories: [],
	status: 'idle',
	error: null
};
export const fetchStories = createAsyncThunk('stories/fetchStories', async () => {
	const response = await fetch('http://localhost:8000/news')
		.then((response) => response.json());
	return response;
});
const storiesSlice = createSlice({
	name: 'stories',
	initialState,
	reducers: {
		//TODO
		update: (state) => {
			state.stories[0].title = "TODO";
		}
	},
	extraReducers(builder) {
		builder
			.addCase(fetchStories.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchStories.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.stories = state.stories.concat(action.payload);
			})
			.addCase(fetchStories.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	}
});
export const { update } = storiesSlice.actions;
export const selectStories = (state) => state.stories;
export default storiesSlice.reducer;
