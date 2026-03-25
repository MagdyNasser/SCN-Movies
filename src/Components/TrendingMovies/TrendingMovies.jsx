import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { useTrendingMovies } from "../../CustomHooks/useTrendingMovies";
import TrendingMoviesCard from "../TrendingMoviesCard/TrendingMoviesCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Loader from "../Loader/Loader";


export default function TrendingMovies() {
  const { data, isLoading, isError } = useTrendingMovies();

  const movies = data?.results ?? [];

  if (isLoading) return isLoading && <Loader text="Loading trending movies..." />;
  if (isError) return <p className="text-white">Error...</p>;

  return (
    <>
      <section className="px-6 md:px-16 py-6">
        <h3 className="text-white text-xl font-bold mb-4">Trending Movies</h3>
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
            <TrendingMoviesCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
      </section>
    </>
  );
}
