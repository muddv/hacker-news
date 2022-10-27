import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface Story {
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

let initialState: Story[] = [{
	by: "loading...",
	descendants: 0,
	id: 0,
	kids: [0],
	score: 0,
	title: "loading...",
	time: 0,
	type: "story",
	url: "n/a"
}]

let newsUpdate: Story[]

fetch('http://localhost:8000/news')
	.then((response) => response.json())
	.then((data) => { newsUpdate = data })

const storiesSlice = createSlice({
	name: 'stories',
	initialState,
	reducers: {
		update: (state) => {
			console.log(newsUpdate[0])
			state[0].title = newsUpdate[0].title
		}
	}
})

export const { update } = storiesSlice.actions
export const selectStories = (state: RootState) => state.news
export default storiesSlice.reducer
