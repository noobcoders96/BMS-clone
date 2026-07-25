import { ENDPOINTS, USE_DUMMY_DATA, authHeaders } from "./config";
import { DUMMY_MOVIES } from "../data/dummyData";

// Simulates network latency so loading states actually get exercised in the UI.
const fakeDelay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

export async function fetchMovies() {
  if (USE_DUMMY_DATA) {
    await fakeDelay();
    return DUMMY_MOVIES;
  }

  // ============================================================
  // 🔌 PLUG IN HERE — GET /api/movies  (Catalog Service)
  // Response: MovieListResponse[] — see Excel "Endpoints" sheet
  // ============================================================
  const res = await fetch(ENDPOINTS.MOVIES, { headers: authHeaders() });
  if (!res.ok) throw new Error(`Failed to fetch movies: ${res.status}`);
  return res.json();
}

export async function fetchMovieById(movieId) {
  if (USE_DUMMY_DATA) {
    await fakeDelay();
    return DUMMY_MOVIES.find((m) => m.movieId === movieId);
  }

  // ============================================================
  // 🔌 PLUG IN HERE — GET /api/movies/{movieId}  (Catalog Service)
  // ============================================================
  const res = await fetch(ENDPOINTS.MOVIE_DETAIL(movieId), { headers: authHeaders() });
  if (!res.ok) throw new Error(`Failed to fetch movie ${movieId}: ${res.status}`);
  return res.json();
}
