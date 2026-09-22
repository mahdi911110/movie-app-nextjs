export type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  genres: Genres[];
  tagline: string;
  status: string;
  runtime: number;
  revenue: number;
  original_country: string[];
  imdb_id: string;
  budget: number;
  homepage: string;
  production_companies: Companies[];
  production_countries: Countries[];
  spoken_languages: Languages[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  softcore: boolean;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type Companies = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

type Countries = {
  iso_3166_1: string
  name: string;
};

type Languages = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

type Genres = {
  id: number;
  name: string;
};

export type MoviesResponse = {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
};

export type QueryArray = [
  string | undefined,
  number,
  string | undefined,
];

export type SignupType = {
  username: string;
  email: string;
  password: string;
}

export type PrevStateButtons = {
  success: boolean;
} | null;