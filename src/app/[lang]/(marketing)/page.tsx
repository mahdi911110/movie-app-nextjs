import CardRow from "@/components/marketing/card/CardRow";
import Category from "@/components/marketing/category/Category";
import HeroComponent from "@/components/marketing/hero/HeroComponent";
import { ChevronLeft, ChevronRight, Clapperboard, Flame, Heart, Popcorn, Star  } from "lucide-react";
import Link from "next/link";
import { getTranslation } from "@/lib/server";

export default async function HomePage({ params }: { params: Promise<{ lang: 'fa' | 'en' }> }) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className=" flex flex-row justify-between">
          <span className="flex items-center gap-1">{t('marketing.upcoming')} <Popcorn size={18} color="#FFFDD0" /></span>
          <Link
            href={`/${lang}/page?category=upcoming&page=1`}
            className="w-fit rounded-lg flex items-center bg-white/10 px-3 py-1.5 text-sm  backdrop-blur-sm transition hover:bg-white/20 md:text-base"
          >
            {t('public.seeMore')}
            {lang === 'fa' ?
              <ChevronLeft size={15} />
            :
              <ChevronRight size={15} />
            }
          </Link>
        </div>
        <HeroComponent lang={lang} />
      </div>
      <div className="flex flex-col gap-2">
        <div className=" flex flex-row justify-between">
          <span className="flex items-center gap-1">{t('marketing.popular')} <Heart size={18} color="pink" /></span>
          <Link
            href={`/${lang}/page?category=popular&page=1`}
            className="w-fit rounded-lg flex items-center bg-white/10 px-3 py-1.5 text-sm  backdrop-blur-sm transition hover:bg-white/20 md:text-base"
          >
            {t('public.seeMore')}
            {lang === 'fa' ?
              <ChevronLeft size={15} />
            :
              <ChevronRight size={15} />
            }
          </Link>
        </div>
        <CardRow lang={lang} path="popular" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <span className="flex items-center gap-1">{t('marketing.topRated')} <Star size={18} color="yellow" /></span>
          <Link
            href={`/${lang}/page?category=topRated&page=1`}
            className="w-fit rounded-lg flex items-center bg-white/10 px-3 py-1.5 text-sm  backdrop-blur-sm transition hover:bg-white/20 md:text-base"
          >
            {t('public.seeMore')}
            {lang === 'fa' ?
              <ChevronLeft size={15} />
            :
              <ChevronRight size={15} />
            }
          </Link>
        </div>
        <CardRow lang={lang} path="topRated" />
      </div>
      <div className="flex flex-col gap-2">
        <div className=" flex flex-row justify-between">
          <span className="flex items-center gap-1">{t('marketing.trending')} <Flame size={18} color="orange" /></span>
          <Link
            href={`/${lang}/page?category=trending`}
            className="w-fit rounded-lg flex items-center bg-white/10 px-3 py-1.5 text-sm  backdrop-blur-sm transition hover:bg-white/20 md:text-base"
          >
            {t('public.seeMore')}
            {lang === 'fa' ?
              <ChevronLeft size={15} />
            :
              <ChevronRight size={15} />
            }
          </Link>
        </div>
        <CardRow lang={lang} path="trending" />
      </div>
      <div className="flex flex-col gap-2">
        <div className=" flex flex-row justify-between">
          <span className="flex items-center gap-1">{t('marketing.nowPlaying')} <Clapperboard size={18} color="#A3B3FF" /></span>
          <Link
            href={`/${lang}/page?category=nowPlaying&page=1`}
            className="w-fit rounded-lg flex items-center bg-white/10 px-3 py-1.5 text-sm  backdrop-blur-sm transition hover:bg-white/20 md:text-base"
          >
            {t('public.seeMore')}
            {lang === 'fa' ?
              <ChevronLeft size={15} />
            :
              <ChevronRight size={15} />
            }
          </Link>
        </div>
        <CardRow lang={lang} path="nowPlaying" />
      </div>
      <Category lang={lang} />
    </>
  );
}
