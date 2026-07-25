import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import SeatSelection from "./pages/SeatSelection";
import Payment from "./pages/Payment";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:movieId" element={<MovieDetail />} />
        <Route path="/shows/:showId/seats" element={<SeatSelection />} />
        <Route path="/payment/:bookingId" element={<Payment />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
