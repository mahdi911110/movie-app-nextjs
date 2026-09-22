import Image from "next/image";
import { getTranslation } from "@/lib/server";

export default async function TmdbFooter({ lang }: { lang: 'fa' | 'en' }) {
  const { t } = await getTranslation(lang);
  return (
    <footer className="w-full flex justify-center items-center gap-x-1.5 py-2 bg-linear-to-l from-[#0d253f] to-[#01b4e4] text-white">
      <span>{t('footer.poweredBy')}</span>
      <div className="relative w-8 aspect-square">
        <Image src="/logo/tmdb.svg" alt="TMDB Logo" fill />
      </div>
    </footer>
  );
}