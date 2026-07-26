// Toggle between dummy data and real backend
export const USE_DUMMY_DATA = true;

// API Gateway URL
export const GATEWAY_BASE_URL = import.meta.env.VITE_GATEWAY_BASE;

export const ENDPOINTS = {
  // User Service
  LOGIN: `${GATEWAY_BASE_URL}/api/auth/login`,
  REGISTER: `${GATEWAY_BASE_URL}/api/auth/register`,
  PROFILE: (userId) => `${GATEWAY_BASE_URL}/api/users/${userId}`,

  // Catalog Service
  MOVIES: `${GATEWAY_BASE_URL}/catalog-service/api/movies`,
  MOVIE_DETAIL: (movieId) =>
    `${GATEWAY_BASE_URL}/catalog-service/api/movies/${movieId}`,

  // Theatre / Show Service
  SHOWS_BY_MOVIE: (movieId) =>
    `${GATEWAY_BASE_URL}/api/shows?movieId=${movieId}`,
  SEAT_LAYOUT: (showId) =>
    `${GATEWAY_BASE_URL}/api/shows/${showId}/seats`,
  LOCK_SEATS: (showId) =>
    `${GATEWAY_BASE_URL}/api/shows/${showId}/seats/lock`,

  // Booking Service
  CREATE_BOOKING: `${GATEWAY_BASE_URL}/api/bookings`,
  BOOKING_DETAIL: (bookingId) =>
    `${GATEWAY_BASE_URL}/api/bookings/${bookingId}`,
  BOOKINGS_BY_USER: (userId) =>
    `${GATEWAY_BASE_URL}/api/bookings/user/${userId}`,

  // Payment Service
  PAYMENT_STATUS: (paymentId) =>
    `${GATEWAY_BASE_URL}/api/payments/${paymentId}`,
};

// Authorization header
export function authHeaders() {
  const token = localStorage.getItem("bms_token");

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}