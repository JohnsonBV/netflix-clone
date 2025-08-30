import React, { useEffect, useState } from "react";
import { useMovie } from "./MovieContext.jsx";
import axios from "axios";
import YouTube from "react-youtube";
import "./MovieDetail.css";

const API_KEY = "YOUR_TMDB_API_KEY";

function MovieDetail() {
  const { selectedMovie, setSelectedMovie } = useMovie();
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    async function fetchTrailer() {
      if (!selectedMovie) return;
      try {
        const request = await axios.get(
          `https://api.themoviedb.org/3/movie/${selectedMovie.id}/videos?api_key=${API_KEY}&language=en-US`
        );
        const trailers = request.data.results.filter(
          (video) => video.type === "Trailer"
        );
        setTrailer(trailers[0]?.key || "");
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    }
    fetchTrailer();
  }, [selectedMovie]);

  if (!selectedMovie) return null;

  const base_url = "https://image.tmdb.org/t/p/original/";

  return (
    <div className="modal">
      <div className="modal__content">
        <span className="modal__close" onClick={() => setSelectedMovie(null)}>
          &times;
        </span>
        <h2>{selectedMovie.title || selectedMovie.name}</h2>
        <p>{selectedMovie.overview}</p>
        {trailer && <YouTube videoId={trailer} opts={{ width: "100%", height: "390" }} />}
        {selectedMovie.backdrop_path && (
          <img
            src={`${base_url}${selectedMovie.backdrop_path}`}
            alt={selectedMovie.title || selectedMovie.name}
          />
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
