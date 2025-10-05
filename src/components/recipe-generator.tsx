'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { getRecipeAction, type RecipeState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RecipeDisplay } from './recipe-display';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from './ui/skeleton';
import { Bot } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter } from 'next/navigation';
import { useI18n } from 'next-international/client';

const initialState: RecipeState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useI18n();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      <Bot className="mr-2 h-4 w-4" />
      {pending ? t('recipe.generator.submit.pending.label') : t('recipe.generator.submit.label')}
    </Button>
  );
}

function ResultContainer({ state }: { state: RecipeState }) {
  const { pending } = useFormStatus();

  if (pending) {
    return <RecipeLoadingSkeleton />;
  }

  if (state.recipe) {
    return <RecipeDisplay recipe={state.recipe} />;
  }

  return null;
}

function RecipeLoadingSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <Skeleton className="h-8 w-3/4 rounded-md" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-6 w-1/4 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-6 w-1/4 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-6 w-1/4 rounded-md" />
          <Skeleton className="h-4 w-1/2 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

const languages = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'Hindi' },
  { value: 'te', label: 'Telugu' },
  { value: 'gu', label: 'Gujarati' },
  { value: 'mr', label: 'Marathi' },
]

function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const currentLang = pathname.split('/')[1] || 'en'
  const t = useI18n();


  const handleLanguageChange = (lang: string) => {
    const newPath = `/${lang}`
    router.replace(newPath)
  }

  return (
    <Select onValueChange={handleLanguageChange} defaultValue={currentLang}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={t('language.switcher.placeholder')} />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function RecipeGenerator() {
  const [state, formAction] = useActionState(getRecipeAction, initialState);
  const { toast } = useToast();
  const t = useI18n();


  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    } else if (state.formErrors?.ingredients) {
      toast({
        variant: 'destructive',
        title: 'Invalid Input',
        description: state.formErrors.ingredients.join(', '),
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="max-w-4xl mx-auto space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-semibold font-headline">{t('recipe.generator.title')}</CardTitle>
            <LanguageSwitcher />
          </div>
          <CardDescription>
            {t('recipe.generator.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ingredients" className="sr-only">Ingredients</Label>
              <Textarea
                id="ingredients"
                name="ingredients"
                placeholder={t('recipe.generator.placeholder')}
                rows={4}
                className="text-base"
                required
              />
            </div>
            <SubmitButton />
          </div>
        </CardContent>
      </Card>

      <ResultContainer state={state} />
    </form>
  );
}
