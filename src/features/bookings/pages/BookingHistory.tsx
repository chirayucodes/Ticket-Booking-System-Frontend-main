import React from "react";
import { useUserBookingHistoryQuery } from "../../profile/queries";

interface User {
  id?: number;
  name?: string;
}

interface Booking {
  id: number;
  user: User[];
  showId: number;
  seatsBooked: number;
  //hard coded
  movieName?: string;
  theaterName?: string;
  showTime?: string;
}

const BookingHistory: React.FC = () => {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;
  const userId = user?.id;

  const {
    data: bookings,
    isLoading,
    isError,
  } = useUserBookingHistoryQuery(userId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#F84464]/20 border-t-[#F84464] rounded-full animate-spin"></div>
          <p className="text-gray-500 font-bold text-xs uppercase tracking-[0.2em]">
            Retrieving History
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center text-red-400 font-bold">
        Error loading history. Check your connection.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] p-6 text-white">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">
            Your <span className="text-[#F84464]">Bookings</span>
          </h1>
          <div className="h-1 w-20 bg-[#F84464] rounded-full"></div>
        </header>

        <div className="grid gap-6">
          {bookings && bookings.length > 0 ? (
            bookings.map((booking: Booking) => (
              <div
                key={booking.id}
                className="group relative backdrop-blur-3xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-[#F84464]/30 transition-all duration-500"
              >
                {/* Decorative Side Glow */}
                <div className="absolute left-0 top-0 w-1 h-full bg-[#F84464] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-[#F84464] uppercase tracking-[0.3em] mb-1">
                      Booking ID: #{booking.id}
                    </p>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-1">
                      {booking.movieName || "Movie Night"}
                    </h2>
                    <p className="text-gray-400 text-sm font-medium">
                      {booking.theaterName || "Main Screen Cinema"}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-8 text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                      <div>
                        <span className="block text-gray-600 mb-1">
                          Customer
                        </span>
                        <span className="text-white">
                          {booking.user[0]?.name || "Guest"}
                        </span>
                      </div>
                      <div>
                        <span className="block text-gray-600 mb-1">
                          Showtime
                        </span>
                        <span className="text-white">
                          {booking.showTime || "TBD"}
                        </span>
                      </div>
                      <div>
                        <span className="block text-gray-600 mb-1">
                          Total Seats
                        </span>
                        <span className="text-white">
                          {booking.seatsBooked} Tickets
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex flex-col items-start md:items-end border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-10">
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1">
                      Paid Amount
                    </p>
                    <span className="text-3xl font-black text-white italic">
                      ₹{booking.seatsBooked * 250}
                    </span>
                    <div className="mt-3 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-green-400 font-black uppercase tracking-tighter">
                      Confirmed
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="border-2 border-dashed border-white/5 rounded-[2rem] p-20 text-center">
              <p className="text-gray-600 font-bold italic">
                No stories to show yet. Go book a movie!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
