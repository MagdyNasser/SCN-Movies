import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleWatchlist,
  selectIsInWatchlist,
} from "../../store/watchlistSlice";
import toast from "react-hot-toast";
import tmdbClient from "../../services/tmdbClient";
import Loader from "../Loader/Loader";

const backdropBase = "https://image.tmdb.org/t/p/original";
const posterBase = "https://image.tmdb.org/t/p/w500";

export default function MovieDetails() {
  const { id } = useParams();
  const [showTrailer, setShowTrailer] = useState(false);

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: async () => {
      const res = await tmdbClient.get(`/movie/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const dispatch = useDispatch();
  const isInWatchlist = useSelector(
    selectIsInWatchlist(id ? Number(id) : null),
  );

  const handleToggleWatchlist = () => {
    if (!movie) return;
    dispatch(toggleWatchlist(movie));
    if (isInWatchlist) {
      toast("Removed from Watchlist", { icon: "🗑️" });
    } else {
      toast.success("Added to Watchlist!", { icon: "🔖" });
    }
  };

  //  Videos (Trailer)
  const { data: videosData } = useQuery({
    queryKey: ["movieVideos", id],
    queryFn: async () => {
      const res = await tmdbClient.get(`/movie/${id}/videos`);
      return res.data;
    },
    enabled: !!id,
  });

  //
  const trailer =
    videosData?.results?.find(
      (v) => v.site === "YouTube" && v.type === "Trailer",
    ) ||
    videosData?.results?.find(
      (v) => v.site === "YouTube" && v.type === "Teaser",
    );

  if (isLoading) return <Loader text="Loading movie..." fullScreen />;
  if (isError)
    return (
      <p className="text-red-400 px-6 md:px-16 pt-28">Error loading movie.</p>
    );

  const title = movie?.title || "Untitled";
  const backdrop = movie?.backdrop_path
    ? `${backdropBase}${movie.backdrop_path}`
    : "";
  const poster = movie?.poster_path ? `${posterBase}${movie.poster_path}` : "";
  const year = movie?.release_date?.slice(0, 4) || "";
  const rating =
    typeof movie?.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : null;

  return (
    <section className="">
      {/* HERO */}
      <div className="relative w-full h-[70vh] min-h-[520px]">
        {backdrop && (
          <img
            src={backdrop}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        <div className="relative z-10 h-full px-6 md:px-16 flex items-end pb-10 gap-6">
          {/* Poster */}
          <div className="hidden md:block w-[220px] shrink-0">
            {poster && (
              <img
                src={poster}
                alt={title}
                className="w-full rounded-xl border border-white/10"
              />
            )}
          </div>

          {/* Text */}
          <div className="max-w-3xl">
            <h1 className="text-white text-3xl md:text-5xl font-bold">
              {title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-white/80 text-sm">
              {year && <span>{year}</span>}
              {rating && (
                <span className="inline-flex items-center gap-1">
                  <i className="bi bi-star-fill text-yellow-400"></i>
                  {rating}
                </span>
              )}
              {movie?.runtime && <span>{movie.runtime} min</span>}
            </div>

            <p className="mt-4 text-white/80 leading-6">
              {movie?.overview || "No overview available."}
            </p>

            {/* Genres */}
            <div className="mt-4 flex flex-wrap gap-2">
              {movie?.genres?.map((g) => (
                <span
                  key={g.id}
                  className="text-xs px-3 py-1 rounded-full bg-white/10 text-white"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/*  Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              {trailer ? (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="px-6 py-3 rounded-lg bg-btn-gradient hover:bg-btn-gradient-hover transition flex items-center gap-2 text-white font-semibold"
                >
                  <i className="bi bi-play-circle-fill"></i>
                  Watch Trailer
                </button>
              ) : (
                <button
                  disabled
                  className="px-6 py-3 rounded-lg bg-white/10 text-white/60 cursor-not-allowed flex items-center gap-2"
                  title="No trailer available"
                >
                  <i className="bi bi-play-circle"></i>
                  Trailer Unavailable
                </button>
              )}

              {/* Add Watchlist */}
              <button
                type="button"
                onClick={handleToggleWatchlist}
                className="px-6 py-3 rounded-lg border border-white/30 text-white bg-transparent hover:bg-white/10 transition flex items-center gap-2"
              >
                <i
                  className={`bi ${isInWatchlist ? "bi-bookmark-check-fill" : "bi-bookmark-plus"}`}
                ></i>
                {isInWatchlist ? "In Watchlist" : "Add Watchlist"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HERO DETAILS*/}
      <div className="px-6 md:px-16 py-10">
        <h2 className="text-white text-xl font-bold mb-4">Details</h2>
        <div className="text-white/80 text-sm space-y-2">
          {movie?.status && (
            <p>
              <span className="text-white">Status:</span> {movie.status}
            </p>
          )}
          {movie?.original_language && (
            <p>
              <span className="text-white">Language:</span>{" "}
              {movie.original_language}
            </p>
          )}
          {movie?.budget ? (
            <p>
              <span className="text-white">Budget:</span> $
              {movie.budget.toLocaleString()}
            </p>
          ) : null}
        </div>
      </div>

      {/*  Trailer */}
      {showTrailer && trailer && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white/90 hover:text-white text-2xl"
              aria-label="Close"
              title="Close"
            >
              ✕
            </button>

            <iframe
              className="w-full aspect-video rounded-xl border border-white/10"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
