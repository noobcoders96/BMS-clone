import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchSeatLayout, lockSeats } from "../api/showApi";
import { createBooking } from "../api/bookingApi";
import { getCurrentUser } from "../api/authApi";

export default function SeatSelection() {
  const { showId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [layout, setLayout] = useState([]);
  const [selected, setSelected] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const show = state?.show;
  const movie = state?.movie;

  useEffect(() => {
    fetchSeatLayout(showId).then(setLayout);
  }, [showId]);

  function toggleSeat(seat) {
    if (seat.status === "BOOKED") return;
    setSelected((prev) =>
      prev.includes(seat.seatId) ? prev.filter((s) => s !== seat.seatId) : [...prev, seat.seatId]
    );
  }

  const amount = selected.length * (show?.price || 0);

  async function handleProceed() {
    if (selected.length === 0) return;
    setSubmitting(true);
    const user = getCurrentUser();
    try {
      await lockSeats(showId, selected);
      const booking = await createBooking({
        showId,
        seatIds: selected,
        userId: user?.userId,
        amount,
      });
      navigate(`/payment/${booking.bookingId}`, { state: { booking, movie, show, seats: selected } });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container">
      <div className="section-title">
        {movie?.title || "Select Seats"} {show ? `· ${show.time}, ${show.theatreName}` : ""}
      </div>

      <div className="screen-curve" />

      <div className="seat-map">
        {layout.map((row) => (
          <div className="seat-row" key={row.row}>
            <span className="row-label">{row.row}</span>
            {row.seats.map((seat) => {
              const isSelected = selected.includes(seat.seatId);
              const cls = [
                "seat",
                seat.status === "BOOKED" ? "booked" : "available",
                seat.tier === "PREMIUM" ? "premium" : "",
                isSelected ? "selected" : "",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <button key={seat.seatId} className={cls} title={seat.seatId} onClick={() => toggleSeat(seat)} />
              );
            })}
          </div>
        ))}
      </div>

      <div className="legend">
        <span>
          <span className="legend-dot" style={{ background: "transparent", border: "1px solid var(--gold)" }} /> Premium
        </span>
        <span>
          <span className="legend-dot" style={{ background: "transparent", border: "1px solid var(--available)" }} /> Available
        </span>
        <span>
          <span className="legend-dot" style={{ background: "var(--selected)" }} /> Selected
        </span>
        <span>
          <span className="legend-dot" style={{ background: "var(--booked)" }} /> Booked
        </span>
      </div>

      <div className="sticky-bar">
        <div className="info">
          {selected.length > 0 ? `${selected.length} seat(s): ${selected.join(", ")}` : "Select your seats"}
        </div>
        <div>
          <span className="amount">₹{amount}</span>
          <button className="pill-btn" disabled={selected.length === 0 || submitting} onClick={handleProceed}>
            {submitting ? "Locking seats…" : "Proceed to Pay"}
          </button>
        </div>
      </div>
    </div>
  );
}
