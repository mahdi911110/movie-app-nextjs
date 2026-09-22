'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { logout } from "@/action/logout";
import { LogIn, LogOut, UserRound } from "lucide-react";

export default function UserComponent({ user, lang }: { user: boolean, lang: 'fa' | 'en' }) {
  const pathName = usePathname();
  if (pathName === `/${lang}/profile`) {
    return (
      <form action={logout.bind(null, lang)}>
        <button
          type="submit"
          className="rounded-4xl p-1 transition-colors cursor-pointer hover:bg-gray-400 active:bg-gray-600"
        >
          <LogOut size={30} color="white" />
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
        <UserRound className="p-1" size={40} color="white" />
      </Link>
    );
  }
  return (
    <Link
      className="rounded-4xl p-1 transition-colors cursor-pointer hover:bg-gray-400 active:bg-gray-600"
      href={`/${lang}/login`}
    >
      <LogIn size={30} color="white" />
    </Link>
  );
}