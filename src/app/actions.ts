'use server';

import {
  generateRecipeFromIngredients,
  GenerateRecipeFromIngredientsOutput,
} from '@/ai/flows/generate-recipe-from-ingredients';
import { displayNutritionalInformation } from '@/ai/flows/display-nutritional-information';
import { z } from 'zod';

const inputSchema = z.object({
  ingredients: z.string().min(3, { message: 'Please enter at least three characters worth of ingredients.' }),
});

export type RecipeData = GenerateRecipeFromIngredientsOutput & { curatedNutritionalInfo: string };

export type RecipeState = {
  formErrors?: {
    ingredients?: string[];
  };
  recipe?: RecipeData;
  error?: string | null;
};

export async function getRecipeAction(
  prevState: RecipeState,
  formData: FormData
): Promise<RecipeState> {
  const validatedFields = inputSchema.safeParse({
    ingredients: formData.get('ingredients'),
  });

  if (!validatedFields.success) {
    return {
      formErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const recipeData = await generateRecipeFromIngredients({
      ingredients: validatedFields.data.ingredients,
    });

    if (!recipeData || !recipeData.recipeName) {
      return { error: 'Could not generate a recipe with these ingredients. Please try again with different or more ingredients.' };
    }

    const recipeString = `Recipe: ${recipeData.recipeName}\n\nIngredients:\n${recipeData.ingredients}\n\nInstructions:\n${recipeData.instructions}`;

    const nutritionalInfo = await displayNutritionalInformation({ recipe: recipeString });

    return {
      recipe: {
        ...recipeData,
        curatedNutritionalInfo: nutritionalInfo.nutritionalInformation,
      },
    };
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred while generating your recipe. Please try again later.' };
  }
}
