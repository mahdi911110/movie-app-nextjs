"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { MoviesResponse } from '@/types/types';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import ErrorFetch from "../error/ErrorFetch";
import HeroSkeleton from "../loading/HeroSkeleton";

async function getMovies(lang: 'fa' | 'en') {
  const response = await fetch(`/api/movies/${lang}/upcoming`);
  if (!response.ok) {
    throw new Error("Failed to fetch upcoming movies");
  }
  return response.json();
}

export default function HeroComponent({ lang }: { lang: 'fa' | 'en' }) {
  const [number, setNumber] = useState(0);
  const [resetTimer, setResetTimer] = useState(false);
  const { data, isLoading, isError, refetch } = useQuery<MoviesResponse>({
    queryKey: ["movies", "upcoming", lang],
    queryFn: () => getMovies(lang),
  });
  
  useEffect(() => {
    if (!data?.results.length) {
      return;
    }
    const intervalId = setInterval(() => {
      setNumber(prev =>
        prev === data.results.length - 1 ? 0 : prev + 1
      );
    }, 10000);
    return () => clearInterval(intervalId);
  }, [data, resetTimer]);

  const { t } = useTranslation();

  if (isLoading) {
    return (
      <HeroSkeleton />
    );
  }
  
  if (isError || !data?.results) {
    return (
      <ErrorFetch refetch={refetch} text={t('error.reload')} />
    );
  }
  
  function handleNext() {
    if (!data) {
      return;
    }

    setNumber((prev) => (prev < data.results.length - 1 ? prev + 1 : prev));
    setResetTimer(prev => !prev);
  }
  
  function handlePrev() {
    setNumber((prev) => Math.max(prev - 1, 0));
    setResetTimer(prev => !prev);
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg lg:max-w-225 mr-auto ml-auto">
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(${lang === 'fa' ? '+' : '-'}${number * 100}%)`,
        }}
      >
        {data.results.map((movie) => (
          <div
            key={movie.id}
            className="relative h-full min-w-full shrink-0"
          >
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title === '' ? movie.original_title : movie.title}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-4 start-12 flex flex-col gap-1 md:bottom-8 md:start-8">
              <span className="text-xl font-bold md:text-4xl">
                {movie.title === '' ? movie.original_title : movie.title}
              </span>

              <span className="line-clamp-2 max-w-[80%] text-sm md:text-lg">
                {movie.overview === '' ? t('hero.noOverview') : movie.overview}
              </span>

              <Link
                href={`/${lang}/${movie.id}`}
                className="flex items-center w-fit rounded-lg bg-white/10 px-3 py-1.5 text-sm backdrop-blur-sm transition hover:bg-white/20 md:text-base"
              >
                {t('hero.seeInfo')}
                {lang === 'fa' ?
                  <ChevronLeft size={15} />
                :
                  <ChevronRight size={15} />
                }
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={lang === 'fa' ? handleNext : handlePrev}
        disabled={lang ==='fa' ? (number === data.results.length - 1) : (number === 0)}
        className="absolute aspect-square cursor-pointer left-0 top-1/2 ml-2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm transition hover:bg-white/20 disabled:opacity-30"
      >
        <ChevronLeft size={15} />
      </button>

      <button
        onClick={lang === 'fa' ? handlePrev : handleNext}
        disabled={lang === 'fa' ? (number === 0) : (number === data.results.length - 1)}
        className="absolute aspect-square cursor-pointer right-0 top-1/2 mr-2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm transition hover:bg-white/20 disabled:opacity-30"
      >
        <ChevronRight size={15} strokeWidth={3} />
      </button>
    </div>
  );
}