import type { Movie } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import Buttons from "./Buttons";

export default function Card({ movie, lang }: { movie: Movie, lang: 'fa' | 'en' }) {
  return (
    <div className="relative cursor-pointer transition-transform hover:scale-[1.03]">
      <Link href={`/${lang}/${movie.id}`}>
        <div className="min-w-50 sm:min-w-55 md:min-w-60 aspect-2/3 overflow-hidden rounded-lg bg-zinc-900/60">
          <div className="relative h-full w-full">
            <Image
              className={movie.poster_path ? "object-cover" : "object-contain"}
              src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : '/images/no-image.svg'}
              alt={movie.title}
              fill
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          </div>
          <div className="absolute bottom-1 start-2.5 md:start-10 space-y-1 p-4 ">
            <div className="line-clamp-2 text-sm text-zinc-400">
              {movie.title === '' ? movie.original_title : movie.title}
            </div>
            <div className="line-clamp-2 max-w-[85%] text-sm text-zinc-400">
              {movie.overview}
            </div>
            <div className="flex gap-1 items-center text-sm text-zinc-400">
              <Star size={15} color="yellow" />
              {(movie.vote_average ?? 0).toFixed(1)}
              <span className="text-blue-300">({(movie.vote_count ?? 0).toLocaleString()})</span>
            </div>
          </div>
        </div>
      </Link>
      <Buttons movieId={movie.id} lang={lang} />
    </div>
  );
}