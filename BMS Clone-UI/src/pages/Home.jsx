import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../api/movieApi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
        <div className="movie-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="movie-card">
              <Skeleton height={320} />
              <div className="movie-card-body">
                <Skeleton height={24} width="80%" />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 8,
                  }}
                >
                  <Skeleton width={60} />
                  <Skeleton width={50} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="movie-grid">
          {movies.map((m) => (
            <div
              key={m.movieId}
              className="movie-card"
              onClick={() => navigate(`/movies/${m.movieId}`)}
            >
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
