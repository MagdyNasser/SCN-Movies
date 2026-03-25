
import { NavLink } from 'react-router-dom';
export default function CTASection() {
  return <>
    <section className="px-6 md:px-16 py-10">
      <div className="relative overflow-hidden rounded-2xl bg-card border border-white/10">
        {/* Decorative gradient */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_left,#34d399_0%,transparent_45%),radial-gradient(circle_at_bottom_right,#00905c_0%,transparent_40%)]" />
        <div className="relative p-6 md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-white text-2xl md:text-3xl font-bold">
                Ready to start watching?
              </h3>
              <p className="text-secondF mt-2 max-w-2xl">
                Explore trending, popular, top rated, and upcoming movies — all in one place.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <NavLink to="getstarted" className="px-6 py-3 rounded-lg bg-btn-gradient hover:bg-btn-gradient-hover text-white font-semibold flex items-center justify-center gap-2 transition">
                <i className="bi bi-play-circle-fill"></i>
                Get Started
              </NavLink>

              <button className="px-6 py-3 rounded-lg border border-white/15 text-white/90 hover:bg-white/5 font-semibold flex items-center justify-center gap-2 transition">
                <i className="bi bi-search"></i>
                Search Movies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}
