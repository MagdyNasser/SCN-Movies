import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../services/movieService";

export function usePopularMovies({ page = 1 } = {}) {
  return useQuery({
    queryKey: ["popularMovies", page],
    queryFn: () => getPopularMovies({ page }),
  });
}
