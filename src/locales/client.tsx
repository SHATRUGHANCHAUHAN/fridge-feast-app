'use client';

import { I18nProviderClient as I18nProvider } from 'next-international/client';

export function I18nProviderClient({
  locale,
  children,
}: {
  locale: string
  children: React.ReactNode
}) {
  return <I18nProvider locale={locale}>{children}</I18nProvider>
}
