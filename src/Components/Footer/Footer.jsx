import { NavLink } from "react-router-dom";
import logo from "../../assets/SCN LOGO.png"
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-mainColor">
      <div className="px-6 md:px-16 py-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Col 1: Brand / About */}
          <div>
            <img
              src={logo}
              alt="SCN Logo"
              className="h-16 md:h-20 w-auto object-contain"
            />
            <p className="text-secondF mt-3 text-sm leading-6 max-w-sm">
              More Than a Screen.
            </p>

            {/* Social icons / badges */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.facebook.com/share/1DetBQwjMN/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/5 transition"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>

              <a
                href="https://www.instagram.com/magdy_nasser11?igsh=bnJrdGZkaTZ3YmZh"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/5 transition"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>

              <a
                href="https://github.com/MagdyNasser"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/5 transition"
                aria-label="GitHub"
              >
                <i className="bi bi-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/magdy-nasser-b0b17b345r"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/5 transition"
                aria-label="linkedin"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Col 2: Links */}
          <div>
            <h5 className="text-white font-semibold mb-4">Quick Links</h5>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <NavLink to="/trending" className="text-white hover:text-white transition">
                Trending
              </NavLink>
              <NavLink to="/movies" className="text-secondF hover:text-white transition">
                Popular
              </NavLink>
              <NavLink to="/movies" className="text-secondF hover:text-white transition">
                Top Rated
              </NavLink>
              <NavLink to="/movies" className="text-secondF hover:text-white transition">
                Upcoming
              </NavLink>
              <NavLink to="/discover" className="text-secondF hover:text-white transition">
                Genres
              </NavLink>
              <NavLink to="/search" className="text-secondF hover:text-white transition">
                Search
              </NavLink>
              <NavLink to="/watchlist" className="text-secondF hover:text-white transition">
                Watchlist
              </NavLink>
              <NavLink to="/" className="text-secondF hover:text-white transition">
                Contact
              </NavLink>
            </div>
          </div>

          {/* CTA / Newsletter / App */}
          <div>
            <h5 className="text-white font-semibold mb-4">Stay Updated</h5>
            <p className="text-secondF text-sm leading-6">
              Get updates about new releases and trending titles. k
            </p>

            <div className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-card border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
              />
              <button className="px-5 py-2 rounded-lg bg-btn-gradient hover:bg-btn-gradient-hover text-white text-sm font-semibold transition">
                Subscribe
              </button>
            </div>

            {/* Small note */}
            <p className="text-xs text-secondF mt-3">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-sm text-secondF">
          <p>© {year} SCN — Built by Magdy Nasser Ahmed</p>

          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
            <a href="#" className="hover:text-white transition">
              TMDB Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
