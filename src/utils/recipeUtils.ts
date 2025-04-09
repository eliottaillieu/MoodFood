// Fonction pour ajuster les quantités en fonction du nombre de portions
export const adjustQuantity = (ingredient: string | number | null | undefined, originalServings: number, newServings: number): string => {
  // Ensure ingredient is a string
  const ingredientStr = String(ingredient || '');

  // Liste des ingrédients qui ne peuvent pas être fractionnés
  const nonDivisibleIngredients = [
    'œuf', 'oeuf', 'citron', 'orange', 'pomme', 'poire', 'banane', 'gousse',
    'feuille', 'sachet', 'bouquet', 'botte', 'branche', 'tête', 'pincée',
    'carotte', 'oignon', 'poireau', 'courgette', 'aubergine', 'poivron'
  ];

  // Regex pour détecter les quantités avec différents formats
  const quantityRegex = /^(\d+(?:[,.]\d+)?(?:\/\d+)?)\s*(?:(g|kg|ml|l|cl|cuillères?(?:\sà\s(?:soupe|café|thé))?|pincées?|grammes?|litres?|centilitres?|millilitres?)\s+)?(.+)$/i;
  
  const match = ingredientStr.trim().match(quantityRegex);
  if (!match) return ingredientStr;

  const [, quantity, unit = '', rest = ''] = match;

  // Convertir la quantité en nombre
  let numericQuantity: number;
  if (quantity.includes('/')) {
    const [num, denom] = quantity.split('/');
    numericQuantity = parseFloat(num) / parseFloat(denom);
  } else {
    numericQuantity = parseFloat(quantity.replace(',', '.'));
  }

  if (isNaN(numericQuantity)) return ingredientStr;

  // Calculer la nouvelle quantité
  let newQuantity = (numericQuantity * newServings) / originalServings;

  // Vérifier si l'ingrédient est non divisible
  const isNonDivisible = nonDivisibleIngredients.some(item => 
    rest.toLowerCase().includes(item.toLowerCase())
  );

  // Appliquer les règles d'arrondissement
  if (isNonDivisible) {
    newQuantity = Math.max(1, Math.round(newQuantity));
  } else {
    // Arrondir aux demi-unités pour les nombres entre 1 et 10
    if (newQuantity <= 10) {
      newQuantity = Math.round(newQuantity * 2) / 2;
    } else {
      newQuantity = Math.round(newQuantity);
    }
  }

  // Formater la quantité
  let formattedQuantity = newQuantity.toString();

  // Table de conversion pour les fractions courantes
  const fractionTable: { [key: string]: string } = {
    '0.5': 'un demi',
    '1.5': 'un et demi',
    '2.5': 'deux et demi',
    '3.5': 'trois et demi',
    '4.5': 'quatre et demi',
    '5.5': 'cinq et demi',
    '6.5': 'six et demi',
    '7.5': 'sept et demi',
    '8.5': 'huit et demi',
    '9.5': 'neuf et demi'
  };

  // Convertir en texte si possible
  if (fractionTable[formattedQuantity]) {
    formattedQuantity = fractionTable[formattedQuantity];
  } else if (formattedQuantity.endsWith('.0')) {
    formattedQuantity = formattedQuantity.slice(0, -2);
  }

  // Gérer le pluriel des unités et des ingrédients
  let formattedUnit = unit;
  let formattedRest = rest;

  // Gérer les pluriels des unités de mesure
  if (unit) {
    if (newQuantity > 1) {
      formattedUnit = unit
        .replace(/^(cuillère|pincée|gramme|litre|centilitre|millilitre)(?!s)/, '$1s')
        .replace(/à (soupe|café|thé)/, 'à $1');
    } else {
      formattedUnit = unit
        .replace(/^(cuillères|pincées|grammes|litres|centilitres|millilitres)/, (match) => match.slice(0, -1))
        .replace(/à (soupe|café|thé)/, 'à $1');
    }
  }

  // Gérer les pluriels des ingrédients non divisibles
  if (isNonDivisible) {
    if (newQuantity > 1) {
      formattedRest = rest
        .replace(/^(citron|orange|pomme|poire|banane|gousse|feuille|carotte|oignon|poireau|courgette|aubergine|poivron)(?!s)/, '$1s');
    } else {
      formattedRest = rest
        .replace(/^(citrons|oranges|pommes|poires|bananes|gousses|feuilles|carottes|oignons|poireaux|courgettes|aubergines|poivrons)/, (match) => match.slice(0, -1));
    }
  }

  // Assembler la chaîne finale
  const parts = [formattedQuantity];
  if (formattedUnit) parts.push(formattedUnit);
  if (formattedRest) parts.push(formattedRest);

  return parts.join(' ').trim();
};

