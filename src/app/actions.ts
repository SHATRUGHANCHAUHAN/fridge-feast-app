'use server';

import {
  generateRecipeFromIngredients,
  GenerateRecipeFromIngredientsOutput,
} from '@/ai/flows/generate-recipe-from-ingredients';
import { getI18n } from '@/locales/server';
import { z } from 'zod';

const inputSchema = z.object({
  ingredients: z.string().min(3, { message: 'Please enter at least three characters worth of ingredients.' }),
  language: z.string(),
});

export type RecipeState = {
  formErrors?: {
    ingredients?: string[];
  };
  recipe?: GenerateRecipeFromIngredientsOutput;
  error?: string | null;
};

export async function getRecipeAction(
  prevState: RecipeState,
  formData: FormData
): Promise<RecipeState> {
  const validatedFields = inputSchema.safeParse({
    ingredients: formData.get('ingredients'),
    language: formData.get('language'),
  });

  if (!validatedFields.success) {
    return {
      formErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const recipeData = await generateRecipeFromIngredients({
      ingredients: validatedFields.data.ingredients,
      language: validatedFields.data.language,
    });

    const t = await getI18n();

    if (!recipeData || !recipeData.recipeName) {
      return { error: t('recipe.error.generation') };
    }

    return {
      recipe: recipeData,
    };
  } catch (e) {
    console.error(e);
    const t = await getI18n();
    return { error: t('recipe.error.unexpected') };
  }
}
