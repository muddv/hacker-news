import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { useAppDispatch } from '../hooks/hooks'
import {
	selectStories,
	fetchStories,
	Story,
	updateStories
} from '../stores/storiesSlice'

type props = {
	story: Story
}

function NewsItem({ story }: props) {
	let storyDate = new Date(story.time * 1000).toLocaleString()
	const [goToStory, setGoToStory] = useState(false)
	if (goToStory) return <Navigate to={`/${story.id}`} />
	return (
		<li onClick={() => setGoToStory(true)}
			className='truncate cursor-pointer w-5/6 text-black mt-3 bg-orange-100 border-orange-200 border-2 p-5 hover:bg-orange-200 hover:border-orange-400'>
			<b onClick={() => null}
				className='text-xl font-semibold hover:underline'>
				<a onClick={(e) => e.stopPropagation()}
					href={story.url}>{story.title}</a>
			</b>
			<p className='font-semibold'>
				<span>{story.descendants} comments</span>
			</p>
			<p className='text-slate-700'>
				{story.score} {story.score > 1 ? "points" : "point"} {}
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
		if (storiesStatus.status === 'succeeded' &&
			storiesStatus.stories.length > storySection.length) {
			updateStorySection()
		}
		if (storiesStatus.status === 'updated' &&
			storiesStatus.stories.length > storySection.length) {
			updateStorySection()
		}
	}, [storiesStatus.status])

	useEffect(() => {
		const interval = setInterval(storiesUpdate, 60000)
		return () => clearInterval(interval)
	}, [])

	const initialStoryState: JSX.Element[] = []
	const [storySection, setStorySection] = useState(initialStoryState)

	function updateStorySection() {
		let currentStories = storiesStatus.stories
			.filter(story => !story.dead)
			.map(story => <NewsItem story={story} key={story.id} />)
		setStorySection(currentStories)
	}

	function storiesUpdate() {
		dispatch(updateStories())
		setShowNewAlert(true)
		setTimeout(() => {
			setShowNewAlert(false)
		}, 5000)
	}

	const [showNewAlert, setShowNewAlert] = useState(false)

	function handleScrollToNew() {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
		setShowNewAlert(false)
	}

	return (
		<main>
			{showNewAlert ? <button
				onClick={handleScrollToNew}
				className='ml-[300px] font-semibold text-slate-900 p-2 py-1 fixed bg-orange-200 border-2 border-black rounded-2xl'
			>New Stories!
			</button> : null}
			<button
				onClick={() => dispatch(updateStories())}
				className="border-black border-2 bg-neutral-200 text-slate-900 hover:bg-slate-400 p-1">
				Load more stories
			</button>
			<ul>{storySection ? storySection : "loading"}</ul>
		</main>
	)
}

