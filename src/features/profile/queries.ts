import { useQuery } from "@tanstack/react-query";
import { ApiService } from "services";

export const useUserBookingHistoryQuery = (userId: number | undefined) => {
  return useQuery({
    queryKey: ["user-bookings", userId],
    queryFn: async () => {
      return await ApiService.get<Master.Booking[]>(`bookings/user/${userId}`);
    },
    enabled: !!userId,
  });
};
