import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'

export function Header() {
	const id = useParams()

	const [goHome, setGoHome] = useState(false)



	function handleHeaderClick() {
		if (id.storyId) setGoHome(true)
	}

	if (goHome) return <Navigate to={'/'} />

	return (
		<header
			className={id.storyId ? "cursor-pointer" : ""}
			onClick={handleHeaderClick}>
			<h1 className={id.storyId ?
				"mr-auto font-bold text-2xl text-orange-500 hover:underline" :
				"mr-auto font-bold text-2xl text-orange-500"}>
				Hacker News
			</h1>
		</header>
	)
}
