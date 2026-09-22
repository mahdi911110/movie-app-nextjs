import { getUserSession } from "@/lib/auth";
import { getWatchlistItems } from "@/lib/moviedb";

export async function GET() {
  try {
    const user = await getUserSession();
    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const watchlist = getWatchlistItems(user.id);
    return Response.json(
      watchlist.map((item) => item.movie_id)
    );
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Failed to fetch watchlist" }, { status: 500 });
  }
}