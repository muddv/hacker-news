import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useAppDispatch } from '../hooks/hooks'
import {
	selectComments,
	fetchComments,
} from '../stores/commentsSlice'
import { fetchStories, selectStories } from '../stores/storiesSlice'

export function StoryPage() {
	const initialCommentState: JSX.Element[] = []
	const [commentSection, setCommentSection] = useState(initialCommentState)
	const id = useParams()
	const dispatch = useAppDispatch()
	const commentsStatus = useSelector(selectComments)
	const storiesStatus = useSelector(selectStories)
	const currentComments = storiesStatus.stories
		.filter(story => story.id === Number(id.storyId))

	useEffect(() => {
		if (commentSection === initialCommentState) {
			dispatch(fetchComments(currentComments[0].kids))
		}
		if (commentsStatus.status === 'succeeded') {
			updateCommentSection()
		}
	}, [commentsStatus.status])

	function updateCommentSection() {
		let updatedComments = commentsStatus.comments
			.map(comment => <li key={comment.id}>{comment.text}</li>)
		setCommentSection(updatedComments)
	}

	return (
		<div>
			<p>COMMENTS</p>
			<ul>{commentSection}</ul>
		</div>
	)
}

