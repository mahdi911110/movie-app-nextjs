'use client';

import { useQuery } from "@tanstack/react-query";
import type { MoviesResponse } from "@/types/types";
import Card from "./Card";
import ErrorFetch from "../error/ErrorFetch";
import { useTranslation } from "react-i18next";
import CardRowSkeleton from "../loading/CardRowSkeleton";

async function getMovies(path: string, lang: 'fa' | 'en') {
  const response = await fetch(`/api/movies/${lang}/${path}`);
  if (!response.ok) {
    throw new Error('Faild to catch data');
  }
  return response.json();
}

export default function CardRow({ path, lang }: { path: string, lang: 'en' | 'fa' }) {
  const { data, isLoading, isError, refetch } = useQuery<MoviesResponse>({
    queryKey: ['movies', path, lang],
    queryFn: () => getMovies(path, lang)
  });
  const { t } = useTranslation();
  if (isError) {
    return (
      <ErrorFetch refetch={refetch} text={t('error.reload')} />
    );
  }
  if (isLoading) {
    return (
      <CardRowSkeleton />
    );
  }
  return (
    <div className="w-full overflow-x-auto scrollbar-thumb-indigo-300 flex flex-row gap-x-3.5 p-3 relative">
      {data?.results?.map(movie => (
        <Card key={movie.id} movie={movie} lang={lang} />
      ))}
    </div>
  );
}