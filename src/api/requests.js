import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export const fetchTrending = () =>
  api.get(`/trending/all/week?api_key=${API_KEY}&language=en-US`)

export const fetchNetflixOriginals = () =>
  api.get(`/discover/tv?api_key=${API_KEY}&with_networks=213`)

export const fetchTopRated = () =>
  api.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US`)

export const fetchByGenre = (genreId) =>
  api.get(`/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`)

export const imageBase = 'https://image.tmdb.org/t/p/original'
export const thumbBase = 'https://image.tmdb.org/t/p/w300'
