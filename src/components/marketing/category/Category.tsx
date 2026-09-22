import Link from "next/link";
import { getTranslation } from "@/lib/server";

export default async function Category({ lang }: { lang: 'fa' | 'en' }) {
  const genres = [
    { name: "action", slug: "action" },
    { name: "adventure", slug: "adventure" },
    { name: "animation", slug: "animation" },
    { name: "comedy", slug: "comedy" },
    { name: "crime", slug: "crime" },
    { name: "documentary", slug: "documentary" },
    { name: "drama", slug: "drama" },
    { name: "family", slug: "family" },
    { name: "fantasy", slug: "fantasy" },
    { name: "history", slug: "history" },
    { name: "horror", slug: "horror" },
    { name: "music", slug: "music" },
    { name: "mystery", slug: "mystery" },
    { name: "romance", slug: "romance" },
    { name: "scienceFiction", slug: "science_fiction" },
    { name: "tvMovie", slug: "tv_movie" },
    { name: "thriller", slug: "thriller" },
    { name: "war", slug: "war" },
    { name: "western", slug: "western" },
  ];
  const { t } = await getTranslation(lang);
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre, index) => (
        <Link
          className="bg-blue-500 px-2 rounded-2xl transition hover:transform-[scale(1.03)] active:transform-[scale(0.9)]"
          key={index}
          href={`/${lang}/page?category=discover&page=1&genre=${genre.slug}`}
        >
          {t(`category.${genre.name}`)}
        </Link>
      ))}
    </div>
  );
}
