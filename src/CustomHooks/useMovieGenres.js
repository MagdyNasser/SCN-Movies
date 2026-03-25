import { useQuery } from "@tanstack/react-query";
import { getMovieGenres } from "../services/movieService";

export function useMovieGenres() {
  return useQuery({
    queryKey: ["movieGenres"],
    queryFn: getMovieGenres,
    staleTime: 1000 * 60 * 60 * 24, 
  });
}
