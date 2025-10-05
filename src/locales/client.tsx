'use client';

import { I18nProvider } from 'next-international/client';
import type { ReactNode } from 'react';

export function I18nProviderClient({
  locale,
  children,
}: {
  locale: string;
  children: ReactNode;
}) {
  return <I18nProvider locale={locale}>{children}</I18nProvider>;
}
