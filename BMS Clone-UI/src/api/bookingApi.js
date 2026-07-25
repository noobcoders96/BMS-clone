import { ENDPOINTS, USE_DUMMY_DATA, authHeaders } from "./config";
import { DUMMY_BOOKINGS } from "../data/dummyData";

const fakeDelay = (ms = 600) => new Promise((res) => setTimeout(res, ms));

export async function createBooking({ showId, seatIds, userId, amount }) {
  if (USE_DUMMY_DATA) {
    await fakeDelay(800);
    return {
      bookingId: `bk_${Math.floor(Math.random() * 9000) + 1000}`,
      status: "PAYMENT_PENDING",
      paymentId: `pay_${Math.floor(Math.random() * 9000) + 1000}`,
      seats: seatIds,
      amount,
    };
  }

  // ============================================================
  // 🔌 PLUG IN HERE — POST /api/bookings  (Booking Service)
  // Request: { showId, seatIds: string[], userId, amount }
  // Response: { bookingId, status, paymentId, seats, amount }
  //
  // This is the heart of the SAGA:
  //   1. Booking Service creates booking in PENDING state
  //   2. Booking Service calls Payment Service SYNCHRONOUSLY (or publishes
  //      a "PaymentRequested" event ASYNC via Kafka — pick one and justify
  //      it in your notes, both are valid designs)
  //   3. On payment success -> booking CONFIRMED, seats CONFIRMED,
  //      a "BookingConfirmed" event is published for Notification Service
  //      to consume ASYNC (send email/SMS)
  //   4. On payment failure -> COMPENSATING TRANSACTION: seats released
  //      back to AVAILABLE, booking marked FAILED
  // ============================================================
  const res = await fetch(ENDPOINTS.CREATE_BOOKING, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ showId, seatIds, userId, amount }),
  });
  if (!res.ok) throw new Error(`Failed to create booking: ${res.status}`);
  return res.json();
}

export async function getPaymentStatus(paymentId) {
  if (USE_DUMMY_DATA) {
    await fakeDelay(1200);
    return { paymentId, status: "SUCCESS" };
  }

  // ============================================================
  // 🔌 PLUG IN HERE — GET /api/payments/{paymentId}  (Payment Service)
  // Frontend polls this (or subscribes over WebSocket/SSE) while the
  // booking is PAYMENT_PENDING. This is also where you'll practice
  // RETRY (poll with backoff) and CIRCUIT BREAKER (stop hammering
  // Payment Service if it's down, show a friendly "try again" instead).
  // ============================================================
  const res = await fetch(ENDPOINTS.PAYMENT_STATUS(paymentId), { headers: authHeaders() });
  if (!res.ok) throw new Error(`Failed to fetch payment status: ${res.status}`);
  return res.json();
}

export async function fetchMyBookings(userId) {
  if (USE_DUMMY_DATA) {
    await fakeDelay();
    return DUMMY_BOOKINGS;
  }

  // ============================================================
  // 🔌 PLUG IN HERE — GET /api/bookings/user/{userId}  (Booking Service)
  // ============================================================
  const res = await fetch(ENDPOINTS.BOOKINGS_BY_USER(userId), { headers: authHeaders() });
  if (!res.ok) throw new Error(`Failed to fetch bookings: ${res.status}`);
  return res.json();
}
