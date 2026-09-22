import Image from "next/image";
import MovieDetail from "./MovieDetail";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ movieId: string, lang: 'fa' | 'en' }>;
}) {
  const { movieId, lang } = await params;
  return (
    <MovieDetail movieId={Number(movieId)} lang={lang} />
  );
}
