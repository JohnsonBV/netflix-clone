import React, { useEffect, useState } from "react";
import axios from "axios";
import requests from "./requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const randomIndex = Math.floor(Math.random() * request.data.results.length);
      setMovie(request.data.results[randomIndex]);
    }
    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie.title || movie.name || movie.original_name}</h1>
        <div className="banner__buttons">
          <button>Play</button>
          <button>My List</button>
        </div>
        <p className="banner__description">
          {movie.overview?.length > 150 ? movie.overview.slice(0, 150) + "..." : movie.overview}
        </p>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
