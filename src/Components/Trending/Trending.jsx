import { useState } from "react";
import MoviesGrid from "../Movies/MoviesGrid";
import { useTrendingPageMovies } from "../../CustomHooks/useTrendingPageMovies";
import Loader from "../Loader/Loader";

export default function Trending() {
  const [timeWindow, setTimeWindow] = useState("day");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useTrendingPageMovies({
    page,
    timeWindow,
  });

  const movies = data?.results ?? [];
  const totalPages = Math.min(data?.total_pages ?? 1, 500);

  return (
    <section className="px-6 md:px-16 py-10 pt-28">
      <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">
        Trending Movies
      </h2>

      {/* Toggle Day / Week  */}
      <div className="flex gap-3 mb-6">
        {["day", "week"].map((t) => (
          <button
            key={t}
            onClick={() => {
              setTimeWindow(t);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-full text-sm capitalize transition ${
              timeWindow === t
                ? "bg-btn-gradient text-white"
                : "bg-card text-secondF hover:text-white"
            }`}
          >
            {t === "day" ? "Today" : "This Week"}
          </button>
        ))}
      </div>

      {/* STATES*/}
      {isLoading && <Loader text="Loading trending movies..." />}
      {isError && (
        <p className="text-red-400">Failed to load movies.</p>
      )}

      {!isLoading && !isError && (
        <>
          {/* GRID */}
          <MoviesGrid movies={movies} />

          {/*  PAGINATION  */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-white/10 text-white/80 hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Prev
            </button>

            <span className="text-white/80 text-sm">
              Page{" "}
              <span className="text-white font-semibold">{page}</span> /{" "}
              {totalPages}
            </span>

            <button
              onClick={() =>
                setPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg border border-white/10 text-white/80 hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}
