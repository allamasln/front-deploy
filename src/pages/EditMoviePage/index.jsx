import { useState } from 'react'
import { CircularProgress, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import { Form } from 'components'

import moviesService from 'services/movies-service'

import { useMovie } from 'hooks'

import { schema, fields, getDefaultValues } from './form-data'

function EditMoviePage() {
	const { movieId } = useParams()

	const { movie, loading } = useMovie(movieId)

	const [errorsFromResponse, setErrorsFromResponse] = useState([])

	const onSubmit = (movie) => {
		moviesService
			.update(movieId, movie)
			.then(() => {})
			.catch((err) => {
				if (err.response.status === 400)
					setErrorsFromResponse(err.response.data)
			})
	}

	if (loading) return <CircularProgress />

	return (
		<Stack spacing={3}>
			<Typography variant="h2" component="h2">
				Editar pelicula
			</Typography>

			<Form
				inputs={fields}
				onSubmit={onSubmit}
				validationSchema={schema}
				errorsFromResponse={errorsFromResponse}
				submitLabel="Editar"
				defaultValues={getDefaultValues(movie)}
			/>
		</Stack>
	)
}
export default EditMoviePage
