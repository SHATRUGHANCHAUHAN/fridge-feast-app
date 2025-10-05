'use client';

import { getI18n, getStaticParams } from '@/locales/server';
import { I18nProvider, useI18n } from 'next-international/client';
import { Logo } from '@/components/icons/logo';
import { RecipeGenerator } from '@/components/recipe-generator';
import { ReactNode } from 'react';

// This function is commented out because generateStaticParams can't be used in a client component.
// We will address this if needed in a subsequent step, but the priority is to fix the runtime error.
// export function generateStaticParams() {
//   return getStaticParams();
// }

function PageContent() {
  const t = useI18n();

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <header className="flex flex-col items-center justify-center gap-2 mb-8 text-center">
        <Logo className="h-12 w-12 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight font-headline text-primary">
          {t('app.title')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          {t('app.description')}
        </p>
      </header>
      <RecipeGenerator />
    </main>
  );
}

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <I18nProvider locale={locale} fallbackLocale={process.env.NEXT_PUBLIC_DEFAULT_LOCALE}>
      <PageContent />
    </I18nProvider>
  );
}
