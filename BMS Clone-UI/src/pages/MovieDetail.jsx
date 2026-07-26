import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovieById } from "../api/movieApi";

export default function MovieDetail() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchMovieById(movieId)
      .then((movieData) => {
        setMovie(movieData);
        setShows([]);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading || !movie) {
    return <div className="container empty-state">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="detail-hero">
        <img src={movie.posterUrl} alt={movie.title} />

        <div>
          <h1
            className="marquee"
            style={{ fontSize: 38, margin: "0 0 8px" }}
          >
            {movie.title}
          </h1>

          <div style={{ marginBottom: 10 }}>
            <span className="tag">{movie.genre}</span>
            <span className="tag">
              {movie.durationMins ?? movie.duration} mins
            </span>
            <span className="tag">★ {movie.rating}</span>
          </div>

          <p style={{ color: "var(--text-dim)", maxWidth: 480 }}>
            {movie.description}
          </p>
        </div>
      </div>

      <div className="section-title">Select a Showtime</div>

      <div className="show-list">
        {shows.length === 0 && (
          <p style={{ color: "var(--text-dim)" }}>
            No shows scheduled today.
          </p>
        )}

        {shows.map((show) => (
          <div
            key={show.showId}
            className="show-row"
            onClick={() =>
              navigate(`/shows/${show.showId}/seats`, {
                state: { show, movie },
              })
            }
          >
            <div>
              <div className="time">{show.time}</div>
              <div className="theatre">
                {show.theatreName} · {show.screen}
              </div>
            </div>

            <div className="price">₹{show.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}