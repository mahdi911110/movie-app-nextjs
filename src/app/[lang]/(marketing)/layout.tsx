import Header from "@/components/marketing/header/Header";

export default async function MarketingLayout({ children, params }: { children: React.ReactNode, params: Promise<{ lang: 'fa' | 'en' }> }) {
  const { lang } = await params;
  return (
    <>
      <div className=" px-3 pt-4 md:px-5 md:pt-5">
        <Header lang={lang} />
      </div>
      <main className="flex flex-col gap-5 mt-4 px-3 py-4 md:px-5 md:py-5 text-white">
        {children}
      </main>
    </>
  );
}