import { useEffect, useState } from 'react'
import { fetchNetflixOriginals, imageBase } from '../api/requests'

export default function Banner() {
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchNetflixOriginals()
        const pick = data.results?.[Math.floor(Math.random() * data.results.length)]
        setMovie(pick)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  const bg = movie?.backdrop_path ? `${imageBase}${movie.backdrop_path}` : undefined

  return (
    <header className="banner" style={{ backgroundImage: bg ? `url(${bg})` : 'none' }}>
      <div className="fade" />
      <h1>{movie?.name || movie?.title || 'Featured'}</h1>
      <p>{movie?.overview}</p>
    </header>
  )
}
