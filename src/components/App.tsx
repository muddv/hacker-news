import { Header } from './Header'
import { NewsList } from './NewsList'
import { Footer } from './Footer'

export function App() {
	return (
		<div className="bg-slate-700 text-neutral-50 p-5">
			<div className='mx-auto lg:w-1/2'>
				<Header />
				<NewsList />
				<Footer />
			</div>
		</div>
	)
}

