import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import { useMovieShowsQuery } from "features/bookings/queries";

interface Movie {
  id: string | number;
  movieName: string;
}

export default function MovieCard({ movie }: { movie: Movie }) {
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);

  const [date, setDate] = useState<Date | null>();
  const formattedDate = date ? date.toISOString().split("T")[0] : "";
  const { data: shows, isLoading } = useMovieShowsQuery(
    Number(movie.id),
    formattedDate,
  );

  return (
    <div
      className={`group relative backdrop-blur-3xl border transition-all duration-500 overflow-hidden shadow-2xl cursor-pointer
        ${
          isExpanded
            ? "bg-white/5 border-white/10 rounded-3xl p-6"
            : "bg-white/0 border-transparent rounded-2xl p-4 hover:bg-white/5"
        }`}
    >
      <div
        className="flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          <p className="text-[10px] font-bold text-[#F84464] uppercase tracking-[0.2em] mb-1">
            Now Showing
          </p>
          <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-1">
            {movie.movieName}
          </h3>
          <p className="text-xs text-gray-500 font-medium hidden sm:block">
            Bansal One Cinepolis, Bhopal
          </p>
        </div>

        <div
          className={`text-gray-600 transition-transform ${isExpanded ? "rotate-180" : ""}`}
        >
          ▼
        </div>
      </div>

      {/* 3. THE EXPANDABLE SECTION (Booking Logic) */}
      <div
        className={`transition-all duration-500 ease-in-out ${isExpanded ? "max-h-125 mt-6 opacity-100" : "max-h-0 opacity-0"}`}
      >
        {/* Glass Separator */}
        <div className="h-px w-full bg-white/10 mb-6" />

        {/* Dynamic Date Selection (Logic Unchanged) */}
        <div className="mb-6">
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 block">
            Choose Your Date
          </label>
          {/* <Calendar
            value={date}
            onChange={(e) => setDate(e.value as Date)}
            dateFormat="yy-mm-dd"
            minDate={new Date()}
            className="w-full h-8 custom-dark-calendar bg-gray-500" 
            inputClassName="bg-white/5 border-white/10 text-white text-xs rounded-lg px-4 backdrop-blur-md"
            placeholder="Select Date"
            showIcon
          /> */}
          <Calendar
            value={date}
            onChange={(e) => setDate(e.value as Date)}
            dateFormat="yy-mm-dd"
            minDate={new Date()}
            // Removed bg-gray-500 and added a custom class for height/width
            className="w-full h-7 custom-mini-calendar"
            inputClassName="bg-white/5 border-white/5 text-[10px] text-gray-300 rounded-md px-2 backdrop-blur-sm hover:bg-white/10 transition-all outline-none"
            placeholder="Select Date"
            showIcon
            // This makes the icon smaller and gray
            iconPos="right"
          />
        </div>

        {/* Showtime Grid (Logic Unchanged) */}
        <div className="space-y-3">
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block">
            Pick Showtime
          </label>

          {isLoading ? (
            <div className="grid grid-cols-2 gap-2">
              <div className="h-12 bg-white/5 animate-pulse rounded-xl col-span-2" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {shows && shows.length > 0 ? (
                shows.map((show) => (
                  <button
                    key={show.id}
                    onClick={() =>
                      navigate(`/booking/${show.id}`, { state: { show } })
                    }
                    className="flex flex-col items-center justify-center p-3 rounded-xl border border-white/10 bg-white/5 hover:border-[#F84464] hover:bg-[#F84464]/10 transition-all group/time active:scale-95"
                  >
                    <span className="text-sm font-black text-white group-hover/time:text-[#F84464]">
                      {new Date(show.showTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span
                      className={`text-[9px] font-bold uppercase mt-1 ${show.availableSeats < 5 ? "text-yellow-500" : "text-green-500"}`}
                    >
                      {show.availableSeats} Seats
                    </span>
                  </button>
                ))
              ) : (
                <div className="col-span-2 py-4 text-center border border-dashed border-white/10 rounded-xl">
                  <p className="text-[10px] text-gray-600 font-bold uppercase tracking-tight">
                    No shows available for this date
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
