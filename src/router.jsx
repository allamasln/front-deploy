import {
	createBrowserRouter,
	RouterProvider as RouterProviderRRD,
} from 'react-router-dom'

import RootLayout from 'layouts/RootLayout'
import ErrorPage from 'pages/ErrorPage'

import MoviesPage from './pages/MoviesPage'
import AddMoviePage from './pages/AddMoviePage'
import EditMoviePage from './pages/EditMoviePage'

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/movies',
				element: <MoviesPage />,
			},
			{
				path: '/movie/new',
				element: <AddMoviePage />,
			},
			{
				path: '/movie/edit/:movieId',
				element: <EditMoviePage />,
			},
		],
	},
])

const RouterProvider = ({ children }) => <RouterProviderRRD router={router} />

export default RouterProvider
