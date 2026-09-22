import { getUserSession } from "@/lib/auth";
import HeaderComponent from "./HeaderComponent";

export default async function Header({ lang }: { lang: 'fa' | 'en' }) {
  const user = await getUserSession();
  return (
    <HeaderComponent user={user ? true : false} lang={lang} />
  );
}