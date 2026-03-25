import { useState } from "react";
import { useDiscoverPageMovies } from "../../CustomHooks/useDiscoverPageMovies";
import MoviesGrid from "../Movies/MoviesGrid";
import { useMovieGenres } from "../../CustomHooks/useMovieGenres";
import Loader from "../Loader/Loader";

export default function Discover() {
  // states
  const [genreId, setGenreId] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [page, setPage] = useState(1);

  // movies
  const { data, isLoading, isError } = useDiscoverPageMovies({
    page,
    sortBy,
    genreId: genreId || undefined,
  });

  // genres
  const { data: genresData, isLoading: genresLoading } = useMovieGenres();

  const movies = data?.results ?? [];
  const totalPages = Math.min(data?.total_pages ?? 1, 500);
  const genres = genresData?.genres ?? [];

  return (
    <section className="px-6 md:px-16 py-10 pt-28">
      <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">
        Discover
      </h2>

      {/*  FILTER BAR  */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* GENRE */}
        <select
          value={genreId}
          onChange={(e) => {
            setGenreId(e.target.value);
            setPage(1);
          }}
          className="bg-card text-white/90 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-white/20"
        >
          <option value="">
            {genresLoading ? "Loading..." : "All Genres"}
          </option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        {/* SORT */}
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPage(1);
          }}
          className="bg-card text-white/90 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-white/20"
        >
          <option value="popularity.desc">Most Popular</option>
          <option value="vote_average.desc">Top Rated</option>
          <option value="release_date.desc">Newest</option>
          <option value="revenue.desc">Highest Revenue</option>
        </select>
      </div>

      {/* ===== STATES ===== */}
      {isLoading && <Loader text="Loading Discover movies..." />}
      {isError && (
        <p className="text-red-400">Failed to load movies.</p>
      )}

      {!isLoading && !isError && (
        <>
          {/* ===== GRID ===== */}
          <MoviesGrid movies={movies} />

          {/* ===== PAGINATION ===== */}
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
