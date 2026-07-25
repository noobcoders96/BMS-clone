import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getPaymentStatus } from "../api/bookingApi";

export default function Payment() {
  const { bookingId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("PROCESSING");
  const booking = state?.booking;
  const movie = state?.movie;
  const show = state?.show;
  const seats = state?.seats || [];

  useEffect(() => {
    if (!booking?.paymentId) return;
    // In real mode this is a POLL LOOP with RETRY + BACKOFF. Try wiring
    // Resilience4j's Retry + CircuitBreaker around this exact call.
    getPaymentStatus(booking.paymentId).then((res) => setStatus(res.status));
  }, [booking]);

  if (!booking) {
    return (
      <div className="container status-card">
        <h2>No booking found</h2>
        <p style={{ color: "var(--text-dim)" }}>Start again from the home page.</p>
        <button className="pill-btn" style={{ marginTop: 16 }} onClick={() => navigate("/")}>
          Back to home
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="status-card">
        {status === "PROCESSING" && (
          <>
            <div className="spinner" />
            <h2>Processing Payment</h2>
            <p style={{ color: "var(--text-dim)" }}>Talking to the Payment Service…</p>
          </>
        )}
        {status === "SUCCESS" && (
          <>
            <h2 style={{ color: "var(--gold-soft)" }}>Booking Confirmed 🎬</h2>
            <p className="meta" style={{ color: "var(--text-dim)" }}>{movie?.title}</p>
            <p className="meta" style={{ color: "var(--text-dim)" }}>
              {show?.theatreName} · {show?.time}
            </p>
            <p className="meta" style={{ color: "var(--text-dim)" }}>Seats: {seats.join(", ")}</p>
            <p style={{ margin: "16px 0" }}>
              Booking ID: <strong>{booking.bookingId}</strong>
            </p>
            <button className="pill-btn" onClick={() => navigate("/bookings")}>
              View My Bookings
            </button>
          </>
        )}
        {status === "FAILED" && (
          <>
            <h2 style={{ color: "var(--red)" }}>Payment Failed</h2>
            <p style={{ color: "var(--text-dim)" }}>
              Your seats have been released. This is where the SAGA's compensating transaction runs.
            </p>
            <button className="pill-btn" onClick={() => navigate(-2)}>
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
