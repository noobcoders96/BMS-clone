import { ENDPOINTS, USE_DUMMY_DATA, authHeaders } from "./config";
import { DUMMY_SHOWS, generateSeatLayout } from "../data/dummyData";

const fakeDelay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

export async function fetchShowsByMovie(movieId) {
  if (USE_DUMMY_DATA) {
    await fakeDelay();
    return DUMMY_SHOWS[movieId] || [];
  }

  // ============================================================
  // 🔌 PLUG IN HERE — GET /api/shows?movieId={movieId}  (Theatre Service)
  // This is a SYNC call: user is waiting on screen for showtimes.
  // ============================================================
  const res = await fetch(ENDPOINTS.SHOWS_BY_MOVIE(movieId), { headers: authHeaders() });
  if (!res.ok) throw new Error(`Failed to fetch shows: ${res.status}`);
  return res.json();
}

export async function fetchSeatLayout(showId) {
  if (USE_DUMMY_DATA) {
    await fakeDelay(300);
    return generateSeatLayout();
  }

  // ============================================================
  // 🔌 PLUG IN HERE — GET /api/shows/{showId}/seats  (Theatre Service)
  // ============================================================
  const res = await fetch(ENDPOINTS.SEAT_LAYOUT(showId), { headers: authHeaders() });
  if (!res.ok) throw new Error(`Failed to fetch seat layout: ${res.status}`);
  return res.json();
}

export async function lockSeats(showId, seatIds) {
  if (USE_DUMMY_DATA) {
    await fakeDelay(300);
    return { locked: true, lockExpiresInSeconds: 300 };
  }

  // ============================================================
  // 🔌 PLUG IN HERE — POST /api/shows/{showId}/seats/lock  (Theatre Service)
  // Request: { seatIds: string[], userId: string }
  // This is where you'll practice OPTIMISTIC LOCKING / a short-lived Redis
  // lock so two users can't book the same seat — a core interview topic.
  // ============================================================
  const res = await fetch(ENDPOINTS.LOCK_SEATS(showId), {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ seatIds }),
  });
  if (!res.ok) throw new Error(`Failed to lock seats: ${res.status}`);
  return res.json();
}
