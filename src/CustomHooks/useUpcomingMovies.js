import { useQuery } from "@tanstack/react-query";
import { getUpcomingMovies } from "../Services/movieService";

export function useUpcomingMovies({ page = 1 } = {}) {
  return useQuery({
    queryKey: ["upcomingMovies", page],
    queryFn: () => getUpcomingMovies({ page }),
  });
}
