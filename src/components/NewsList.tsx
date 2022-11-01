import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '../hooks/hooks'
import {
	selectStories,
	fetchStories,
	Story,
	updateStories,
	update
} from '../stores/storiesSlice'

type props = {
	story: Story
}

function NewsItem({ story }: props) {
	//TODO move date conversion to earlier stage
	let storyDate = new Date(story.time * 1000).toLocaleString()
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
		console.log("USE EFFECT")
		console.log(storiesStatus.status)
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
		console.log("STORY SECTION")
		let currentStories = storiesStatus.stories
			.map(story => <NewsItem story={story} key={story.id} />)
		setStorySection(currentStories)
	}

	function storiesUpdate() {
		console.warn("storiesUpdate" + new Date())
		//TODO implement a better state change check
		dispatch(updateStories())
		setShowNewAlert(true)
		setTimeout(() => {
			setShowNewAlert(false)
		}, 5000)
	}

	//TODO switch to false, turned on for testing
	const [showNewAlert, setShowNewAlert] = useState(false)

	function handleScrollToNew() {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
		setShowNewAlert(false)
	}

	return (
		<div className='w-2/3'>
			{showNewAlert ? <button
				//@ts-ignore
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
			<p>La circonscription administrative départementale est administrée par un préfet à la tête de différents services de l'État. La collectivité départementale ayant quant à elle, pour l'exercice des compétences qui lui sont dévolues, d'un organe délibérant, le conseil départemental, et d'un organe exécutif, le président du conseil départemental, qui prépare et exécute les délibérations du conseil départemental. Il est assisté à cette fin de vice-présidents et d'un bureau sur le plan politique et de services départementaux pour la mise en œuvre des décisions.

				La circonscription administrative et le territoire de la collectivité départementale ne coïncident pas nécessairement :

				depuis 2015, la circonscription départementale du Rhône regroupe le territoire de la métropole de Lyon et celui du département du Rhône ;
				depuis 2018, la Haute-Corse et la Corse-du-Sud ne sont plus des collectivités et ont fusionné avec la Collectivité territoriale de Corse pour former la Collectivité de Corse ;
				depuis 2019, la ville de Paris n'est plus un département mais une collectivité à statut particulier ;
				depuis le 1er janvier 2021, le Bas-Rhin et le Haut-Rhin ne sont plus des collectivités territoriales et sont remplacés par la collectivité européenne d'Alsace.

				Le territoire départemental est également utilisé comme circonscription électorale pour l'élection des sénateurs. </p>
		</div>
	)
}

