import { Route, Routes } from "react-router";
import Auth from "../features/auth";
import Home from "../features/movies/pages/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />

      <Route path="auth/*" element={<Auth />} />
      {/* <Route path="/register" element={<Register />} /> */}
      {/* <Route path="/home" element={<div>Home Page</div>} />
      <Route path="/movies/:movieId" element={<div>Movie Details</div>} />
      <Route path="/book/:showId" element={<div>Book Seats</div>} />
      <Route path="/profile" element={<div>Booking History</div>} /> */}

      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}
