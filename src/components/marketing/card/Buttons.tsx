'use client';

import DeleteButton from "./DeleteButton";
import AddButton from "./AddButton";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

async function getWatchlist() {
  const response = await fetch('/api/movies/watchlist');
  if (!response.ok) {
    throw new Error('Failed to fetch watchlist');
  }
  return response.json();
}

export default function Buttons({
  movieId,
  lang
}: {
  movieId: number;
  lang: 'fa' | 'en';
}) {
  const { data, isLoading } = useQuery<number[]>({
    queryKey: ['watchlist'],
    queryFn: getWatchlist
  });
  if (isLoading) {
    return (
      <div
        className={`absolute flex justify-center items-center ${lang === 'fa' ? '-end-2' : '-start-2'} bottom-8 bg-gray-500 w-8 aspect-square rounded-2xl transition cursor-pointer`}
      >
        <Loader className="size-4.5 md:size-11.25" color="white" strokeWidth={3} />
      </div>
    );
  }
  const added = data?.includes(movieId) ?? false;
  return added ? (
    <DeleteButton movieId={movieId} lang={lang} />
  ) : (
    <AddButton movieId={movieId} lang={lang} />
  );
}