import { Link } from 'react-router-dom'

import { useMovies } from 'hooks'

import { Button, Stack, Typography, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { Table } from 'components'

import { Add } from '@mui/icons-material'

import moviesService from 'services/movies-service'

function MoviesPage() {
	const navigate = useNavigate()

	const { movies, loading, setMovies } = useMovies()

	const handleEdit = ({ _id: movieIdToEdit }) =>
		navigate('/movie/edit/' + movieIdToEdit)

	const handleDelete = ({ _id: movieIdToDelete }) => {
		moviesService
			.delete(movieIdToDelete)
			.then(() =>
				setMovies(movies.filter((movie) => movie._id !== movieIdToDelete))
			)
			.catch((err) => {
				if (err.response.status === 400)
					setErrorsFromResponse(err.response.data)
			})
	}

	if (loading) return <CircularProgress />

	return (
		<Stack spacing={3}>
			<Stack direction="row" justifyContent="space-between">
				<Typography variant="h2" component="h2">
					Lista de peliculas
				</Typography>

				<Button
					variant="contained"
					color="secondary"
					startIcon={<Add />}
					component={Link}
					to="/movie/new"
				>
					Nuevo pelicula
				</Button>
			</Stack>

			<Table
				columns={[
					{
						label: 'Título',
						path: 'title',
					},
					{
						label: 'Sinopsis',
						path: 'sinopsis',
						props: {
							align: 'right',
						},
					},
					{
						label: 'Cartel',
						path: 'image',
						props: {
							align: 'right',
						},
					},
				]}
				rows={movies.map((movie) => ({
					...movie,
					image: <img width="100" src={movie.image} />,
				}))}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>
		</Stack>
	)
}
export default MoviesPage
