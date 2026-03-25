import { useQuery } from "@tanstack/react-query";
import { getNowPlayingMovies } from "../Services/movieService";

export function useNowPlayingMovies({ page = 1 } = {}) {
  return useQuery({
    queryKey: ["nowPlayingMovies", page],
    queryFn: () => getNowPlayingMovies({ page }),
  });
}
