import { useEffect, useState } from 'react'
import moviesService from 'services/movies-service'

function useMovies(movieId) {
	const [movie, setMovie] = useState({})
	const [loading, setLoading] = useState(true)
	const [errors, setErrors] = useState(null)

	useEffect(() => {
		moviesService
			.getById(movieId)
			.then(({ data }) => setMovie(data))
			.catch((errors) => setErrors(errors))
			.finally(() => setLoading(false))
	}, [])

	return { movie, loading, errors }
}

export default useMovies
