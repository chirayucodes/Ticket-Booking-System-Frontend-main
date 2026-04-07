import { Route, Routes } from "react-router";
import Auth from "../features/auth";
import Home from "../features/movies/pages/Home";
import Login from "features/auth/pages/Login";
import Register from "features/auth/pages/Register";
import Bookings from "features/bookings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="auth/*" element={<Auth />} />
      {/* <Route path="/book/:showId" element={<BookSeats />} /> */}
      {/* <Route path="/bookings/confirmation" element={<BookingDetails />} /> */}
      <Route path="booking/*" element={<Bookings />} />
    </Routes>
  );
}
