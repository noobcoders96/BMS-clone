import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../api/movieApi";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies()
      .then(setMovies)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <div className="hero">
        <h1>NOW SHOWING NEAR YOU</h1>
        <p>Pick a movie, lock your seats, and skip the box-office queue.</p>
      </div>

      <div className="section-title">In Theatres</div>

      {loading ? (
        <p style={{ color: "var(--text-dim)" }}>Loading movies…</p>
      ) : (
        <div className="movie-grid">
          {movies.map((m) => (
            <div key={m.movieId} className="movie-card" onClick={() => navigate(`/movies/${m.movieId}`)}>
              <img src={m.posterUrl} alt={m.title} />
              <div className="movie-card-body">
                <h3>{m.title}</h3>
                <div className="movie-meta">
                  <span>{m.language}</span>
                  <span className="rating">★ {m.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
