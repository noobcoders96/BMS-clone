import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovieById } from "../api/movieApi";
import { fetchShowsByMovie } from "../api/showApi";

export default function MovieDetail() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchMovieById(movieId), fetchShowsByMovie(movieId)]).then(([m, s]) => {
      setMovie(m);
      setShows(s);
      setLoading(false);
    });
  }, [movieId]);

  if (loading || !movie) return <div className="container empty-state">Loading…</div>;

  return (
    <div className="container">
      <div className="detail-hero">
        <img src={movie.posterUrl} alt={movie.title} />
        <div>
          <h1 className="marquee" style={{ fontSize: 38, margin: "0 0 8px" }}>
            {movie.title}
          </h1>
          <div style={{ marginBottom: 10 }}>
            {movie.genre.map((g) => (
              <span key={g} className="tag">
                {g}
              </span>
            ))}
            <span className="tag">{movie.durationMins} mins</span>
            <span className="tag">★ {movie.rating}</span>
          </div>
          <p style={{ color: "var(--text-dim)", maxWidth: 480 }}>{movie.description}</p>
        </div>
      </div>

      <div className="section-title">Select a Showtime</div>
      <div className="show-list">
        {shows.length === 0 && <p style={{ color: "var(--text-dim)" }}>No shows scheduled today.</p>}
        {shows.map((s) => (
          <div key={s.showId} className="show-row" onClick={() => navigate(`/shows/${s.showId}/seats`, { state: { show: s, movie } })}>
            <div>
              <div className="time">{s.time}</div>
              <div className="theatre">
                {s.theatreName} · {s.screen}
              </div>
            </div>
            <div className="price">₹{s.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
