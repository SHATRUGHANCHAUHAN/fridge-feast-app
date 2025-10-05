'use client'

import { I18nProvider, useI18n } from 'react-aria'

export function I18nProviderClient({
  locale,
  children,
}: {
  locale: string
  children: React.ReactNode
}) {
  return <I18nProvider locale={locale}>{children}</I18nProvider>
}

export { useI18n }
