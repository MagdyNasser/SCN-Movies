import { useQuery } from "@tanstack/react-query";
import tmdbClient from "../Services/tmdbClient";

export function useTrendingPageMovies({ page = 1, timeWindow = "day" }) {
  return useQuery({
    queryKey: ["trendingPage", page, timeWindow],
    queryFn: async () => {
      const res = await tmdbClient.get(`/trending/movie/${timeWindow}`, {
        params: { page },
      });
      return res.data;
    },
  });
}
