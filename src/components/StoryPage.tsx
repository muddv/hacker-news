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
	function loadDescendants() {
		console.log(comment.kids)
	}
	return (
		<li
			className='bg-orange-100 text-black border-2 border-slate-900 p-5 lg:w-5/6 mt-3'
			onClick={loadDescendants}>
			<p className='text-gray-700'>{comment.by} at {comment.time}</p>
			<p>{comment.text}</p>
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
			console.log("here")
			let updatedComments = commentsStatus.comments
				.map(comment => <CommentItem key={comment.id} comment={comment} />)
			setCommentSection(updatedComments)
		}
		else {
			console.log("nope")
			setCommentSection([<p>no comments yet</p>])
		}
	}

	return (
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
	)
}

