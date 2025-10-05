'use client';

import { ReactNode } from 'react';
import { I18nProvider } from 'next-international/client';

export function I18nProviderClient({
  locale,
  children,
}: {
  locale: string;
  children: ReactNode;
}) {
  return <I18nProvider locale={locale}>{children}</I18nProvider>;
}
