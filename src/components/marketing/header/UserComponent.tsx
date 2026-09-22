'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { logout } from "@/action/logout";
import { useTranslation } from "react-i18next";

export default function UserComponent({ user, lang }: { user: boolean, lang: 'fa' | 'en' }) {
  const pathName = usePathname();
  const { t } = useTranslation(); 
  if (pathName === `/${lang}/profile`) {
    return (
      <form action={logout.bind(null, lang)}>
        <button
          type="submit"
          className="rounded-4xl p-1 transition-colors cursor-pointer hover:bg-gray-400 active:bg-gray-600"
        >
          <Image src="/icons/logout.svg" alt={t('header.logout')} width="30" height="30" />
        </button>
      </form>
    );
  }
  if (user) {
    return (
      <Link
        className="rounded-4xl transition-colors cursor-pointer hover:bg-gray-400 active:bg-gray-600"
        href={`/${lang}/profile`}
      >
        <Image src="/icons/user.svg" alt={t('header.profile')} width="50" height="50" />
      </Link>
    );
  }
  return (
    <Link
      className="rounded-4xl p-1 transition-colors cursor-pointer hover:bg-gray-400 active:bg-gray-600"
      href={`/${lang}/login`}
    >
      <Image src="/icons/login.svg" alt={t('header.login')} width="30" height="30" />
    </Link>
  );
}