import {
  getUpcomingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getNowPlayingMovies,
  getDiscoverMovies,
  getSearchMovies,
  getMovieDetail,
} from "@/lib/tmdb";

import { getUserSession } from "@/lib/auth";
import { getWatchlistItems } from "@/lib/moviedb";

import "@/lib/proxyAgent";

import type { QueryArray } from "@/types/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ query: QueryArray, lang: 'fa' | 'en' }> }
) {
  const { query, lang } = await params;

  const newLang = lang === 'fa' ? 'fa-IR' : 'en-US';

  const category = query[0];
  const page = Number(query[1] ?? 1);
  const value = query[2];

  if (!Number.isInteger(page) || page < 1) {
    return Response.json(
      { message: "Invalid page" },
      { status: 400 }
    );
  }

  try {
    let movies;

    if (!category) {
      const user = await getUserSession();

      if (!user) {
        return Response.json(
          { message: "Unauthorized" },
          { status: 401 }
        );
      }

      const watchlistItems = getWatchlistItems(user.id);

      movies = await Promise.all(
        watchlistItems.map(({ movie_id }) =>
          getMovieDetail(movie_id, lang)
        )
      );
    } else {
      switch (category) {
        case "search":
          if (!value) {
            return Response.json(
              { message: "Search query is required" },
              { status: 400 }
            );
          }

          movies = await getSearchMovies(page, value, newLang);
          break;

        case "discover":
          if (!value) {
            return Response.json(
              { message: "Genre is required" },
              { status: 400 }
            );
          }

          movies = await getDiscoverMovies(page, newLang, value);
          break;

        case "upcoming":
          movies = await getUpcomingMovies(page, newLang);
          break;

        case "popular":
          movies = await getPopularMovies(page, newLang);
          break;

        case "topRated":
          movies = await getTopRatedMovies(page, newLang);
          break;

        case "trending":
          movies = await getTrendingMovies(newLang);
          break;

        case "nowPlaying":
          movies = await getNowPlayingMovies(page, newLang);
          break;

        default:
          return Response.json(
            { message: "Invalid category" },
            { status: 400 }
          );
      }
    }

    return Response.json(movies);
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}