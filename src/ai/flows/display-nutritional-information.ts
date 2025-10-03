'use server';
/**
 * @fileOverview A flow for determining and displaying the most relevant nutritional information for a recipe.
 *
 * - displayNutritionalInformation - A function that handles the process of selecting and formatting nutritional information.
 * - DisplayNutritionalInformationInput - The input type for the displayNutritionalInformation function.
 * - DisplayNutritionalInformationOutput - The return type for the displayNutritionalInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DisplayNutritionalInformationInputSchema = z.object({
  recipe: z.string().describe('The recipe for which to display nutritional information.'),
});
export type DisplayNutritionalInformationInput = z.infer<typeof DisplayNutritionalInformationInputSchema>;

const DisplayNutritionalInformationOutputSchema = z.object({
  nutritionalInformation: z.string().describe('The most relevant nutritional information for the recipe.'),
});
export type DisplayNutritionalInformationOutput = z.infer<typeof DisplayNutritionalInformationOutputSchema>;

export async function displayNutritionalInformation(input: DisplayNutritionalInformationInput): Promise<DisplayNutritionalInformationOutput> {
  return displayNutritionalInformationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'displayNutritionalInformationPrompt',
  input: {schema: DisplayNutritionalInformationInputSchema},
  output: {schema: DisplayNutritionalInformationOutputSchema},
  prompt: `Given the following recipe: {{{recipe}}}, determine the most relevant and important nutritional information to display to the user. Consider factors such as common dietary concerns, significant nutrients present, and overall health impact. The nutritional information should be concise and easy to understand.
`,
});

const displayNutritionalInformationFlow = ai.defineFlow(
  {
    name: 'displayNutritionalInformationFlow',
    inputSchema: DisplayNutritionalInformationInputSchema,
    outputSchema: DisplayNutritionalInformationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
