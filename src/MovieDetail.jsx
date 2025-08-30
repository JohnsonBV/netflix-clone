import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "../api/axios";
import "./MovieDetail.css";

function MovieDetail({ movie, onClose }) {
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    if (movie) {
      const fetchTrailer = async () => {
        try {
          const response = await axios.get(
            `/movie/${movie.id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
          );
          const trailers = response.data.results.filter(
            (vid) => vid.type === "Trailer"
          );
          if (trailers.length > 0) {
            setTrailerUrl(trailers[0].key);
          }
        } catch (error) {
          console.error("Error fetching trailer:", error);
        }
      };
      fetchTrailer();
    }
  }, [movie]);

  if (!movie) return null;

  return (
    <div className="movieDetailOverlay" onClick={onClose}>
      <div className="movieDetailContainer" onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={onClose}>✖</button>
        <h2>{movie.title || movie.name}</h2>
        <p>{movie.overview}</p>
        {trailerUrl && (
          <YouTube
            videoId={trailerUrl}
            opts={{ height: "390", width: "100%", playerVars: { autoplay: 1 } }}
          />
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
