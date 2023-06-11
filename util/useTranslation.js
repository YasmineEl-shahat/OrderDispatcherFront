import { useRouter } from "next/router";
import translate from "../lang/main";
import {
  httpJson,
  authorizedHttpJson,
  httpForm,
  authorizedHttpForm,
} from "../config/http";
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

  httpJson.defaults.headers["lang"] = locale;
  httpForm.defaults.headers["lang"] = locale;
  authorizedHttpJson.defaults.headers["lang"] = locale;
  authorizedHttpForm.defaults.headers["lang"] = locale;

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
