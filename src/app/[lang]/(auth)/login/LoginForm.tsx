'use client';

import { ChevronLeft, Loader } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "./loginAction";
import { useTranslation } from "react-i18next";

export default function LoginForm({ lang }: { lang: 'fa' | 'en' }) {
  const { t } = useTranslation();
  const [state, formAction, isPending] = useActionState(
    loginAction.bind(null, lang),
    null
  );
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="bg-amber-300 w-90 rounded-2xl flex flex-col gap-1 p-6">
        <div className="text-blue-600 font-bold flex justify-center">
          {t('auth.login')}
        </div>
        <Link className="bg-gray-400 mr-auto px-2 py-1 rounded-2xl flex items-center transition hover:transform-[scale(1.03)] active:transform-[scale(1)]" href={`/${lang}`}>
          <ChevronLeft size={18} strokeWidth={3} />
          <span>{t('auth.backToHomePage')}</span>
        </Link>
        <form className="flex flex-col justify-center gap-4" action={formAction}>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="usernameOrEmail">
                {t('auth.usernameOrEmail')}
              </label>
              <input
                id="usernameOrEmail"
                className="bg-gray-200 px-2 rounded-sm"
                type="text"
                name="usernameOrEmail"
                placeholder={t('auth.usernameOrEmailPlaceholder')}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="password">
                {t('public.password')}
              </label>
              <input
                id="password"
                className="bg-gray-200 px-2 rounded-sm"
                type="password"
                name="password"
                placeholder={t('public.passwordPlaceholder')}
                required
              />
            </div>
          </div>
          <button
            disabled={isPending}
            className={`bg-black rounded-sm flex justify-center text-white py-1 ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-70 active:opacity-50'}`}
            type="submit"
          >
            {isPending ?
              <Loader size={18} color="white" />
            :
              t('public.login')
            }
          </button>
        </form>
        {state && 
          <div>{state.error}</div>
        }
        <div className="flex gap-1">
          {t('auth.dontHaveAccount')}
          <Link className="text-blue-500 font-bold" href={`/${lang}/signup`}>
            {t('auth.signup')}
          </Link>
        </div>
      </div>
    </div>
  );
}