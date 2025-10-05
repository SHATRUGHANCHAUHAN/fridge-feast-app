import { createI18nServer } from 'next-international/server';

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } = createI18nServer({
  en: () => import('./en.json'),
  hi: () => import('./hi.json'),
  te: () => import('./te.json'),
  ml: () => import('./ml.json'),
  bn: () => import('./bn.json'),
  pa: () => import('./pa.json'),
  gu: () => import('./gu.json'),
});
