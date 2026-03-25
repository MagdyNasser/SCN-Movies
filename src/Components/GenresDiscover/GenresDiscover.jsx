import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import TrendingMoviesCard from "../TrendingMoviesCard/TrendingMoviesCard";
import { useMovieGenres } from "../../CustomHooks/useMovieGenres";
import { useDiscoverMovies } from "../../CustomHooks/useDiscoverMovies";

export default function GenresDiscover() {
  const { data: genresData, isLoading: genresLoading, isError: genresError } =
    useMovieGenres();

  const genres = genresData?.genres ?? [];
  const [activeGenreId, setActiveGenreId] = useState(null);

  useEffect(() => {
    if (!activeGenreId && genres.length) setActiveGenreId(genres[0].id);
  }, [genres, activeGenreId]);

  const {
    data: discoverData,
    isLoading: discoverLoading,
    isError: discoverError,
  } = useDiscoverMovies({ genreId: activeGenreId, page: 1 });

  const movies = discoverData?.results ?? [];
  const activeGenreName = genres.find((g) => g.id === activeGenreId)?.name ?? "";

  if (genresLoading) return <p className="text-white px-6 md:px-16">Loading genres...</p>;
  if (genresError) return <p className="text-white px-6 md:px-16">Failed to load genres.</p>;

  return (
    <section className="px-6 md:px-16 py-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-xl font-bold">
          Discover {activeGenreName ? `• ${activeGenreName}` : ""}
        </h3>
      </div>

      {/* Genre Chips */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3 mb-4">
        {genres.map((g) => {
          const active = g.id === activeGenreId;
          return (
            <button
              key={g.id}
              onClick={() => setActiveGenreId(g.id)}
              className={[
                "shrink-0 px-4 py-2 rounded-full text-sm transition border",
                active
                  ? "bg-buttn text-white border-buttn"
                  : "bg-transparent text-navFontC border-white/10 hover:border-white/20 hover:text-white",
              ].join(" ")}
            >
              {g.name}
            </button>
          );
        })}
      </div>

      {/* Discover Slider */}
      {discoverError && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-200">
          Error for Loading a Film...
        </div>
      )}

      {!discoverError && (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={14}
          slidesPerView={2.2}
          breakpoints={{
            480: { slidesPerView: 2.6 },
            640: { slidesPerView: 3.2 },
            768: { slidesPerView: 4.2 },
            1024: { slidesPerView: 5.2 },
            1280: { slidesPerView: 6.2 },
          }}
          className="!pb-10"
        >
          {(discoverLoading ? Array.from({ length: 10 }) : movies).map((movie, i) => (
            <SwiperSlide key={movie?.id ?? i} className="!h-auto">
              {discoverLoading ? (
                <div className="w-[180px] rounded-xl overflow-hidden bg-card animate-pulse">
                  <div className="aspect-[2/3] bg-white/10" />
                  <div className="p-2">
                    <div className="h-3 w-3/4 bg-white/10 rounded" />
                  </div>
                </div>
              ) : (
                <TrendingMoviesCard movie={movie} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
