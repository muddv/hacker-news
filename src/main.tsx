import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './stores/store'
import { App } from './components/App'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//TODO restore StrictMode, disabling now for testing
//	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	// </React.StrictMode >
)
