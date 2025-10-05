import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { GenerateRecipeFromIngredientsOutput } from '@/ai/flows/generate-recipe-from-ingredients';
import { Separator } from './ui/separator';
import { useI18n } from '@/locales/client';

const formatTextBlock = (text: string | undefined) => {
  if (!text) return null;
  return text.split('\n').map((item, index) => {
    const trimmedItem = item.trim();
    if (!trimmedItem) return null;
    return <p key={index}>{trimmedItem}</p>;
  });
};

const formatList = (text: string | undefined) => {
  if (!text) return null;
  return (
    <ul className="space-y-2">
      {text.split('\n').map((item, index) => {
        const trimmedItem = item.trim().replace(/^- /, '');
        if (!trimmedItem) return null;
        return (
          <li key={index} className="flex items-start">
            <span className="text-primary mr-2 mt-1">•</span>
            <span>{trimmedItem}</span>
          </li>
        );
      })}
    </ul>
  );
};

const formatInstructions = (text: string | undefined) => {
  if (!text) return null;
  return (
    <ol className="space-y-4">
      {text.split('\n').map((item, index) => {
        const trimmedItem = item.trim().replace(/^\d+\.\s*/, '');
        if (!trimmedItem) return null;
        return (
          <li key={index} className="flex items-start">
            <span className="flex items-center justify-center font-bold text-primary-foreground bg-primary rounded-full size-6 min-w-6 mr-4">
              {index + 1}
            </span>
            <span className="pt-0.5">{trimmedItem}</span>
          </li>
        );
      })}
    </ol>
  );
};

export function RecipeDisplay({ recipe }: { recipe: GenerateRecipeFromIngredientsOutput }) {
  const nutritionalInfo = recipe.nutritionalInformation;
  const t = useI18n();

  return (
    <Card className="shadow-lg animate-in fade-in-0 zoom-in-95 duration-500">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-primary">{recipe.recipeName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-base">
        <div>
          <h3 className="font-semibold text-xl mb-3 font-headline">{t('recipe.display.ingredients.title')}</h3>
          {formatList(recipe.ingredients)}
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold text-xl mb-4 font-headline">{t('recipe.display.instructions.title')}</h3>
          {formatInstructions(recipe.instructions)}
        </div>
        {nutritionalInfo && (
          <>
            <Separator />
            <div>
              <h3 className="font-semibold text-xl mb-3 font-headline">{t('recipe.display.nutrition.title')}</h3>
              <div className="text-muted-foreground space-y-2">
                {formatTextBlock(nutritionalInfo)}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
