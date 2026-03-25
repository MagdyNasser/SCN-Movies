import { useQuery } from "@tanstack/react-query";
import { discoverMovies } from "../services/movieService";

export function useDiscoverPageMovies(filters) {
  return useQuery({
    queryKey: ["discoverPageMovies", filters],
    queryFn: () => discoverMovies(filters),
    keepPreviousData: true,
  });
}
