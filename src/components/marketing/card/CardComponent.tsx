"use client";

import { useQuery } from "@tanstack/react-query";
import { MoviesResponse } from "@/types/types";
import type { QueryArray } from "@/types/types";
import Pagination from "@/components/marketing/footer/Pagination";
import Card from "./Card";
import { useTranslation } from "react-i18next";
import ErrorFetch from "../error/ErrorFetch";
import CardComponentSkeleton from "../loading/CardComponentSkeleton";

async function getMovies(path: QueryArray, lang: 'fa' | 'en') {
  const response = await fetch(`/api/movies/${lang}/${path.join("/")}`);
  if (!response.ok) {
    throw new Error("could not fetch movies");
  }
  return response.json();
}

export default function CardComponent({
  category,
  page,
  genre,
  query,
  lang
}: {
  category: string | undefined;
  page: string;
  genre: string | undefined;
  query: string | undefined;
  lang: 'fa' | 'en';
}) {
  const { t } = useTranslation();
  const queryArray: QueryArray = [
    category,
    Number(page),
    query === undefined ? genre : query,
  ];
  const value = genre === undefined ? query : genre;
  const { data, isLoading, isError, refetch } =
    useQuery<MoviesResponse>({
      queryKey: ["movies", category, Number(page), value, lang],
      queryFn: () => getMovies(queryArray, lang),
    });
  if (isLoading) {
    return (
      <CardComponentSkeleton />
    );
  }
  if (isError) {
    return (
      <ErrorFetch refetch={refetch} text={t('error.reload')} />
    );
  }
  return (
    <>
      <div>
        {query ? `${t('card.searchQuery')} "${query}"` : ''}
        {genre ? `${t('card.searchGenre')} "${genre}"` : ''}
        {(!query && !genre) ? `${t('card.searchCategory')} "${category}"` : ''}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 pt-4">
        {data?.results?.map((movie) => (
          <Card key={movie.id} movie={movie} lang={lang} />
        ))}
      </div>
      <Pagination category={category} page={page} genre={genre} query={query} lastPage={data?.total_pages ?? 0} />
    </>
  );
}
