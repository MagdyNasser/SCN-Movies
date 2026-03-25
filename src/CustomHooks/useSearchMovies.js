import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../services/movieService";

export function useSearchMovies({ query, page = 1 }) {

  const trimmedQuery = query?.trim() || "";

  return useQuery({

    queryKey: ["search-movies", trimmedQuery, page],

    queryFn: () => searchMovies({ query: trimmedQuery, page }),

    enabled: trimmedQuery.length > 0,

    keepPreviousData: true,

    staleTime: 60 * 1000,

    retry: 1,
  });
}