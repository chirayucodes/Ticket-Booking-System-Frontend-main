import { Navigate, Route, Routes } from "react-router-dom";
import BookSeats from "./pages/BookSeats";
import BookingDetails from "./pages/BookingDetails";

export default function Bookings() {
  return (
    <Routes>
      <Route index element={<Navigate to="/home" />} />

      <Route path="details" element={<BookingDetails />} />
      <Route path=":showId" element={<BookSeats />} />
    </Routes>
  );
}
