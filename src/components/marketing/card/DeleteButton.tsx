"use client";

import { Loader, X } from "lucide-react";
import { useActionState, useEffect } from "react";
import removeFromWatchlist from "./removeFromWatchlist";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export default function DeleteButton({ movieId, lang }: { movieId: number, lang: 'fa' | 'en' }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [state, formAction, isPending] = useActionState(
    removeFromWatchlist.bind(null, movieId),
    null,
  );
  useEffect(() => {
    if (state?.success) {
      queryClient.invalidateQueries({
        queryKey: ['watchlist']
      });
    }
  }, [state, queryClient]);
  return (
    <form action={formAction}>
      <button
        disabled={isPending}
        type="submit"
        aria-label={t('card.removeFromWatchlist')}
        className={`absolute flex justify-center items-center ${lang === 'fa' ? '-end-2' : '-start-2'} bottom-8 bg-red-500 w-8 md:w-15 aspect-square rounded-full transition cursor-pointer hover:bg-red-700 hover:-rotate-y-180 active:bg-red-900`}
      >
        {isPending ?
          <Loader className="size-4.5 md:size-11.25" color="white" strokeWidth={3} />
        :
          <X className="size-4.5 md:size-11.25" color="white" strokeWidth={3} />
        }
      </button>
    </form>
  );
}
