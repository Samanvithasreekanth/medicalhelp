import en from "./en.json";
import hi from "./hi.json";
import kn from "./kn.json";
import ta from "./ta.json";

const dictionaries = {
  en,
  hi,
  kn,
  ta,
};

export type ValidLocale = keyof typeof dictionaries;
export type Dictionary = typeof en;

export const getDictionary = (locale: ValidLocale): Dictionary => {
  return dictionaries[locale] || dictionaries.en;
};
