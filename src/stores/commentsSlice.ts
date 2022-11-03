import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { response } from 'express'
import type { RootState } from './store'

import { Story } from './storiesSlice'

export interface Comment {
	by: string,
	id: number,
	kids: number[],
	parent: number,
	text: string,
	time: number,
	type: 'comment'
	replies?: Comment[]
}

interface CommentState {
	comments: Comment[],
	status: string,
	//TODO think abt error type
	error: string | undefined | null
}

const initialState: CommentState = {
	comments: [],
	status: 'idle',
	error: null
}

export const fetchComments = createAsyncThunk(
	'comments/fetchComments',
	async (commentIds: Story["id"][]) => {
		const response = await fetch('http://localhost:8000/comments', {
			method: 'POST',
			body: new URLSearchParams({
				'commentIds': `${commentIds.join()}`
			})
		}).then((response) => response.json())
		return response
	}
)

//export const fetchDescendants = fetchComments
//
export const fetchDescendants = createAsyncThunk(
	'comments/fetchDescendants',
	async (commentIds: Story["id"][]) => {
		const response = await fetch('http://localhost:8000/comments', {
			method: 'POST',
			body: new URLSearchParams({
				'commentIds': `${commentIds.join()}`
			})
		}).then((response) => response.json())
		return response
	}
)


const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchComments.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(fetchComments.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.comments = action.payload
			})
			.addCase(fetchComments.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(fetchDescendants.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(fetchDescendants.fulfilled, (state, action) => {
				let parentIndex = state.comments.findIndex
					(comment => comment.id === action.payload[0].parent)
				state.status = `loaded-replies-${parentIndex}`
				state.comments[parentIndex].replies
					= action.payload
			})
			.addCase(fetchDescendants.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	}
})

export const selectComments = (state: RootState) => state.comments
export default commentsSlice.reducer

