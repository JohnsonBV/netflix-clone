import React, { useEffect, useState } from "react";
import axios from "./requests"; // your API fetcher
import MovieDetail from "./MovieDetail";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            className="row__poster"
            src={`${base_url}${movie.poster_path}`}
            alt={movie.name || movie.title}
          />
        ))}
      </div>
      {selectedMovie && (
        <MovieDetail movie={selectedMovie} />
      )}
    </div>
  );
}

export default Row;
