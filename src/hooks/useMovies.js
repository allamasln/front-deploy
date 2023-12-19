import { useEffect, useState } from 'react'
import moviesService from 'services/movies-service'

function useMovies() {
	const [movies, setMovies] = useState([])
	const [loading, setLoading] = useState(true)
	const [errors, setErrors] = useState(null)

	useEffect(() => {
		moviesService
			.get()
			.then(({ data }) => setMovies(data))
			.catch((errors) => setErrors(errors))
			.finally(() => setLoading(false))
	}, [])

	return { movies, loading, errors, setMovies }
}

export default useMovies
