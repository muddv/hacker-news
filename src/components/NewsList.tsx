import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '../hooks/hooks'
import { selectStories, update, fetchStories, Story } from '../stores/storiesSlice'

type props = {
	story: Story
}

function NewNews() {
	const news = useSelector(selectStories)
	const dispatch = useAppDispatch()

	const storiesStatus = useSelector(selectStories)

	useEffect(() => {
		if (storiesStatus.status === 'idle') {
			console.log("HERE")
			dispatch(fetchStories())
		}
	}, [storiesStatus, dispatch])

	let storySection = storiesStatus.stories
		.filter(story => story !== null)
		.map(story => <NewsItem story={story} />)

	return (
		<div>
			<p>{storiesStatus.status}</p>
			<p>{storiesStatus.status === 'succeeded' ? storySection : "loading"}</p>
			<button onClick={() => console.log(storiesStatus)}>
				update
			</button>
		</div>
	)
}

function NewsItem({ story }: props) {
	return (
		<li
			className='mt-2 bg-orange-100 border-orange-200 border-2'>
			<b className='font-semibold'>
				<Link to="/newsitem">{story.title}</Link>
			</b>
			<p className='text-slate-700'>
				{story.score} points {}
				by {story.by}
				{} {story.time}
			</p>
		</li>
	)
}

export function NewsList() {
	return (
		<div className='w-3/5'>
			<NewNews />
		</div>
	)
}

