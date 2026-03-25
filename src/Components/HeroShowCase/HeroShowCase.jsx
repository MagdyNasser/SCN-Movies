import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import tmdbClient from "../../services/tmdbClient";
import Loader from "../Loader/Loader";

export default function HeroShowcase() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["heroTrendingMovies"],
    queryFn: async () => {
      const res = await tmdbClient.get("/trending/movie/day");
      return res.data.results.slice(0, 10);
    },
  });

  const movies = data || [];

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-mainColor/50 to-black"></div>

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-buttn/10 blur-[180px] rounded-full"></div>

      <div className="relative z-10 px-6 md:px-16 pt-28 md:pt-32 pb-10">
        {/* Text */}
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-buttn text-sm md:text-base font-medium mb-4 uppercase tracking-[0.2em]">
            Trending Now
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Discover the Ultimate
            <span className="block text-buttn">Movie Experience</span>
            with SCN
          </h1>

          <p className="text-secondF text-sm md:text-lg leading-7 max-w-2xl mx-auto mb-8">
            Explore trending movies, discover new favorites, and enjoy a modern
            cinematic experience designed for movie lovers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button className="px-8 py-3 rounded-xl bg-btn-gradient hover:bg-btn-gradient-hover text-white font-semibold transition w-full sm:w-auto">
              Get Started
            </button>

            <button className="px-8 py-3 rounded-xl border border-white/15 hover:bg-white/5 text-white font-semibold transition w-full sm:w-auto">
              Explore Movies
            </button>
          </div>
        </div>

        {/* Showcase - Integrated seamlessly into Hero */}
        <div className="w-full mt-4 md:mt-8">
          {isLoading && <Loader text="Loading trending movies..." />}

          {isError && (
            <p className="text-center text-red-400 py-10">
              Failed to load trending movies.
            </p>
          )}

          {!isLoading && !isError && (
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={2}
              breakpoints={{
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 5 },
              }}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2,
                slideShadows: true,
              }}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              modules={[EffectCoverflow, Autoplay]}
              className="w-full pt-4 pb-8"
            >
              {movies.map((movie) => {
                const poster = movie?.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Poster";

                return (
                  <SwiperSlide key={movie.id}>
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 transition h-[250px] md:h-[360px]">
                      <img
                        src={poster}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
}