import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '../hooks/hooks'
import { selectStories, fetchStories, Story, updateStories } from '../stores/storiesSlice'

type props = {
	story: Story
}

function NewsItem({ story }: props) {
	//TODO move date conversion to earlier stage
	let storyDate = new Date(story.time).toString()
	return (
		<li
			className='mt-2 bg-orange-100 border-orange-200 border-2'>
			<b className='font-semibold'>
				<a href={story.url}>{story.title}</a>
			</b>
			<p className='font-bold'>ID: {story.id}</p>
			<p className='text-slate-700'>
				{story.score} points {}
				by {story.by}
				{} {storyDate}
			</p>
		</li>
	)
}

export function NewsList() {
	const dispatch = useAppDispatch()
	const storiesStatus = useSelector(selectStories)

	useEffect(() => {
		if (storiesStatus.status === 'idle') {
			dispatch(fetchStories())
		}
		console.log(storiesStatus.stories)
	}, [storiesStatus, dispatch])

	let storySection: JSX.Element[] = []
	storySection = storiesStatus.stories
		.map(story => <NewsItem story={story} key={story.id} />)

	function storiesUpdate() {
		dispatch(updateStories())
	}

	return (
		<div className='w-2/3'>
			<button
				onClick={storiesUpdate}
				className="border-black border-2 hover:bg-slate-400 p-2">
				Load more stories
			</button>
			<ul>{storiesStatus.status === 'succeeded' ? storySection : "loading"}</ul>
		</div>
	)
}

