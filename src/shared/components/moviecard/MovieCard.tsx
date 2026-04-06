interface Movie {
  id: string | number;
  movieName: string;
  genre?: string;
  rating?: string;
  imageUrl?: string; //optional
}

interface MovieCardProps {
  movie: Movie;
  onBookNow: (id: string | number) => void;
}

export default function MovieCard({ movie, onBookNow }: MovieCardProps) {
  return (
    <div className="group relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 shadow-xl">
      {/* Movie Info Container */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2 truncate">
          {movie.movieName}
        </h3>

        {/* Placeholder for Movie Meta (Genre/Rating) */}
        <div className="flex gap-2 mb-4">
          <span className="text-[10px] bg-white/10 text-gray-300 px-2 py-1 rounded uppercase tracking-wider font-semibold">
            2D / 3D
          </span>
          <span className="text-[10px] bg-[#F84464]/20 text-[#F84464] px-2 py-1 rounded uppercase tracking-wider font-semibold">
            Recommended
          </span>
        </div>

        <button
          onClick={() => onBookNow(movie.id)}
          className="w-full bg-[#F84464] hover:bg-[#e03a58] text-white text-sm font-bold py-2.5 rounded-lg transition-colors duration-200 shadow-lg shadow-[#F84464]/20 active:scale-95"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
