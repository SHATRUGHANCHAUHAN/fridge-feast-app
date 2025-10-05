'use client';
import { createI18nClient } from 'next-international/client';

export const { useI18n, useScopedI18n, I18nProviderClient, useCurrentLocale, useChangeLocale } = createI18nClient({
  en: () => import('./en.json'),
  hi: () => import('./hi.json'),
  te: () => import('./te.json'),
  ml: () => import('./ml.json'),
  bn: () => import('./bn.json'),
  pa: () => import('./pa.json'),
  gu: () => import('./gu.json'),
});
