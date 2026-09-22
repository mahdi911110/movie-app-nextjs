import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

export async function getTranslation(locale: string) {
  const i18n = createInstance();

  await i18n
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/utils/i18n/locale/${language}/${namespace}.json`)
      )
    )
    .init({
      lng: locale,
      fallbackLng: "en",
      ns: [locale],
    });

  return {
    t: i18n.t.bind(i18n),
  };
}