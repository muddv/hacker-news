import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useAppDispatch } from '../hooks/hooks'
import {
	selectComments,
	fetchComments,
	Comment
} from '../stores/commentsSlice'
import { fetchStories, selectStories } from '../stores/storiesSlice'
import { Header } from './Header'
import { Footer } from './Footer'


interface props {
	comment: Comment
}
function CommentItem({ comment }: props) {
	const dispatch = useAppDispatch()
	const commentsStatus = useSelector(selectComments)

	function loadDescendants() {
		dispatch(fetchComments(comment.kids))
	}

	useEffect(() => {
		if (commentsStatus.status === 'succeeded') {
			updateDescendants()
		}
	}, [commentsStatus.status])

	const initialDescendantState: JSX.Element[] = []
	const [descendantComments, setDescendantComments] = useState(initialDescendantState)

	function updateDescendants() {
	}

	return (
		<li
			className='bg-orange-100 text-black border-2 border-slate-900 p-5 lg:w-5/6 mt-3'>
			<p className='text-gray-700'>{comment.by} at {comment.time} wrote</p>
			<p>{comment.text}</p>
			<p className='text-gray-700 hover:underline cursor-pointer'
				onClick={loadDescendants}>{comment.kids ?
					comment.kids.length > 1 ? comment.kids.length + " replies" : comment.kids.length + " reply"
					: null}</p>
		</li>
	)
}

export function StoryPage() {
	const initialCommentState: JSX.Element[] = []
	const [commentSection, setCommentSection] = useState(initialCommentState)
	const id = useParams()
	const dispatch = useAppDispatch()
	const commentsStatus = useSelector(selectComments)
	const storiesStatus = useSelector(selectStories)
	const currentStory = storiesStatus.stories
		.filter(story => story.id === Number(id.storyId))[0]

	useEffect(() => {
		if (commentSection === initialCommentState) {
			dispatch(fetchComments(currentStory.kids))
		}
		if (commentsStatus.status === 'succeeded') {
			updateCommentSection()
		}
		if (commentsStatus.status === 'rejected') {
			setCommentSection([<p>No comments yet</p>])
		}
	}, [commentsStatus.status])

	function updateCommentSection() {
		if (commentsStatus.comments.length > 0) {
			let updatedComments = commentsStatus.comments
				.map(comment => <CommentItem key={comment.id} comment={comment} />)
			setCommentSection(updatedComments)
		}
	}

	return (
		<div className='h-full bg-slate-700'>
			<div className='bg-slate-700 text-neutral-50 p-5 h-screen'>
				<div className='mx-auto lg:w-1/2'>
					<Header />
					<main>
						<h1 className='font-semibold'>{currentStory.title}</h1>
						<button onClick={() => dispatch(fetchComments(currentStory.kids))}
							className='border-black border-2 bg-neutral-200 text-slate-900 hover:bg-slate-400 p-1'>Load new comments</button>
						<ul>{commentSection}</ul>
					</main>
					<Footer />
				</div>
			</div>
		</div>
	)
}
