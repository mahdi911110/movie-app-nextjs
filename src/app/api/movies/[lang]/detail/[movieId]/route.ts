import { getMovieDetail } from "@/lib/tmdb";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ movieId: string, lang: 'fa' | 'en' }> },
) {
  const { movieId, lang } = await params;
  const newLang = lang === 'fa' ? 'fa-IR' : 'en-US';
  try {
    const movie = await getMovieDetail(Number(movieId), newLang);
    return Response.json(movie);
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Failed to catch movie" }, { status: 500 });
  }
}
