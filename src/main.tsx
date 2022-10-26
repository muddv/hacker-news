import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'

import { store } from './stores/store'
import { App } from './components/App'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)
