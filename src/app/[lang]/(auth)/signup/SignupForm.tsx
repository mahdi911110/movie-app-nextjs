'use client';

import { ChevronLeft, Loader } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { signupAction } from "./signupAction";
import { useTranslation } from "react-i18next";

export default function SignupForm({ lang }: { lang: 'fa' | 'en' }) {
  const { t } = useTranslation();
  const [state, formAction, isPending] = useActionState(
    signupAction.bind(null, lang),
    null
  );
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="bg-amber-300 w-90 rounded-2xl flex flex-col gap-1 p-6">
        <div className="text-blue-600 font-bold flex justify-center">
          {t('auth.signup')}
        </div>
        <Link className="bg-gray-400 mr-auto px-2 py-1 rounded-2xl flex items-center transition hover:transform-[scale(1.03)] active:transform-[scale(1)]" href={`/${lang}`}>
          <ChevronLeft size={18} strokeWidth={3} />
          <span>{t('auth.backToHomePage')}</span>
        </Link>
        <form className="flex flex-col justify-center gap-4" action={formAction}>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="username">
                {t('auth.username')}
              </label>
              <input
                id="username"
                className="bg-gray-200 px-2 rounded-sm"
                type="text"
                name="username"
                placeholder={t('auth.usernamePlaceholder')}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="email">
                {t('auth.email')}
              </label>
              <input
                id="email"
                className="bg-gray-200 px-2 rounded-sm"
                type="text"
                name="email"
                placeholder={t('auth.emailPlaceholder')}
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
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="passwordAgain">
                {t('auth.passwordAgain')}
              </label>
              <input
                id="passwordAgain"
                className="bg-gray-200 px-2 rounded-sm"
                type="password"
                name="passwordAgain"
                placeholder={t('auth.passwordAgainPlaceholder')}
                required
              />
            </div>
          </div>
          {state?.error &&
            <div className="text-red">
              {state.error}
            </div>
          }
          <button
            disabled={isPending}
            className="bg-black text-white cursor-pointer py-0.5 hover:opacity-70 active:opacity-50"
            type="submit"
          >
            {isPending ?
              <Loader size={18} color="white" />
            :
              t('auth.register')
            }
          </button>
        </form>
        <div className="flex gap-1">
          {t('auth.youHaveAccount')}
          <Link className="text-blue-500 font-bold" href={`/${lang}/login`}>
            {t('auth.login')}
          </Link>
        </div>
      </div>
    </div>
  );
}