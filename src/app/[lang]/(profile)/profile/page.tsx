import { getUserSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTranslation } from "@/lib/server";

export default async function ProfilePage({ params }: { params: Promise<{ lang: 'fa' | 'en' }> }) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);
  const user = await getUserSession();
  if (!user) {
    redirect('/login');
  }
  return (
    <div className="w-full h-screen">
      <div className="bg-amber-400 w-120 p-4 rounded-2xl flex flex-col gap-1 ml-auto mr-auto text-black">
        <div className="font-bold text-blue-600 flex justify-center">{t('profile.profile')}</div>
        <div className="flex gap-1">
          <span className="font-bold">
            {t('public.id')}
          </span>
          <span>
            {user.id}
          </span>
        </div>
        <div className="flex gap-1">
          <span className="font-bold">
            {t('auth.email')}
          </span>
          <span>
            {user.email}
          </span>
        </div>
        <div className="flex gap-1">
          <span className="font-bold">
            {t('auth.username')}
          </span>
          <span>
            {user.username}
          </span>
        </div>
      </div>
    </div>
  );
}