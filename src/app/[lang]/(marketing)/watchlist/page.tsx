import Card from "@/components/marketing/card/Card";
import Pagination from "@/components/marketing/footer/Pagination";
import { getUserSession } from "@/lib/auth";
import { getWatchlistItemsByPage, getWatchlistItemsLastPage } from "@/lib/moviedb";
import { getMovieDetail } from "@/lib/tmdb";
import { getTranslation } from "@/lib/server";

export default async function WatchlistPage({
  searchParams,
  params
}: {
  searchParams: Promise<{ page: string }>,
  params: Promise<{ lang: 'fa' | 'en' }>
}) {
  const { lang } = await params;
  const newLang = lang === 'fa' ? 'fa-IR' : 'en-US';
  const { t } = await getTranslation(lang);
  const user = await getUserSession();

  if (!user) {
    return <div className="h-screen">{t('watchlist.notLogin')}</div>;
  }
  const { page } = await searchParams;
  const watchlistItems = getWatchlistItemsByPage(user.id, Number(page));
  const lastPage = getWatchlistItemsLastPage(user.id);

  const movies = await Promise.all(
    watchlistItems.map(({ movie_id }) =>
      getMovieDetail(movie_id, newLang)
    )
  );

  return (
    <>
      <h1 className="font-bold">{t('watchlist.myWatchlist')}</h1>

      <div className={`grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 pt-4 ${movies.length === 0 ? 'h-screen' : ''}`}>
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} lang={lang} />
        ))}
      </div>
      <Pagination
        category={undefined}
        page={page}
        genre={undefined}
        query={undefined}
        lastPage={lastPage ?? 0}
      />
    </>
  );
}