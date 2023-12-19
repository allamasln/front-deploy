import ReactDOM from 'react-dom/client'

import './bootstrap.js'

import ThemeProvider from './theme'

import RouterProvider from './router'

ReactDOM.createRoot(document.getElementById('root')).render(
	<ThemeProvider>
		<RouterProvider />
	</ThemeProvider>
)
