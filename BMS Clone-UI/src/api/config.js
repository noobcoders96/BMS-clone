/**
 * ============================================================================
 * API CONFIG — WHERE YOU PLUG IN YOUR REAL MICROSERVICES
 * ============================================================================
 * Right now every function in src/api/*.js returns hardcoded dummy JSON so the
 * UI is fully clickable without any backend running.
 *
 * When your microservices are ready, this is the ONLY file you should need to
 * flip from "dummy mode" to "real mode" — every api/*.js file imports
 * USE_DUMMY_DATA from here and branches on it.
 *
 * All requests go through the API GATEWAY (Spring Cloud Gateway), never
 * directly to a microservice. The gateway is responsible for routing
 * /api/auth/**    -> user-service
 * /api/movies/**  -> catalog-service
 * /api/theatres/** and /api/shows/** -> theatre-service
 * /api/bookings/** -> booking-service
 * /api/payments/** -> payment-service   (mostly internal, but exposed for
 *                                        polling a payment's status)
 *
 * See the "Endpoints" and "Communication Matrix" sheets in the requirements
 * Excel file for exact request/response shapes and which calls are sync vs
 * async.
 * ============================================================================
 */

// Flip this to false once your Gateway + services are running.
export const USE_DUMMY_DATA = true;

// Base URL of the API GATEWAY (not individual services — the frontend should
// never know a service's real host/port).
export const GATEWAY_BASE_URL = "http://localhost:8080";

export const ENDPOINTS = {
  // ---- User Service (via Gateway) ----
  LOGIN: `${GATEWAY_BASE_URL}/api/auth/login`,
  REGISTER: `${GATEWAY_BASE_URL}/api/auth/register`,
  PROFILE: (userId) => `${GATEWAY_BASE_URL}/api/users/${userId}`,

  // ---- Catalog Service (via Gateway) ----
  MOVIES: `${GATEWAY_BASE_URL}/api/movies`,
  MOVIE_DETAIL: (movieId) => `${GATEWAY_BASE_URL}/api/movies/${movieId}`,

  // ---- Theatre / Show Service (via Gateway) ----
  SHOWS_BY_MOVIE: (movieId) => `${GATEWAY_BASE_URL}/api/shows?movieId=${movieId}`,
  SEAT_LAYOUT: (showId) => `${GATEWAY_BASE_URL}/api/shows/${showId}/seats`,
  LOCK_SEATS: (showId) => `${GATEWAY_BASE_URL}/api/shows/${showId}/seats/lock`,

  // ---- Booking Service (via Gateway) ----
  CREATE_BOOKING: `${GATEWAY_BASE_URL}/api/bookings`,
  BOOKING_DETAIL: (bookingId) => `${GATEWAY_BASE_URL}/api/bookings/${bookingId}`,
  BOOKINGS_BY_USER: (userId) => `${GATEWAY_BASE_URL}/api/bookings/user/${userId}`,

  // ---- Payment Service (via Gateway) — usually invoked BY booking-service,
  // but the frontend polls this to show live payment status ----
  PAYMENT_STATUS: (paymentId) => `${GATEWAY_BASE_URL}/api/payments/${paymentId}`,
};

// Standard headers helper — swap in your real JWT once User Service issues one.
export function authHeaders() {
  const token = localStorage.getItem("bms_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
