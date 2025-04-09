import React, { useState, useEffect } from 'react';
import { Cast as BreakfastIcon, Pizza, Soup, Salad, IceCream, Cake, Wine, FileLock as Cocktail } from 'lucide-react';
import { allRecipes } from './RecipeExplorer';
import RecipeModal from './RecipeModal';

const categories = [
  { id: 'petit-dejeuner', label: 'Petit-déjeuner', icon: BreakfastIcon },
  { id: 'plats-principaux', label: 'Plats Principaux', icon: Pizza },
  { id: 'soupes', label: 'Soupes & Veloutés', icon: Soup },
  { id: 'salades', label: 'Salades', icon: Salad },
  { id: 'snacks', label: 'En-cas & Goûters', icon: IceCream },
  { id: 'desserts', label: 'Desserts', icon: Cake },
  { id: 'boissons', label: 'Boissons', icon: Wine },
  { id: 'cocktails', label: 'Cocktails & Mocktails', icon: Cocktail }
];

const Favorites: React.FC = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<typeof allRecipes>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<typeof allRecipes[0] | null>(null);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('recipe_favorites') || '[]');
    const recipes = allRecipes.filter(recipe => favorites.includes(recipe.id));
    setFavoriteRecipes(recipes);
  }, []);

  if (favoriteRecipes.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Aucune recette favorite</h2>
        <p className="text-gray-600">
          Cliquez sur l'étoile dans une recette pour l'ajouter à vos favoris !
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-6">Mes Recettes Favorites</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteRecipes.map(recipe => (
          <div
            key={recipe.id}
            onClick={() => setSelectedRecipe(recipe)}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{recipe.difficulty}</span>
                <span>{recipe.time}</span>
              </div>
              <div className="mt-2">
                <span className="inline-block bg-[#FFF8F0] text-[#FFB86B] px-3 py-1 rounded-full text-sm">
                  {recipe.mood}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
};

export default Favorites;