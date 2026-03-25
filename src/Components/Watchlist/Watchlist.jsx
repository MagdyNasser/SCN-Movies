import { useDispatch, useSelector } from "react-redux";
import { selectWatchlistItems, removeFromWatchlist, clearWatchlist } from "../../store/watchlistSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const posterBase = "https://image.tmdb.org/t/p/w500";

export default function Watchlist() {
  const dispatch = useDispatch();
  const items = useSelector(selectWatchlistItems);

  const handleRemove = (movie) => {
    dispatch(removeFromWatchlist(movie.id));
    toast("Removed from Watchlist", { icon: "🗑️" });
  };

  const handleClear = () => {
    dispatch(clearWatchlist());
    toast("Watchlist cleared", { icon: "🗑️" });
  };

  return (
    <div className="min-h-screen bg-mainColor pt-24 px-6 md:px-16 pb-16">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-3xl font-bold">My Watchlist</h1>
          <p className="text-secondF text-sm mt-1">
            {items.length} {items.length === 1 ? "movie" : "movies"} saved
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-secondF hover:text-font1 hover:bg-white/5 transition text-sm"
          >
            <i className="bi bi-trash"></i>
            Clear All
          </button>
        )}
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <i className="bi bi-bookmark text-6xl text-secondF/30"></i>
          <h2 className="text-white text-xl font-semibold">Your watchlist is empty</h2>
          <p className="text-secondF text-sm text-center max-w-xs">
            Start adding movies you want to watch later and they'll show up here.
          </p>
          <Link
            to="/home"
            className="mt-2 px-6 py-2.5 rounded-lg bg-btn-gradient hover:bg-btn-gradient-hover text-white text-sm font-medium transition-all duration-300"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        // Movies Grid
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {items.map((movie) => (
            <div key={movie.id} className="relative group">
              <Link to={`/movie/${movie.id}`} className="block">
                <article className="w-full rounded-xl overflow-hidden bg-card border border-white/10 hover:border-white/20 transition">
                  <img
                    src={
                      movie.poster_path
                        ? `${posterBase}${movie.poster_path}`
                        : "https://via.placeholder.com/500x750?text=No+Poster"
                    }
                    alt={movie.title}
                    className="w-full aspect-[2/3] object-cover"
                    loading="lazy"
                  />
                  <div className="p-3">
                    <h3 className="text-font1 text-sm font-semibold truncate">{movie.title}</h3>
                    <p className="text-secondF text-xs mt-1">
                      {movie.release_date?.slice(0, 4) || "N/A"}
                      {movie.vote_average && (
                        <span className="ml-2">
                          <i className="bi bi-star-fill text-yellow-400 text-[10px]"></i>{" "}
                          {movie.vote_average.toFixed(1)}
                        </span>
                      )}
                    </p>
                  </div>
                </article>
              </Link>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(movie)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white/70 hover:text-white hover:bg-red-500/80 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                title="Remove from Watchlist"
              >
                <i className="bi bi-bookmark-x text-base"></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}