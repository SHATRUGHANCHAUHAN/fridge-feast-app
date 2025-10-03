import { RecipeGenerator } from '@/components/recipe-generator';
import { Logo } from '@/components/icons/logo';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <header className="flex flex-col items-center justify-center gap-2 mb-8 text-center">
        <Logo className="h-12 w-12 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight font-headline text-primary">
          Fridge Feast
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Turn your leftover ingredients into delicious meals. What will you create today?
        </p>
      </header>
      <RecipeGenerator />
    </main>
  );
}
