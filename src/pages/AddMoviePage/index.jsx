import { useState } from 'react'
import { Stack, Typography } from '@mui/material'

import { Form } from 'components'

import moviesService from 'services/movies-service'

import { schema, fields } from './form-data'

function AddMoviePage() {
	const [errorsFromResponse, setErrorsFromResponse] = useState([])

	const onSubmit = (movie, { reset }) => {
		// https://plainenglish.io/blog/how-to-append-javascript-data-to-formdata

		const formData = new FormData()

		formData.append('title', movie.title)
		formData.append('sinopsis', movie.sinopsis)
		formData.append('image', movie.image[0], movie.image[0].name)

		moviesService
			.create(formData)
			.then(() => reset())
			.catch((err) => {
				if (err.response.status === 400)
					setErrorsFromResponse(err.response.data)
			})
	}

	return (
		<Stack spacing={3}>
			<Typography variant="h2" component="h2">
				Añadir nueva pelicula
			</Typography>

			<Form
				inputs={fields}
				onSubmit={onSubmit}
				validationSchema={schema}
				errorsFromResponse={errorsFromResponse}
				submitLabel="Crear"
			/>
		</Stack>
	)
}
export default AddMoviePage
