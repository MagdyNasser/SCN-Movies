import Landing from "../../assets/Landing.png";
import CompanySlider from "../CompanySlider/CompanySlider";
import GenresDiscover from "../GenresDiscover/GenresDiscover";
import NowPlayingMovies from "../NowPlayingMovies/NowPlayingMovies";
import PopularMovies from "../PopularMovies/PopularMovies";
import TopRatedMovies from "../TopRatedMovies/TopRatedMovies";
import TrendingMovies from "../TrendingMovies/TrendingMovies";
import UpcomingMovies from "./../UpcomingMovies/UpcomingMovies";
import TrendingMoviesCard from "../TrendingMoviesCard/TrendingMoviesCard";
import CTASection from "./../CTASection/CTASection";
import Ourplans from "../OurPlans/OurPlans";
import Footer from "./../Footer/Footer";
import HeroShowcase from "../HeroShowCase/HeroShowCase";

export default function Home() {
  return (
    <>
      {/* <section className="w-full h-screen relative">
        <img
          src={Landing}
          alt="landing page"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 h-full flex items-center pt-5">
          <div className="w-full md:w-1/2 px-6 md:px-16 text-white">
            <h3 className="text-2xl md:text-6xl font-bold mb-4">
              Avatar: Fire and Ash
            </h3>

            <p className="text-sm md:text-md mb-5 text-secondF">
              3h 17m | 2026 | Epic
            </p>

            <p className="text-sm md:text-md mb-6 text-gray-200">
              Jake and Neytiri's family grapples with grief, encountering a new,
              aggressive Na'vi tribe, the Ash People, who are led by the fiery
              Varang, as the conflict on Pandora escalates and a new moral focus
              emerges.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button className="px-8 py-3 rounded-lg bg-btn-gradient hover:bg-btn-gradient-hover flex items-center gap-2  transition-colors duration-600 ease-in-out w-full sm:w-auto justify-center">
                <i className="bi bi-play-circle-fill"></i>
                Play Now
              </button>

              <button className="px-8 py-3 rounded-lg bg-gray-500/30 flex items-center gap-2 hover:bg-gray-500/50 transition-colors w-full sm:w-auto justify-center">
                <i className="bi bi-play-circle-fill"></i>
                Watch Trailer
              </button>

              <button className="px-8 py-3 rounded-lg border border-gray-50 flex items-center gap-2 hover:bg-gray-500/50 transition-colors w-full sm:w-auto justify-center">
                <i className="bi bi-bookmark"></i>
                Add Watchlist
              </button>
            </div>
          </div>
        </div>
      </section> */}

      <section className="w-full relative">
        <HeroShowcase />
      </section>

      <div className="w-full mt-2 py-10">
        <CompanySlider />
      </div>

      <div className="w-full mt-2">
        <TrendingMovies />
      </div>

      <div className="w-full mt-2">
        <GenresDiscover />
      </div>

      <div className="w-full py-7">
        <Ourplans />
      </div>

      <div className="w-full mt-2 mb-10">
        <CTASection />
      </div>
    </>
  );
}
