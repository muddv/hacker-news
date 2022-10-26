import data from '../../server/data.json'

type newsItem = {
	title: string,
	rating: string,
	author: string,
	date: string
}

type props = {
	newsItem: newsItem
}

function NewsItem({ newsItem }: props) {
	return (
		<li
			className='mt-2 bg-orange-100 border-orange-200 border-2'>
			<b className='font-semibold'>{newsItem.title}</b>
			<p className='text-slate-700'>
				{newsItem.rating} points {}
				by {newsItem.author}
				{} {newsItem.date}
			</p>
		</li>
	)
}

export function NewsList() {

	const newsSection = data.map(item =>
		<NewsItem newsItem={item}
			key={Math.random()}
		/>
	)
	return (
		<ul className='w-3/5'>
			{newsSection}
		</ul>
	)
}

