import tmdbClient from "./tmdbClient.js";

export const getTrendingMovies = async () => {
  const { data } = await tmdbClient.get("/trending/movie/day");
  return data;
};

{
  /* Popular Movies */
}
export const getPopularMovies = async ({ page = 1 } = {}) => {
  const { data } = await tmdbClient.get("/movie/popular", {
    params: { page },
  });
  return data;
};

{
  /* Top Rated */
}

export const getTopRatedMovies = async ({ page = 1 } = {}) => {
  const { data } = await tmdbClient.get("/movie/top_rated", {
    params: { page },
  });
  return data;
};

{
  /*Genres list*/
}

export const getMovieGenres = async () => {
  const { data } = await tmdbClient.get("/genre/movie/list");
  return data; // { genres: [{id, name}, ...] }
};

{
  /*  Discover by genre */
}

export const discoverMoviesByGenre = async ({ genreId, page = 1 } = {}) => {
  const { data } = await tmdbClient.get("/discover/movie", {
    params: {
      with_genres: genreId,
      page,
      sort_by: "popularity.desc",
      include_adult: false,
    },
  });
  return data; // { results, page, total_pages... }
};

{
  /* Now Playing */
}

export const getNowPlayingMovies = async ({ page = 1 } = {}) => {
  const { data } = await tmdbClient.get("/movie/now_playing", {
    params: { page },
  });
  return data;
};

{
  /* Upcoming */
}

export const getUpcomingMovies = async ({ page = 1 } = {}) => {
  const { data } = await tmdbClient.get("/movie/upcoming", {
    params: { page },
  });
  return data;
};

{
  /* discover Movies */
}
export const discoverMovies = async ({
  page = 1,
  genre,
  sortBy = "popularity.desc",
  year,
}) => {
  const { data } = await tmdbClient.get("/discover/movie", {
    params: {
      page,
      with_genres: genre,
      sort_by: sortBy,
      primary_release_year: year,
    },
  });

  return data;
};

{
  /*Search Movies */
}
export const searchMovies = async ({ query, page = 1 } = {}) => {
  if (!query?.trim()) {
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }

  const { data } = await tmdbClient.get("/search/movie", {
    params: {
      query,
      page,
      include_adult: false,
      language: "en-US",
    },
  });

  return data;
};
