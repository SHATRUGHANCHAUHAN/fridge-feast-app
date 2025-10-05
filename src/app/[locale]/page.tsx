import { Logo } from '@/components/icons/logo';
import { RecipeGenerator } from '@/components/recipe-generator';
import { getI18n, getScopedI18n } from '@/locales/server';
import { LanguageSwitcher } from '@/components/language-switcher';

export default async function Home() {
  const t = await getI18n();
  const scopedT = await getScopedI18n('header');

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <header className="flex flex-col items-center justify-center gap-2 mb-8 text-center relative">
        <div className="absolute top-0 right-0">
          <LanguageSwitcher />
        </div>
        <Logo className="h-12 w-12 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight font-headline text-primary">
          {scopedT('title')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          {scopedT('subtitle')}
        </p>
      </header>
      <RecipeGenerator />
    </main>
  );
}
