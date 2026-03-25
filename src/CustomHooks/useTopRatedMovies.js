import { useQuery } from "@tanstack/react-query";
import { getTopRatedMovies } from "../Services/movieService";

export function useTopRatedMovies({ page = 1 } = {}) {
  return useQuery({
    queryKey: ["topRatedMovies", page],
    queryFn: () => getTopRatedMovies({ page }),
  });
}
