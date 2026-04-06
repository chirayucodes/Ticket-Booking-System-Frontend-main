import { MovieCard } from "@shared/components/MovieCard";
// import { MovieCard } from "../../../shared/components/MovieCard";
import { useMoviesQuery } from "../queries";

// Match the structure from your query/API
interface Movie {
  id: string | number;
  movieName: string;
}

export default function Home() {
  const { data: movies = [], isLoading } = useMoviesQuery();

  const handleBooking = (id: string | number) => {
    console.log(`Navigating to booking for movie ID: ${id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <h2 className="text-[#F84464] text-2xl font-bold animate-pulse">
          Loading movies...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6 md:p-10 relative overflow-hidden">
      {/* Background Glows to match Auth pages */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#F84464] rounded-full blur-[150px] opacity-10"></div>

      <header className="relative z-10 mb-10 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Recommended <span className="text-[#F84464]">Movies</span>
        </h1>
        <div className="text-sm text-gray-400 font-medium">
          Showing {movies.length} movies
        </div>
      </header>

      {/* Movie Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} onBookNow={handleBooking} />
        ))}
      </div>

      {movies.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500">No movies available at the moment.</p>
        </div>
      )}
    </div>
  );
}
