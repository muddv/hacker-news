import { Link } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '../hooks/hooks'
import { update } from '../stores/storiesSlice'


type newsItem = {
	title: string,
	rating: string,
	author: string,
	date: string
}

type props = {
	newsItem: newsItem
}

function NewNews() {
	const news = useAppSelector((state) => state.news.map(item => item.title))
	const dispatch = useAppDispatch()
	return (
		<div>
			<p>{news}</p>
			<button onClick={() => dispatch(update())}>
				update
			</button>
		</div>
	)
}

function NewsItem({ newsItem }: props) {
	return (
		<li
			className='mt-2 bg-orange-100 border-orange-200 border-2'>
			<b className='font-semibold'>
				<Link to="/newsitem">{newsItem.title}</Link>
			</b>
			<p className='text-slate-700'>
				{newsItem.rating} points {}
				by {newsItem.author}
				{} {newsItem.date}
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

