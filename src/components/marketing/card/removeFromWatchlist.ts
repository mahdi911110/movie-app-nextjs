"use server";

import { getUserSession } from "@/lib/auth";
import { removeWatchlistItem } from "@/lib/moviedb";
import { PrevStateButtons } from "@/types/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function removeFromWatchlist(
  movieId: number,
  prevState: PrevStateButtons,
  formatData: FormData,
) {
  const user = await getUserSession();
  if (!user) {
    redirect("/login");
  }
  removeWatchlistItem(user.id, movieId);
  revalidatePath("/", "layout");
  return { success: true };
}
