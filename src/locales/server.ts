import { createI18nServer } from 'next-international/server'

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } = createI18nServer({
  en: () => import('./en'),
  hi: () => import('./hi'),
  te: () => import('./te'),
  gu: () => import('./gu'),
  mr: () => import('./mr'),
})