// Fonction pour ajuster les temps de cuisson
export const adjustCookingTime = (time: string, originalServings: number, newServings: number): string => {
  const regex = /(\d+)(\s*)(min|h|heure[s]?)/i;
  const match = time.match(regex);

  if (!match) return time;

  const [, originalTime, space, unit] = match;
  const timeValue = parseInt(originalTime);

  // Ajuster le temps seulement si le nombre de portions est significativement différent
  if (newServings > originalServings * 2) {
    const factor = Math.sqrt(newServings / originalServings); // Utiliser la racine carrée pour une augmentation plus modérée
    const newTime = Math.round(timeValue * factor);
    return `${newTime}${space}${unit}`;
  }

  return time;
};

// Fonction pour détecter le type de recette
const getRecipeType = (recipe: { title: string; ingredients: string[]; steps: { description: string }[] }): string[] => {
  const types: string[] = [];
  const titleLower = recipe.title.toLowerCase();
  const ingredientsLower = recipe.ingredients.join(' ').toLowerCase();
  const stepsLower = recipe.steps.map(s => s.description).join(' ').toLowerCase();
  const fullText = `${titleLower} ${ingredientsLower} ${stepsLower}`;

  // Détection des types de recettes
  if (fullText.includes('salade') || fullText.includes('crudités')) {
    types.push('cold');
  }
  if (fullText.includes('smoothie') || fullText.includes('jus') || fullText.includes('boisson')) {
    types.push('drink');
  }
  if (fullText.includes('four') || fullText.includes('enfourner')) {
    types.push('baking');
  }
  if (fullText.includes('bouillir') || fullText.includes('mijoter')) {
    types.push('cooking');
  }
  if (fullText.includes('pâte') || fullText.includes('pétrir')) {
    types.push('dough');
  }
  if (fullText.includes('mixer') || fullText.includes('blender')) {
    types.push('blending');
  }

  return types;
};

// Fonction pour générer des conseils d'ustensiles
export const getEquipmentTips = (servings: number, recipe?: { title: string; ingredients: string[]; steps: { description: string }[] }): string[] => {
  const tips: string[] = [];

  // Si pas de recette fournie, retourner les conseils généraux
  if (!recipe) {
    if (servings > 8) {
      tips.push('Prévoyez des ustensiles plus grands pour cette quantité');
    }
    return tips;
  }

  const recipeTypes = getRecipeType(recipe);
  const isLargeQuantity = servings > 8;
  const isVeryLargeQuantity = servings > 20;

  // Conseils spécifiques selon le type de recette
  if (recipeTypes.includes('cold')) {
    if (isLargeQuantity) {
      tips.push('Prévoyez un grand saladier pour le mélange');
      tips.push('Utilisez un économe ou une mandoline pour gagner du temps sur la préparation des légumes');
    }
  }

  if (recipeTypes.includes('drink')) {
    if (isLargeQuantity) {
      tips.push('Mixez en plusieurs fois si nécessaire');
      tips.push('Utilisez un blender de grande capacité');
    }
  }

  if (recipeTypes.includes('baking')) {
    if (isLargeQuantity) {
      tips.push('Utilisez plusieurs plats de cuisson');
      tips.push('Vérifiez que votre four peut contenir tous les plats');
    }
    if (isVeryLargeQuantity) {
      tips.push('Faites la cuisson en plusieurs fournées');
    }
  }

  if (recipeTypes.includes('cooking')) {
    if (isLargeQuantity) {
      tips.push('Utilisez une grande marmite ou plusieurs casseroles');
      if (isVeryLargeQuantity) {
        tips.push('Un thermomètre de cuisson est recommandé pour assurer une cuisson uniforme');
      }
    }
  }

  if (recipeTypes.includes('dough')) {
    if (isLargeQuantity) {
      tips.push('Un robot pâtissier peut faciliter le pétrissage de cette quantité');
      if (isVeryLargeQuantity) {
        tips.push('Divisez la pâte en plusieurs portions pour un pétrissage plus facile');
      }
    }
  }

  if (recipeTypes.includes('blending')) {
    if (isLargeQuantity) {
      tips.push('Procédez en plusieurs fois pour ne pas surcharger votre blender');
      if (isVeryLargeQuantity) {
        tips.push('Un blender professionnel serait plus adapté pour cette quantité');
      }
    }
  }

  return tips;
};