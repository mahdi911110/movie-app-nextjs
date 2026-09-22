"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import type { Movie } from "@/types/types";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import Buttons from "@/components/marketing/card/Buttons";
import ErrorFetch from "@/components/marketing/error/ErrorFetch";
import MovieDetailSkeleton from "@/components/marketing/loading/MovieDetailSkeleton";

async function getMovie(id: number, lang: 'fa' | 'en') {
  const response = await fetch(`/api/movies/${lang}/detail/${id}`);
  if (!response.ok) {
    throw new Error("Failed to catch Movie");
  }
  return response.json();
}

export default function MovieDetail({ movieId, lang }: { movieId: number, lang: 'fa' | 'en' }) {
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch } = useQuery<Movie>({
    queryKey: ["movie", movieId, lang],
    queryFn: () => getMovie(movieId, lang),
  });
  if (isLoading) {
    return (
      <MovieDetailSkeleton />
    );
  }
  if (isError || !data) {
    return (
      <ErrorFetch refetch={refetch} text={t('error.reload')} />
    );
  }
  return (
    <div className="w-full flex justify-center">
      <div className="flex w-full flex-col gap-10 md:gap-14 lg:max-w-225">
        <div className="relative w-full aspect-video shrink-0">
          <Image
            className="rounded-2xl"
            src={data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : '/images/no-image.svg'}
            alt={data.title}
            fill
          />
          <div className="absolute rounded-2xl inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
          <div className="absolute text-white flex gap-4 z-10 ps-6 -bottom-5 md:-bottom-10 start-0">
            <div className="relative cursor-pointer transition-transform hover:scale-[1.03]">
              <div className="relative w-30 md:w-60 aspect-2/3">
                <Image
                  className="rounded-2xl"
                  src={data.poster_path ? `https://image.tmdb.org/t/p/original${data.poster_path}` : '/images/no-image.svg'}
                  alt={data.title}
                  fill
                />
              </div>
              <Buttons movieId={movieId} lang={lang} />
            </div>
            <div className="flex flex-col text-[15px] md:text-3xl justify-end pb-6 md:pb-14">
              <div className="font-bold">{data.title}</div>
              <div className="italic">{data.tagline}</div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <Star className="size-3.75 md:size-7.5" color="yellow" />
                  <span>{(data.vote_average ?? 0).toFixed(1)}</span>
                </span>
                <span className="text-blue-300">
                  {" "}({(data.vote_count ?? 0).toLocaleString()} {t('movieDetail.votes')})
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-white min-w-0 flex flex-col px-5 text-[12px] md:text-3xl">
            <div className="flex flex-col gap-1.5 border-b-2 pb-2">
              <div className="font-bold">{t('movieDetail.overview')}</div>
              <div className="leading-6 md:leading-12">{data.overview === '' ? t('hero.noOverview') : data.overview}</div>
            </div>
            <div className="grid grid-cols-3 py-2 border-b-2 gap-2 md:gap-4">
              <div className="flex flex-col gap-1 md:gap-2">
                <span className="font-bold text-gray-400">{t('movieDetail.status')}</span>
                <span>{data.status}</span>
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <span className="font-bold text-gray-400">{t('movieDetail.popularity')}</span>
                <span>{data.popularity}</span>
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <span className="font-bold text-gray-400">
                  {t('movieDetail.originalLanguage')}
                </span>
                <span className="uppercase">{data.original_language}</span>
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <span className="font-bold text-gray-400">{t('movieDetail.releaseDate')}</span>
                <span>{data.release_date}</span>
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <span className="font-bold text-gray-400">{t('movieDetail.budget')}</span>
                <span>{data.budget === 0 ? 'Not Recorded' : `$${data.budget.toLocaleString()}`}</span>
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <span className="font-bold text-gray-400">{t('movieDetail.adult')}</span>
                <span>{data.adult ? t('movieDetail.yes') : t('movieDetail.no')}</span>
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <span className="font-bold text-gray-400">{t('movieDetail.runtime')}</span>
                <span>
                  {Math.floor(data.runtime / 60)}h{" "}
                  {data.runtime % 60 > 0 && `${data.runtime % 60}m`}
                </span>
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <span className="font-bold text-gray-400">{t('movieDetail.revenue')}</span>
                <span>{data.revenue === 0 ? 'Not Recorded' : `$${data.revenue.toLocaleString()}`}</span>
              </div>
            </div>
            <div className="flex flex-col py-2 border-b-2 gap-2">
              <span className="font-bold text-gray-400">{t('movieDetail.spokenLanguages')}</span>
              <div className="flex flex-wrap gap-2">
                {data.spoken_languages.map((lang) => (
                  <span key={lang.iso_639_1}>{lang.english_name}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col py-2 border-b-2 gap-2">
              <span className="font-bold text-gray-400">
                {t('movieDetail.productionCountries')}
              </span>
              <div className="flex flex-wrap gap-2">
                {data.production_countries.map((country) => (
                  <span key={country.iso_3166_1}>{country.name}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col py-2 border-b-2 gap-2">
              <span className="font-bold text-gray-400">{t('movieDetail.genres')}</span>
              <div className="flex flex-wrap gap-2">
                {data.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col py-4 gap-2 border-b-2">
              {data.imdb_id && (
                <a
                  rel="noopener noreferrer"
                  className="bg-yellow-500 px-2.5 py-1.5 rounded-[5px] text-black font-bold mr-auto transition hover:transform-[scale(1.03)] active:transform-[scale(0.9)]"
                  href={`https://imdb.com/title/${data.imdb_id}`}
                  target="_blank"
                >
                  {t('movieDetail.viewOnIMDB')}
                </a>
              )}
              {data.homepage && (
                <a
                  href={data.homepage}
                  rel="noopener noreferrer"
                  className="bg-blue-400 mr-auto px-2.5 py-1.5 rounded-[5px] font-bold transition hover:transform-[scale(1.03)] active:transform-[scale(0.9)]"
                >
                  {t('movieDetail.viewHomePage')}
                </a>
              )}
            </div>
            <div className="flex flex-col gap-2 py-2">
              <div className="font-bold text-[15px] md:text-3xl">{t('movieDetail.companies')}</div>
              <div className="flex flex-wrap gap-2">
                {data.production_companies.map((company) => (
                  <div
                    className="flex flex-col items-center gap-2 font-bold transition hover:transform-[scale(1.03)]"
                    key={company.id}
                  >
                    <div className="relative w-20 aspect-square bg-amber-50/65 rounded-2xl">
                      <Image
                        className="object-contain"
                        src={company.logo_path ? `https://image.tmdb.org/t/p/original${company.logo_path}` : '/images/no-company.png'}
                        alt={company.name}
                        fill
                      />
                    </div>
                    <span className="text-[9px] md:text-[15px]">
                      {company.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
