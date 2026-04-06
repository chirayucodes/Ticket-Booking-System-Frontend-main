import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../services";

export function useMoviesQuery() {
  return useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      return await ApiService.get<Master.Movie[]>("movies");
    },
  });
}
