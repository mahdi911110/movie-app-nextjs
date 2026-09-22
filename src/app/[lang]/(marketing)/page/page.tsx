import CardComponent from "@/components/marketing/card/CardComponent";

export default async function Page({
  searchParams,
  params
}: {
  searchParams: Promise<{
    category?: string;
    page: string;
    genre?: string;
    query?: string;
  }>;
  params: Promise<{ lang: 'fa' | 'en' }>
}) {
  const { category = 'popular', page = '1', genre, query } = await searchParams;
  const { lang } = await params;
  return (
    <>
      <CardComponent lang={lang} category={category} page={page} genre={genre} query={query} />
    </>
  );
}
