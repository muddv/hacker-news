import data from '../server/data.json'

export function NewsList() {

	const newsSection = data.map(item =>
		<li key={item.title}>
		<p><b className='font-semibold'>{item.title}</b></p>
			<p className='text-slate-700'>
			{item.rating} points { }
			by {item.author}
			{ } {item.date}
			</p>
		</li>)

	return (
		<ul className='mt-5 bg-orange-100 w-1/2'>
			{newsSection}
		</ul>
	)
}

