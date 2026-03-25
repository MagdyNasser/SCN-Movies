import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWatchlist, selectIsInWatchlist } from "../../store/watchlistSlice";
import toast from "react-hot-toast";

const posterBase = "https://image.tmdb.org/t/p/w500";

export default function TrendingMoviesCard({ movie }) {
  const title = movie?.title || movie?.name || "Untitled";
  const poster = movie?.poster_path
    ? `${posterBase}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const dispatch = useDispatch();
  const isInWatchlist = useSelector(selectIsInWatchlist(movie.id));

  const handleToggle = (e) => {
    e.preventDefault();
    dispatch(toggleWatchlist(movie));

    if (isInWatchlist) {
      toast("Removed from Watchlist", { icon: "🗑️" });
    } else {
      toast.success("Added to Watchlist!", { icon: "🔖" });
    }
  };

  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <article className="relative w-full rounded-xl overflow-hidden bg-card border border-white/10 hover:border-white/20 transition">
        <img
          src={poster}
          alt={title}
          className="w-full aspect-[2/3] object-cover"
          loading="lazy"
        />

        {/* Watchlist Button */}
        <button
          onClick={handleToggle}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-sm transition-all ${isInWatchlist ? "text-white" : "bg-black/50 text-white hover:bg-black/70"}`}
          style={isInWatchlist ? { backgroundImage: "linear-gradient(90deg, #00905c 0%, #34d399 100%)" } : {}}
          title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        >
          <i className={`bi ${isInWatchlist ? "bi-bookmark-fill" : "bi-bookmark"} text-base`} />
        </button>

        <div className="p-3">
          <h3 className="text-white text-sm font-semibold truncate">{title}</h3>
        </div>
      </article>
    </Link>
  );
}
