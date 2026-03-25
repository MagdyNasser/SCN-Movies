import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectWatchlistItems } from "../../store/watchlistSlice";
import logo from "../../assets/SCN LOGO.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const watchlistCount = useSelector(selectWatchlistItems).length;

  return (
    <>
      <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-12 w-auto" alt="SCN Logo" />
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 md:order-2 rtl:space-x-reverse">
            {/* Search */}
            <NavLink to="/search" className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition">
              <i className="bi bi-search text-white text-lg"></i>
            </NavLink>

            {/* Watchlist */}
            <div className="relative hidden md:block">
              <NavLink
                to="/watchlist"
                className="w-10 h-10 flex items-center justify-center rounded-full text-navFontC hover:text-white hover:bg-white/10 transition"
                aria-label="Watchlist"
              >
                <i className="bi bi-bookmark text-lg"></i>
              </NavLink>

              {/* Counter Badge */}
              {watchlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-btn-gradient text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 pointer-events-none">
                  {watchlistCount > 99 ? "99+" : watchlistCount}
                </span>
              )}
            </div>

            {/* Get started */}
            <NavLink
              to="/getstarted"
              className="text-white bg-btn-gradient hover:bg-btn-gradient-hover shadow-lg shadow-green-900/30 font-semibold rounded-full text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 focus:outline-none transition-all duration-300"
            >
              Get started
            </NavLink>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-navFontC inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-white/10 focus:outline-none transition"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth={2}
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            </button>
          </div>

          {/* Links */}
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? "block" : "hidden"}`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-default rounded-base bg-neutral-secondary-soft md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-neutral-primary">
              <li>
                <NavLink
                  to="home"
                  onClick={() => setIsOpen(false)}
                  className="block px-8 py-2 text-navFontC rounded-sm md:text-fg-brand md:p-0"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="movies"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 text-navFontC text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                >
                  Movies
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="discover"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 text-navFontC text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                >
                  Discover
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="trending"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 text-navFontC text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                >
                  Trending
                </NavLink>
              </li>
              {/* Added Search and Watchlist to mobile menu since they are hidden in the navbar */}
              <li className="md:hidden mt-2 pt-2 border-t border-default">
                <NavLink
                  to="search"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 py-2 px-3 text-navFontC rounded hover:bg-neutral-tertiary transition-colors"
                >
                  <i className="bi bi-search"></i> Search
                </NavLink>
              </li>
              <li className="md:hidden">
                <NavLink
                  to="watchlist"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 py-2 px-3 text-navFontC rounded hover:bg-neutral-tertiary transition-colors"
                >
                  <i className="bi bi-bookmark"></i> Watchlist
                  {watchlistCount > 0 && (
                    <span className="ml-auto bg-btn-gradient text-[10px] font-bold min-w-[18px] h-[18px] rounded-full text-white flex items-center justify-center px-1">
                      {watchlistCount > 99 ? "99+" : watchlistCount}
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}