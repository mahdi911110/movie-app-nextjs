"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function Pagination({
  category,
  page,
  genre,
  query,
  lastPage = 1000
}: {
  category: string | undefined;
  page: string;
  genre: string | undefined;
  query: string | undefined;
  lastPage: number;
}) {
  const { t } = useTranslation();
  const pathName = usePathname();
  const currentPage = Number(page);
  if (category === 'trending') {
    return (
      <></>
    );
  }
  if (Number(page) > lastPage) {
    redirect(`${pathName}?${category ? `category=${category}` : ''}&page=${lastPage}${query ? `&query=${query}` : ''}${genre ? `&genre=${genre}` : ''}`);
  }
  return (
    <div className="w-full  flex flex-row gap-2 justify-center py-3">
      <Link
        className="bg-gray-500 rounded-[5px] px-2 py-0.5 transition hover:opacity-80 active:opacity-50"
        href={`${pathName}?${category ? `category=${category}` : ''}&page=${currentPage === 1 ? 1 : currentPage - 1}${query ? `&query=${query}` : ''}${genre ? `&genre=${genre}` : ''}`}
      >
        {t('page.prev')}
      </Link>
      <span>{t('page.page')} {page} / {lastPage}</span>
      <Link
        className="bg-gray-500 rounded-[5px] px-2 py-0.5 transition hover:opacity-80 active:opacity-50"
        href={`${pathName}?${category ? `category=${category}` : ''}&page=${currentPage === lastPage ? currentPage : currentPage + 1}${query ? `&query=${query}` : ''}${genre ? `&genre=${genre}` : ''}`}
      >
        {t('page.next')}
      </Link>
    </div>
  );
}
