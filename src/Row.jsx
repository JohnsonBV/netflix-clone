import React, { useState, useEffect } from "react";
import axios from "axios"; // npm package
import "./Row.css";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__posters">
        {movies.map(
          (movie) =>
            movie.poster_path && (
              <img
                key={movie.id}
                className="row__poster"
                src={`${base_url}${movie.poster_path}`}
                alt={movie.name || movie.title}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Row;
