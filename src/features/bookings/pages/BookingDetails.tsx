import { useNavigate, useLocation } from "react-router-dom";

export default function BookingDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  // We grab the data passed from the BookSeats page via navigate state
  const bookingData = location.state || {
    movieName: "Movie Title",
    seatsBooked: 0,
    totalPrice: 0,
    showTime: new Date().toLocaleString(),
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center p-6">
      {/* The Virtual Ticket */}
      <div className="w-full max-w-sm backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {/* Ticket Top: Movie Info */}
        <div className="p-8 pb-4 text-center">
          <div className="inline-block px-3 py-1 bg-[#F84464]/20 text-[#F84464] text-[10px] font-bold rounded-full mb-4 tracking-widest uppercase">
            Booking Confirmed
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
            Ticket Summary
          </h1>
          <p className="text-gray-400 text-sm font-medium">
            {bookingData.showTime}
          </p>
        </div>

        {/* Dashed Separator (The "Tear" line) */}
        <div className="flex items-center px-4">
          <div className="w-4 h-8 bg-[#0d1117] rounded-r-full -ml-4"></div>
          <div className="flex-1 border-t-2 border-dashed border-white/10 mx-2"></div>
          <div className="w-4 h-8 bg-[#0d1117] rounded-l-full -mr-4"></div>
        </div>

        {/* Ticket Bottom: Price and Details */}
        <div className="p-8 pt-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">
                Tickets
              </p>
              <p className="text-xl font-bold text-white">
                {bookingData.seatsBooked}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">
                Amount Paid
              </p>
              <p className="text-xl font-bold text-[#F84464]">
                ₹{bookingData.totalPrice}
              </p>
            </div>
          </div>

          {/* <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-1">Transaction ID</p>
            <p className="text-xs font-mono text-gray-300">#BK-{Math.floor(Math.random() * 1000000)}</p>
          </div> */}

          <button
            onClick={() => navigate("/home")}
            className="w-full bg-white hover:bg-gray-200 text-black font-bold py-4 rounded-2xl transition-all active:scale-95 shadow-xl shadow-white/5"
          >
            BACK TO HOME
          </button>
        </div>
      </div>

      <p className="mt-8 text-gray-600 text-xs text-center max-w-62.5">
        A confirmation email has been sent to your registered address. Enjoy
        your movie!
      </p>
    </div>
  );
}
