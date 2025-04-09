// Fonction pour valider la pertinence des images de recettes
export function validateRecipeImage(recipe: string, imageUrl: string): boolean {
  // Liste des mots-clés pertinents pour chaque type de plat
  const keywordMap: { [key: string]: string[] } = {
    'gratin': ['gratin', 'casserole', 'baked', 'cheese', 'potato'],
    'carbonara': ['pasta', 'spaghetti', 'carbonara', 'italian'],
    'smoothie': ['smoothie', 'bowl', 'fruit', 'berries'],
    'granola': ['granola', 'cereal', 'breakfast', 'oats'],
    'soup': ['soup', 'bowl', 'vegetable', 'broth'],
    'chocolate': ['chocolate', 'hot chocolate', 'cocoa', 'drink'],
    'cookie': ['cookie', 'biscuit', 'baked'],
    'pancake': ['pancake', 'breakfast', 'stack'],
    'toast': ['toast', 'bread', 'avocado', 'breakfast'],
    'bowl': ['bowl', 'buddha bowl', 'rice bowl', 'food bowl'],
    'salad': ['salad', 'fresh', 'vegetable', 'healthy']
  };

  // Extraire les mots-clés de l'URL de l'image
  const imageKeywords = imageUrl.toLowerCase().split(/[-_]/).join(' ');
  
  // Extraire les mots-clés du nom de la recette
  const recipeKeywords = recipe.toLowerCase().split(' ');

  // Vérifier la correspondance des mots-clés
  for (const word of recipeKeywords) {
    if (keywordMap[word]) {
      const relevantKeywords = keywordMap[word];
      if (!relevantKeywords.some(keyword => imageKeywords.includes(keyword))) {
        return false;
      }
    }
  }

  return true;
}

// Fonction pour obtenir une image validée pour une recette
export function getValidatedImage(recipe: string, defaultImage: string): string {
  const imageMap: { [key: string]: string } = {
    'Gratin Dauphinois': 'https://images.unsplash.com/photo-1601063458289-77247ba485ec?auto=format&fit=crop&q=80&w=800',
    'Pâtes Carbonara': 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800',
    'Granola Énergétique': 'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?auto=format&fit=crop&q=80&w=800',
    'Smoothie Bowl': 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?auto=format&fit=crop&q=80&w=800',
    'Chocolat Chaud': 'https://images.unsplash.com/photo-1517578239113-b03992dcdd25?auto=format&fit=crop&q=80&w=800',
    'Cookies': 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800',
    'Buddha Bowl': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    'Pancakes': 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80&w=800',
    'Toast Avocat': 'https://images.unsplash.com/photo-1603046891744-1f76eb10aec3?auto=format&fit=crop&q=80&w=800',
    'Soupe': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800'
  };

  // Vérifier si nous avons une image spécifique pour cette recette
  const specificImage = imageMap[recipe];
  if (specificImage && validateRecipeImage(recipe, specificImage)) {
    return specificImage;
  }

  // Si l'image par défaut est valide, l'utiliser
  if (validateRecipeImage(recipe, defaultImage)) {
    return defaultImage;
  }

  // Sinon, retourner une image générique de nourriture
  return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800';
}