import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './stores/store'
import { App } from './components/App'
import './styles/index.css'

import { NewsItem } from './components/NewsItem'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="newsitem" element={<NewsItem />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode >
)
