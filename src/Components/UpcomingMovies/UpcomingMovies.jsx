import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import TrendingMovieCard from "../../Components/TrendingMoviesCard/TrendingMoviesCard";
import { useUpcomingMovies } from "../../CustomHooks/useUpcomingMovies";

export default function UpcomingMovies() {
  const { data, isLoading, isError } = useUpcomingMovies({ page: 1 });
  const movies = data?.results ?? [];

  if (isLoading) return <p className="text-white px-6 md:px-16">Loading...</p>;
  if (isError) return <p className="text-white px-6 md:px-16">Error...</p>;

  return (
    <section className="px-6 md:px-16 py-6">
      <h3 className="text-white text-xl font-bold mb-4">Upcoming Movies</h3>

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
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="!h-auto">
            <TrendingMovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
