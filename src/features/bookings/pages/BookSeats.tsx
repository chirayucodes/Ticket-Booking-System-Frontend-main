import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useShowDetailsQuery,
  useCreateBookingMutation,
  useMovieShowsQuery,
} from "../queries";

export default function BookSeats() {
  const { showId } = useParams<{ showId: string }>();
  const navigate = useNavigate();
  const [ticketCount, setTicketCount] = useState(1);

  const { data: show, isLoading } = useShowDetailsQuery(Number(showId));
  const { mutateAsync: createBooking, isPending } = useCreateBookingMutation();
  const { data } = useMovieShowsQuery(
    Number(show?.movieId),
    new Date().toISOString().split("T")[0],//passing today's date in YYYY-MM-DD format
  );
  console.log("Show details:", show);
  console.log("Movie shows for the day:", data);
  const handleBooking = async () => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;

    if (!user?.id) {
      alert("Please login again to continue.");
      navigate("/auth/login");
      return;
    }

    const payload = {
      userId: Number(user.id),
      showId: Number(showId),
      seatsBooked: ticketCount,
    };

    try {
      await createBooking(payload);
      alert("Booking Successful!");
      navigate("/booking/details");
    } catch (error) {
      alert("Booking failed. Please try again.");
      console.error("Booking error:", error);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center text-white">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6 flex flex-col items-center justify-center">
      {/* theatre screen visual */}
      <div className="w-full max-w-md mb-12">
        <div className="h-1 bg-[#F84464] shadow-[0_0_20px_#F84464] rounded-full"></div>
        <p className="text-center text-[10px] text-gray-500 mt-2 tracking-[0.5em] uppercase">
          Screen
        </p>
      </div>
      {/* ticket selection card */}
      <div className="w-full max-w-md backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-xl font-bold mb-2">Select Number of Tickets</h2>
        <p className="text-sm text-gray-400 mb-8 italic">
          {show?.availableSeats} seats available
        </p>

        {/* simple sounter UI */}
        <div className="flex items-center justify-between bg-black/20 rounded-2xl p-6 border border-white/5 mb-8">
          <button
            onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
            className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-2xl font-bold transition-all"
          >
            -
          </button>

          <div className="text-center">
            <span className="text-5xl font-black text-[#F84464]">
              {ticketCount}
            </span>
            <p className="text-[10px] uppercase text-gray-500 font-bold mt-1 tracking-widest">
              Tickets
            </p>
          </div>

          <button
            onClick={() =>
              setTicketCount(
                Math.min(show?.availableSeats || 10, ticketCount + 1),
              )
            }
            className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-2xl font-bold transition-all"
          >
            +
          </button>
        </div>
        {/* /* pricing summary */}
        <div className="space-y-3 mb-8 px-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Price per ticket</span>
            <span>₹250.00</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-white/5">
            <span>Total Amount</span>
            <span>₹{ticketCount * 250}</span>
          </div>
        </div>

        <button
          onClick={handleBooking}
          disabled={isPending}
          className="w-full bg-[#F84464] hover:bg-[#e03a58] text-white font-bold py-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-[#F84464]/20 disabled:opacity-50"
        >
          {isPending ? "Processing..." : "CONFIRM BOOKING"}
        </button>
      </div>
      <button
        onClick={() => navigate("/home")}
        className="mt-8 text-gray-500 hover:text-white text-sm transition-colors"
      >
        Cancel and go back
      </button>
    </div>
  );
}
