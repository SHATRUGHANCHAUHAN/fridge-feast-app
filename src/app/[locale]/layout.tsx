import { I18nProviderClient } from '@/locales/client';
import type { ReactNode } from 'react';

export default function SubLayout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactNode;
}) {
  return (
    <I18nProviderClient locale={locale}>
      {children}
    </I18nProviderClient>
  );
}
