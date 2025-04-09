import { Recipe } from '../components/RecipeExplorer/types';
import { adjustQuantity } from './recipeUtils';

export function updateRecipeServings(recipe: Recipe): Recipe {
  if (!recipe || recipe.servings === 4) return recipe;

  const originalServings = recipe.servings;
  const newServings = 4;

  return {
    ...recipe,
    ingredients: recipe.ingredients?.map(ingredient => 
      ingredient !== null && ingredient !== undefined ? 
      adjustQuantity(ingredient, originalServings, newServings) : 
      ''
    ) || [],
    servings: newServings
  };
}