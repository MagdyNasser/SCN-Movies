import { useQuery } from "@tanstack/react-query";
import { getNowPlayingMovies } from "../services/movieService";

export function useNowPlayingMovies({ page = 1 } = {}) {
  return useQuery({
    queryKey: ["nowPlayingMovies", page],
    queryFn: () => getNowPlayingMovies({ page }),
  });
}
