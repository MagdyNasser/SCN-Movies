import { useState, useEffect } from "react";
import { useSearchMovies } from "../../CustomHooks/useSearchMovies";
import MovieCard from "../MovieCard/MovieCard";
import Loader from "../Loader/Loader";

export default function Search() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const { data, isLoading, isError } = useSearchMovies({
    query: debouncedQuery,
    page,
  });

  const movies = data?.results || [];
  const totalPages = Math.min(data?.total_pages || 1, 500);
  const hasText = query.trim().length > 0;

  return (
    <section className="min-h-screen bg-mainColor text-white px-6 md:px-16 pt-28 pb-10">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">Search</h2>
        <p className="text-secondF text-sm mt-2">
          Find movies by title — powered by TMDB
        </p>
      </div>

      {/* Search Input (ICON INSIDE INPUT GROUP) */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center w-full rounded-xl bg-card border border-white/10 overflow-hidden focus-within:border-white/20 focus-within:ring-2 focus-within:ring-buttn/30 transition">
          {/* input */}
          <input
            type="text"
            placeholder="Search for movies..."
            className="flex-1 bg-transparent px-4 py-3 outline-none text-white placeholder:text-white/40"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* icon area (INSIDE SAME BOX) */}
          <button
            type="button"
            onClick={() => hasText && setQuery("")}
            className="h-full px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 transition"
            aria-label={hasText ? "clear" : "search"}
          >
            <i className={`bi ${hasText ? "bi-x-lg" : "bi-search"}`} />
          </button>
        </div>
      </div>

      {/* Empty */}
      {debouncedQuery === "" && (
        <p className="text-center text-secondF mt-10">
          Start typing to search for movies 🍿
        </p>
      )}

      {/* Loading */}
      {isLoading && <Loader text="Searching movies..." />}

      {/* Error */}
      {isError && (
        <p className="text-center text-red-400 mt-10">
          Something went wrong 😢
        </p>
      )}

      {/* Results */}
      {!isLoading && !isError && movies.length > 0 && (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-5 py-2 rounded-lg border border-white/10 text-white/90 hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <i className="bi bi-chevron-left me-2" />
              Prev
            </button>

            <span className="text-white/80 text-sm">
              Page <span className="text-white font-semibold">{page}</span> of{" "}
              <span className="text-white font-semibold">{totalPages}</span>
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-5 py-2 rounded-lg bg-btn-gradient hover:bg-btn-gradient-hover text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next
              <i className="bi bi-chevron-right ms-2" />
            </button>
          </div>
        </>
      )}

      {/* No Results */}
      {!isLoading && debouncedQuery !== "" && movies.length === 0 && (
        <p className="text-center text-secondF mt-10">No results found</p>
      )}
    </section>
  );
}