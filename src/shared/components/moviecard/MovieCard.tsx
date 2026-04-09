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

  const [date, setDate] = useState<Date | null>();
  const formattedDate = date ? date.toISOString().split("T")[0] : "";

  const { data: shows, isLoading } = useMovieShowsQuery(
    Number(movie.id),
    formattedDate,
  );

  return (
    <div className="group relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 p-5 shadow-xl">
      <h3 className="text-xl font-black italic text-white mb-4 uppercase tracking-tighter">
        {movie.movieName}
      </h3>

      <div className="mb-6">
        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 block">
          Select Date
        </label>
        <Calendar
          value={date}
          onChange={(e) => setDate(e.value as Date)}
          dateFormat="yy-mm-dd"
          minDate={new Date()}
          className="w-full  h-8 custom-dark-calendar"
          placeholder="Select Date"
          showIcon
        />
      </div>

      <div className="space-y-3">
        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block">
          Pick Showtime
        </label>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-12 bg-white/5 animate-pulse rounded-xl"
              />
            ))}
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
                  className="flex flex-col items-center justify-center p-3 rounded-xl border border-white/10 bg-white/5 hover:border-[#F84464] hover:bg-[#F84464]/10 transition-all group/time"
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
                    {show.availableSeats} Seats Left
                  </span>
                </button>
              ))
            ) : (
              <div className="col-span-2 py-4 text-center border border-dashed border-white/10 rounded-xl">
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-tight">
                  No shows for this date
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
