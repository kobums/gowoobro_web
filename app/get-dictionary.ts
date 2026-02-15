import 'server-only'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ko: () => import('./dictionaries/ko.json').then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
  if (locale === 'en') return dictionaries.en();
  return dictionaries.ko();
}
