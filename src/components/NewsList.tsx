import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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
	//TODO move date conversion to earlier stage
	//TODO more sensible date formatting
	let storyDate = new Date(story.time * 1000).toLocaleString()
	return (
		<li
			className='text-black mt-2 bg-orange-100 border-orange-200 border-2 p-5'>
			<b className='font-semibold'>
				<a href={story.url}>{story.title}</a>
			</b>
			<p className='font-semibold'>
				<Link to={`/${story.id}`}>StoryPage</Link>
				<span>{story.descendants} comments</span>
			</p>
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
		if (storiesStatus.status === 'succeeded' &&
			storiesStatus.stories.length > storySection.length) {
			updateStorySection()
		}
		if (storiesStatus.status === 'updated' &&
			storiesStatus.stories.length > storySection.length) {
			updateStorySection()
		}
		console.log(storiesStatus.stories)
	}, [storiesStatus.status])

	useEffect(() => {
		const interval = setInterval(storiesUpdate, 60000)
		return () => clearInterval(interval)
	}, [])

	const initialStoryState: JSX.Element[] = []
	const [storySection, setStorySection] = useState(initialStoryState)

	function updateStorySection() {
		let currentStories = storiesStatus.stories
			.map(story => <NewsItem story={story} key={story.id} />)
		setStorySection(currentStories)
	}

	function storiesUpdate() {
		console.warn("storiesUpdate" + new Date())
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
			<main className='mx-auto md:w-1/2'>
				{showNewAlert ? <button
					onClick={handleScrollToNew}
					className='ml-[300px] px-2 py-1 fixed bg-orange-200 border-2 border-black rounded-2xl'
				>New Stories!
				</button> : null}
				<button
					onClick={() => dispatch(updateStories())}
					className="border-black border-2 hover:bg-slate-400 p-2">
					Load more stories
				</button>
				<ul>{storySection ? storySection : "loading"}</ul>
			</main>
	)
}

