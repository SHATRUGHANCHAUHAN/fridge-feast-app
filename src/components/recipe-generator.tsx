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

const initialState: RecipeState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      <Bot className="mr-2 h-4 w-4" />
      {pending ? 'Generating Your Feast...' : 'Generate Recipe'}
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

export function RecipeGenerator() {
  const [state, formAction] = useActionState(getRecipeAction, initialState);
  const { toast } = useToast();


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
            <CardTitle className="text-2xl font-semibold font-headline">What's in your fridge?</CardTitle>
          </div>
          <CardDescription>
            List the ingredients you have, separating them with commas, and we'll whip up a recipe for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ingredients" className="sr-only">Ingredients</Label>
              <Textarea
                id="ingredients"
                name="ingredients"
                placeholder="e.g., chicken breast, broccoli, soy sauce, rice"
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
