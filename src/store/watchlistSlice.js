import { createSlice } from "@reduxjs/toolkit";

const pickMovie = (movie) => ({
  id: movie.id,
  title: movie.title,
  poster_path: movie.poster_path,
  vote_average: movie.vote_average,
  release_date: movie.release_date,
});

const initialState = {
  items: [],
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    toggleWatchlist: (state, action) => {
      const movie = pickMovie(action.payload);
      const index = state.items.findIndex((m) => m.id === movie.id);

      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(movie);
      }
    },

    removeFromWatchlist: (state, action) => {
      const movieId = action.payload;
      state.items = state.items.filter((m) => m.id !== movieId);
    },

    clearWatchlist: (state) => {
      state.items = [];
    },
  },
});

export const { toggleWatchlist, removeFromWatchlist, clearWatchlist } =
  watchlistSlice.actions;

export default watchlistSlice.reducer;

export const selectWatchlistItems = (state) => state.watchlist.items;

export const selectIsInWatchlist = (movieId) => (state) =>
  state.watchlist.items.some((m) => m.id === movieId);