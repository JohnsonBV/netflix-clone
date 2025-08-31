import React, { useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./MovieDetail.css";

function MovieDetail({ movie }) {
  const [trailerUrl, setTrailerUrl] = useState("");

  const handleClick = () => {
    if (trailerUrl) {
      setTrailerUrl(""); // close trailer
    } else {
      movieTrailer(movie?.name || movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log("Trailer not found:", error));
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="movieDetail">
      <h2>{movie?.title || movie?.name}</h2>
      <button onClick={handleClick}>
        {trailerUrl ? "Close Trailer" : "Play Trailer"}
      </button>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default MovieDetail;
