import { RecipeGenerator } from '@/components/recipe-generator';
import { Logo } from '@/components/icons/logo';
import { getI18n, getStaticParams } from '@/locales/server';
import { I18nProviderClient } from '@/locales/client';
import { use } from 'react';

export function generateStaticParams() {
  return getStaticParams();
}

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = use(getI18n());

  return (
    <I18nProviderClient locale={locale}>
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
    </I18nProviderClient>
  );
}
