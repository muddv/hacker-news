import { useAppSelector, useAppDispatch } from '../hooks/hooks'
import { increment } from '../stores/counterSlice'
import { Header } from './Header'
import { NewsList } from './NewsList'


function Counter() {
	
	const count = useAppSelector((state) => state.counter.value)
	const dispatch = useAppDispatch()

	return (
		<div>
			<p>Count: {count}</p>
			<button 
			onClick={() => dispatch(increment())}
			className="border-2 border-black hover:bg-slate-400 p-2">
				+1
			</button>
		</div>
	)
}

export function App() {
	return (
		<div className="m-10">
			<Counter />
			<Header />
			<NewsList />
		</div>
	)
}

