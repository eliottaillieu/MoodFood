import { Recipe } from '../components/RecipeExplorer/types';

// Taille maximale du cache par catégorie (ajustable selon les besoins)
const MAX_CACHE_SIZE = 100;

// Structure pour stocker les recettes en mémoire
class RecipeCache {
  private cache: Map<string, Recipe[]>;
  private accessCount: Map<string, number>;
  
  constructor() {
    this.cache = new Map();
    this.accessCount = new Map();
  }

  // Ajouter une recette à une catégorie
  add(category: string, recipe: Recipe): void {
    if (!this.cache.has(category)) {
      this.cache.set(category, []);
      this.accessCount.set(category, 0);
    }

    const recipes = this.cache.get(category)!;
    
    // Vérifier si la recette existe déjà
    const existingIndex = recipes.findIndex(r => r.id === recipe.id);
    if (existingIndex !== -1) {
      // Mettre à jour la recette existante
      recipes[existingIndex] = recipe;
      return;
    }

    // Ajouter la nouvelle recette
    recipes.push(recipe);

    // Si le cache dépasse la taille maximale, supprimer les recettes les moins accédées
    if (recipes.length > MAX_CACHE_SIZE) {
      const leastAccessed = [...recipes]
        .sort((a, b) => (this.accessCount.get(a.id) || 0) - (this.accessCount.get(b.id) || 0))
        .slice(0, recipes.length - MAX_CACHE_SIZE);

      leastAccessed.forEach(recipe => {
        const index = recipes.findIndex(r => r.id === recipe.id);
        if (index !== -1) {
          recipes.splice(index, 1);
          this.accessCount.delete(recipe.id);
        }
      });
    }
  }

  // Récupérer toutes les recettes d'une catégorie
  get(category: string): Recipe[] {
    const recipes = this.cache.get(category) || [];
    
    // Incrémenter le compteur d'accès pour chaque recette
    recipes.forEach(recipe => {
      const count = this.accessCount.get(recipe.id) || 0;
      this.accessCount.set(recipe.id, count + 1);
    });

    return recipes;
  }

  // Vérifier si une catégorie existe
  has(category: string): boolean {
    return this.cache.has(category);
  }

  // Supprimer une recette
  remove(category: string, recipeId: string | number): void {
    const recipes = this.cache.get(category);
    if (recipes) {
      const index = recipes.findIndex(r => r.id === recipeId);
      if (index !== -1) {
        recipes.splice(index, 1);
        this.accessCount.delete(recipeId.toString());
      }
    }
  }

  // Vider le cache d'une catégorie
  clear(category: string): void {
    this.cache.delete(category);
    // Nettoyer les compteurs d'accès associés
    for (const [id] of this.accessCount) {
      if (id.startsWith(category)) {
        this.accessCount.delete(id);
      }
    }
  }

  // Vider tout le cache
  clearAll(): void {
    this.cache.clear();
    this.accessCount.clear();
  }
}

// Instance unique du gestionnaire de recettes
export const recipeManager = new RecipeCache();

// Fonction utilitaire pour charger des recettes par lots
export const batchLoadRecipes = (category: string, recipes: Recipe[]): void => {
  recipes.forEach(recipe => recipeManager.add(category, recipe));
};

// Fonction pour récupérer des recettes avec pagination
export const getPaginatedRecipes = (
  category: string,
  page: number = 1,
  pageSize: number = 10
): { recipes: Recipe[]; total: number } => {
  const allRecipes = recipeManager.get(category);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  return {
    recipes: allRecipes.slice(start, end),
    total: allRecipes.length
  };
};

// Fonction pour rechercher des recettes
export const searchRecipes = (
  query: string,
  categories: string[] = []
): Recipe[] => {
  const searchTerms = query.toLowerCase().split(' ');
  const results: Recipe[] = [];
  
  const searchInCategory = (category: string) => {
    const recipes = recipeManager.get(category);
    recipes.forEach(recipe => {
      const searchText = `
        ${recipe.title.toLowerCase()}
        ${recipe.ingredients.join(' ').toLowerCase()}
        ${recipe.mood.toLowerCase()}
        ${recipe.moods?.join(' ').toLowerCase() || ''}
      `;
      
      if (searchTerms.every(term => searchText.includes(term))) {
        results.push(recipe);
      }
    });
  };

  if (categories.length > 0) {
    categories.forEach(searchInCategory);
  } else {
    // Rechercher dans toutes les catégories si aucune n'est spécifiée
    for (const category of ['comfort', 'healthy', 'energy', 'detox', 'festive', 'romantic', 'cocooning', 'antiStress', 'boost', 'nostalgic']) {
      searchInCategory(category);
    }
  }

  return [...new Set(results)]; // Éliminer les doublons
};

// Fonction pour obtenir des suggestions de recettes similaires
export const getSimilarRecipes = (recipe: Recipe, limit: number = 3): Recipe[] => {
  const allRecipes: Recipe[] = [];
  const mainMood = recipe.mood.toLowerCase();
  const additionalMoods = recipe.moods?.map(m => m.toLowerCase()) || [];

  // Collecter toutes les recettes
  for (const category of ['comfort', 'healthy', 'energy', 'detox', 'festive', 'romantic', 'cocooning', 'antiStress', 'boost', 'nostalgic']) {
    allRecipes.push(...recipeManager.get(category));
  }

  // Calculer un score de similarité pour chaque recette
  const scoredRecipes = allRecipes
    .filter(r => r.id !== recipe.id) // Exclure la recette actuelle
    .map(r => {
      let score = 0;
      
      // Points pour le même mood principal
      if (r.mood.toLowerCase() === mainMood) score += 3;
      
      // Points pour les moods additionnels en commun
      const rMoods = r.moods?.map(m => m.toLowerCase()) || [];
      score += additionalMoods.filter(m => rMoods.includes(m)).length;

      // Points pour les ingrédients en commun
      const commonIngredients = recipe.ingredients.filter(ing => 
        r.ingredients.some(rIng => rIng.toLowerCase().includes(ing.toLowerCase()))
      ).length;
      score += commonIngredients * 0.5;

      return { recipe: r, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.recipe);

  return scoredRecipes;
};