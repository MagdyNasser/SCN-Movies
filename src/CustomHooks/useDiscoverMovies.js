import { useQuery } from "@tanstack/react-query";
import { discoverMoviesByGenre } from "../Services/movieService";

export function useDiscoverMovies({ genreId, page = 1 } = {}) {
  return useQuery({
    queryKey: ["discoverMovies", genreId, page],
    queryFn: () => discoverMoviesByGenre({ genreId, page }),
    enabled: !!genreId, 
  });
}
