import TmdbFooter from "@/components/marketing/footer/TmdbFooter";
import Language from "./Language";
import { notFound } from "next/navigation";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: 'fa' | 'en' }>
}) {
  const { lang } = await params;

  if (lang !== 'fa' && lang !== 'en') {
    notFound();
  }

  return (
    <div dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <Language locale={lang}>
        {children}
        <TmdbFooter lang={lang} />
      </Language>
    </div>
  );
}
