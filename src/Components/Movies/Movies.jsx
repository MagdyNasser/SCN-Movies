import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import tmdbClient from "../../services/tmdbClient";
import MoviesGrid from "./MoviesGrid";
import Loader from "../Loader/Loader";

export default function Movies() {
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);

  // أول ما تغيّر category رجع page = 1
  useEffect(() => {
    setPage(1);
  }, [category]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", category, page],
    queryFn: async () => {
      const res = await tmdbClient.get(`/movie/${category}`, {
        params: { page }, // هنا التغيير
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 1;


  const safeTotal = Math.min(totalPages, 500); // TMDB max 500
  const start = Math.max(1, page - 3);
  const end = Math.min(safeTotal, start + 6);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <section className="px-6 md:px-16 py-10 pt-28">
      <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">Movies</h2>

      {/* Tabs */}
      <div className="flex gap-3 mb-6 overflow-x-auto">
        {["popular", "top_rated", "now_playing", "upcoming"].map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`px-4 py-2 rounded-full text-sm capitalize transition ${
              category === item
                ? "bg-btn-gradient text-white"
                : "bg-card text-secondF hover:text-white"
            }`}
          >
            {item.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* States */}
      {isLoading && <Loader text="Loading Discover movies..." />}
      {isError && <p className="text-red-400">Failed to load movies.</p>}

      {!isLoading && !isError && (
        <>
          <MoviesGrid movies={movies} />

          {/* Pagination Bar */}
          {safeTotal > 1 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {/* Prev */}
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-2 rounded-lg border border-white/10 text-white/80 hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <i className="bi bi-chevron-left"></i>
              </button>

              {/* Left dots */}
              {start > 1 && (
                <>
                  <button
                    onClick={() => setPage(1)}
                    className="px-3 py-2 rounded-lg border border-white/10 text-white/80 hover:bg-white/5 transition"
                  >
                    1
                  </button>
                  <span className="text-white/40 px-1">...</span>
                </>
              )}

              {/* Numbers */}
              {pages.map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-2 rounded-lg border transition ${
                    p === page
                      ? "bg-btn-gradient text-white border-transparent"
                      : "border-white/10 text-white/80 hover:bg-white/5"
                  }`}
                >
                  {p}
                </button>
              ))}

              {/* Right dots */}
              {end < safeTotal && (
                <>
                  <span className="text-white/40 px-1">...</span>
                  <button
                    onClick={() => setPage(safeTotal)}
                    className="px-3 py-2 rounded-lg border border-white/10 text-white/80 hover:bg-white/5 transition"
                  >
                    {safeTotal}
                  </button>
                </>
              )}

              {/* Next */}
              <button
                onClick={() => setPage((p) => Math.min(safeTotal, p + 1))}
                disabled={page === safeTotal}
                className="px-3 py-2 rounded-lg border border-white/10 text-white/80 hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
