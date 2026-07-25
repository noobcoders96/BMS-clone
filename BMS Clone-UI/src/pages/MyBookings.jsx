import { useEffect, useState } from "react";
import { fetchMyBookings } from "../api/bookingApi";
import { getCurrentUser } from "../api/authApi";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();

  useEffect(() => {
    fetchMyBookings(user?.userId)
      .then(setBookings)
      .finally(() => setLoading(false));
  }, [user?.userId]);

  return (
    <div className="container">
      <div className="section-title">My Bookings</div>
      {loading && <p style={{ color: "var(--text-dim)" }}>Loading…</p>}
      {!loading && bookings.length === 0 && <div className="empty-state">No bookings yet — go grab some popcorn.</div>}
      {bookings.map((b) => (
        <div className="ticket" key={b.bookingId}>
          <div className="ticket-main">
            <h3>{b.movieTitle}</h3>
            <div className="meta">
              {b.theatreName} · {b.time}
            </div>
            <div className="meta">Seats: {b.seats.join(", ")}</div>
            <div style={{ marginTop: 8 }}>
              <span className="badge">{b.status}</span>
            </div>
          </div>
          <div className="ticket-stub">
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22 }}>₹{b.amount}</div>
            <div style={{ fontSize: 11, color: "var(--text-dim)" }}>{b.bookingId}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
