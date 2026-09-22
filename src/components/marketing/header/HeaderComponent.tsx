'use client';

import Link from "next/link";
import UserComponent from "./UserComponent";
import { Bookmark, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useTranslation } from "react-i18next";

export default function HeaderComponent({ user, lang }: { user: boolean, lang: 'fa' | 'en' }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();
  function handleSearchInput(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }
  function handleOnKeydown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      setSearch('');
      setIsOpen(false);
    }
    if (event.key === 'Enter') {
      handleSearchButton();
    }
  }
  function handleSearchButton() {
    const newSearch = search;
    if (newSearch.trim() === '') {
      return;
    }
    setSearch('');
    setIsOpen(false);
    router.push(`/${lang}/page?category=search&page=1&query=${encodeURIComponent(newSearch)}`);
  }
  return (
    <header className="h-14 md:h-16 w-full bg-gray-400/35 rounded-2xl flex flex-row items-center gap-x-4 gap-y-4 px-4 py-4 sticky">
      <Link className="flex flex-col items-center gap-0.5" href={`/${lang}`}>
        <svg
          className="h-7 w-7 md:h-9 md:w-9"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="64" height="64" rx="14" fill="#1a1a2e" />
          <rect x="12" y="18" width="40" height="8" fill="#e50914" rx="1" />
          <line x1="18" y1="18" x2="14" y2="26" stroke="#fff" strokeWidth="2" />
          <line x1="26" y1="18" x2="22" y2="26" stroke="#fff" strokeWidth="2" />
          <line x1="34" y1="18" x2="30" y2="26" stroke="#fff" strokeWidth="2" />
          <line x1="42" y1="18" x2="38" y2="26" stroke="#fff" strokeWidth="2" />
          <rect x="12" y="28" width="40" height="24" fill="#f5f5f5" rx="2" />
          <line
            x1="16"
            y1="35"
            x2="48"
            y2="35"
            stroke="#1a1a2e"
            strokeWidth="1.5"
          />
          <line
            x1="16"
            y1="42"
            x2="48"
            y2="42"
            stroke="#1a1a2e"
            strokeWidth="1.5"
          />
        </svg>
        <span className="text-[9px] md:text-xs whitespace-nowrap text-white font-Pacifico">
          {t('header.mainLogo')}
        </span>
      </Link>
      <div className='flex grow justify-center'>
        <input
          className="bg-gray-400/25 text-white hidden md:flex grow rounded-2xl pl-5 pr-10 py-2 outline-none placeholder:text-gray-300 focus:ring-2 focus:ring-red-500 order-1 max-w-150"
          type="search"
          value={search}
          onChange={handleSearchInput}
          onKeyDown={handleOnKeydown}
          placeholder={t('header.searchPlaceholder')}
        />
        <button onClick={handleSearchButton} className={`cursor-pointer rounded-4xl hidden md:flex mt-auto mb-auto ${lang === 'fa' ? '-mr-10' : '-ml-10'} transition-colors hover:bg-gray-400 active:bg-gray-600 order-2`}>
          <Search className="p-0.5" />
        </button>
        <div className="w-full flex flex-row gap-x-4 md:hidden">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="cursor-pointer rounded-4xl flex justify-center items-center md:hidden ml-auto mt-auto mb-auto md:-ml-10 transition-colors hover:bg-gray-400 active:bg-gray-600 w-10 h-10 order-3"
          >
            {isOpen ?
              <X size={30} color="red" />
            :
              <Search size={30} />
            }
          </button>
          {isOpen &&
            <div className="flex min-w-0 basis-full md:hidden mr-2">
              <input
                className="bg-gray-400/25 text-white w-0 grow rounded-2xl pl-5 pr-10 py-2 outline-none placeholder:text-gray-300 focus:ring-2 focus:ring-red-500 order-1"
                type="search"
                value={search}
                onChange={handleSearchInput}
                onKeyDown={handleOnKeydown}
                placeholder={t('header.searchPlaceholder')}
              />
              <button onClick={handleSearchButton} className={`cursor-pointer rounded-4xl mt-auto mb-auto ${lang === 'fa' ? '-mr-10' : '-ml-10'} transition-colors hover:bg-gray-400 active:bg-gray-600 order-2`}>
                <Search className="p-0.5" />
              </button>
            </div>
          }
        </div>
      </div>
      <div className={`${isOpen ? 'hidden md:flex' : 'flex flex-row'} items-center gap-2 ml-auto shrink-0`}>
        <Link
          className="rounded-4xl px-2.5 aspect-square flex items-center transition-colors hover:bg-gray-400 active:bg-gray-600"
          href={`/${lang === 'fa' ? 'en' : 'fa'}`}
        >
          <span className="text-white">{lang === 'fa' ? 'En' : 'Fa'}</span>
        </Link>
        <Link
          className="rounded-4xl transition-colors hover:bg-gray-400 active:bg-gray-600"
          href={`/${lang}/watchlist?page=1`}
        >
          <Bookmark className="p-1" size={40} color="red" />
        </Link>
        <UserComponent user={user ? true : false} lang={lang} />
      </div>
    </header>
  );
}