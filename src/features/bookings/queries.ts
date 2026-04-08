import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiService } from "services";

export interface Show {
  id: number;
  movieId: number;
  showTime: string;
  totalSeats: number;
  availableSeats: number;
  isActive: boolean;
}


export const useMovieShowsQuery = (movieId: number, date: string) => {
  return useQuery({
    queryKey: ["movie-shows", movieId, date],
    queryFn: async () => {
      return await ApiService.get<Show[]>(`shows/${movieId}/${date}`);
    },
    enabled: !!movieId && !!date,
  });
};


export const useShowDetailsQuery = (movieId: number) => {
  return useQuery({
    queryKey: ["show-details", movieId],
    queryFn: async () => {
      return await ApiService.get<Show>(`shows/${movieId}`);
    },
    enabled: !!movieId,
  });
};

export const useCreateBookingMutation = () => {
  return useMutation({
    mutationFn: async (bookingData: {
      userId: number;
      showId: number;
      seatsBooked: number;
    }) => {
      return await ApiService.post("bookings", bookingData);
    },
  });
};
