import { Navigate, Route, Routes } from "react-router-dom";
import BookSeats from "./pages/BookSeats";
import BookingDetails from "./pages/BookingDetails";
import BookingHistory from "features/bookings/pages/BookingHistory";

export default function Bookings() {
  return (
    <Routes>
      <Route index element={<Navigate to="/home" />} />

      <Route path="details" element={<BookingDetails />} />
      <Route path=":showId" element={<BookSeats />} />
      <Route path="confirmation" element={<BookingHistory />} />
    </Routes>
  );
}
