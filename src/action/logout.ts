'use server';

import { getUserSession, removeUserSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function logout(lang: 'fa' | 'en') {
  const user = await getUserSession();
  if (!user) {
    redirect('/login');
  }
  await removeUserSession();
  redirect(`/${lang}`);
}