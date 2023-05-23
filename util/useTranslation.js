import { useRouter } from "next/router";
import translate from "../lang/main";
import { http, authorizedHttp } from "../config/http";
const ISSERVER = typeof window === "undefined";
let lang;

if (!ISSERVER) {
  lang = localStorage.getItem("selectedLocale");
}

export const useTranslation = () => {
  const { locales = [], defaultLocale, ...nextRouter } = useRouter();

  const locale = locales.includes(nextRouter.locale || "")
    ? nextRouter.locale
    : lang;

  http.defaults.headers["lang"] = locale;
  authorizedHttp.defaults.headers["lang"] = locale;

  return {
    t: (text) => {
      const translation = translate[locale][text];

      return Boolean(translation) ? translation : text;
    },

    locale: (objLocales, keys = true, nullable = false) => {
      const avalibleLocales = keys
        ? Object.keys(objLocales)
        : objLocales.map((obj) => obj.locale);

      const usedLocale = avalibleLocales.includes(nextRouter.locale)
        ? nextRouter.locale
        : nullable
        ? null
        : avalibleLocales.includes(defaultLocale)
        ? defaultLocale
        : avalibleLocales[0];

      return usedLocale ?? null;
    },
    selectedLocale: locale,
  };
};
