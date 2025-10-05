import { RecipeGenerator } from '@/components/recipe-generator';
import { Logo } from '@/components/icons/logo';
import { getI18n } from '@/locales/server';

export default async function Home() {
  const t = await getI18n();

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
