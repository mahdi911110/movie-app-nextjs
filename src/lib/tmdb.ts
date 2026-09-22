export async function getPopularMovies(page = 1, lang = "en-US") {
  const url = new URL(
    "https://api.themoviedb.org/3/movie/popular"
  );

  url.searchParams.set("language", lang);
  url.searchParams.set("page", String(page));

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json();
}

export async function getUpcomingMovies(page = 1, lang = "en-US") {
  const url = new URL(
    "https://api.themoviedb.org/3/movie/upcoming"
  );

  url.searchParams.set("language", lang);
  url.searchParams.set("page", String(page));

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json();
}
export async function getTopRatedMovies(page = 1, lang = "en-US") {
  const url = new URL(
    "https://api.themoviedb.org/3/movie/top_rated"
  );

  url.searchParams.set("language", lang);
  url.searchParams.set("page", String(page));

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json();
}
export async function getTrendingMovies(lang = "en-US") {
  const url = new URL(
    "https://api.themoviedb.org/3/trending/movie/week"
  );

  url.searchParams.set("language", lang);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json();
}
export async function getNowPlayingMovies(page = 1, lang = "en-US") {
  const url = new URL(
    "https://api.themoviedb.org/3/movie/now_playing"
  );

  url.searchParams.set("language", lang);
  url.searchParams.set("page", String(page));

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json();
}
export async function getDiscoverMovies(page = 1, lang = "en-US", genre: string) {
  const genres = {
    action: 28,
    adventure: 12,
    animation: 16,
    comedy: 35,
    crime: 80,
    documentary: 99,
    drama: 18,
    family: 10751,
    fantasy :14,
    history :36,
    horror  :27,
    music: 10402,
    mystery: 9648,
    romance: 10749,
    science_fiction: 878,
    tv_movie: 10770,
    thriller: 53,
    war: 10752,
    western: 37,
  }
  const genreId = genres[genre as keyof typeof genres]
  const url = new URL(
    "https://api.themoviedb.org/3/discover/movie"
  );

  url.searchParams.set("with_genres", String(genreId));
  url.searchParams.set("language", lang);
  url.searchParams.set("page", String(page));

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json();
}
export async function getMovieDetail(id: number, lang = "en-US") {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/${id}`
  );

  url.searchParams.set("language", lang);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json();
}
export async function getSearchMovies(page: number = 1, query: string, lang = "en-US") {
  const url = new URL(
    `https://api.themoviedb.org/3/search/movie`
  );

  url.searchParams.set("query", query);
  url.searchParams.set("language", lang);
  url.searchParams.set("page", String(page));

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json();
}