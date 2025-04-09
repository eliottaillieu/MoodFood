import React, { useState, useEffect, useRef } from 'react';
import { X, Star } from 'lucide-react';
import ServingsAdjuster from './ServingsAdjuster';
import { adjustQuantity, adjustCookingTime, getEquipmentTips } from '../utils/recipeUtils';
import { getStoredServings, storeServings } from '../utils/servingsStorage';

interface RecipeModalProps {
  recipe: {
    id: number | string;
    title: string;
    image: string;
    ingredients: string[];
    steps: {
      title: string;
      description: string;
      tip?: string;
    }[];
    duration: {
      prep: string;
      cook: string;
      total: string;
    };
    difficulty: string;
    servings: number;
  };
  onClose: () => void;
}

const RecipeModal = ({ recipe, onClose }: RecipeModalProps) => {
  if (!recipe) return null;

  const [currentServings, setCurrentServings] = useState(getStoredServings(recipe.id) || recipe.servings);
  const [isFavorite, setIsFavorite] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const equipmentTips = getEquipmentTips(currentServings);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('recipe_favorites') || '[]');
    setIsFavorite(favorites.includes(recipe.id));
  }, [recipe.id]);

  useEffect(() => {
    storeServings(recipe.id, currentServings);
  }, [recipe.id, currentServings]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('recipe_favorites') || '[]');
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter((id: number | string) => id !== recipe.id);
    } else {
      newFavorites = [...favorites, recipe.id];
    }
    localStorage.setItem('recipe_favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const adjustedIngredients = recipe.ingredients?.map(ingredient =>
    adjustQuantity(ingredient, recipe.servings, currentServings)
  ) || [];

  const adjustedDuration = {
    prep: adjustCookingTime(recipe.duration?.prep || '0 min', recipe.servings, currentServings),
    cook: adjustCookingTime(recipe.duration?.cook || '0 min', recipe.servings, currentServings),
    total: adjustCookingTime(recipe.duration?.total || '0 min', recipe.servings, currentServings)
  };

  const getPreparationType = () => {
    const title = (recipe.title || '').toLowerCase();
    const cookTime = parseInt(recipe.duration?.cook || '0');

    if (title.includes('smoothie') || title.includes('jus')) {
      return 'Mixage';
    } else if (title.includes('tisane') || title.includes('infusion') || title.includes('thé')) {
      return 'Infusion';
    } else if (title.includes('chocolat chaud')) {
      return 'Chauffe';
    } else if (cookTime === 0) {
      return 'Assemblage';
    }
    return 'Cuisson';
  };

  const preparationType = getPreparationType();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold">{recipe.title}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFavorite}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Star
                size={24}
                className={isFavorite ? 'fill-[#FFB86B] text-[#FFB86B]' : 'text-gray-400'}
              />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Nombre de portions</h3>
              <ServingsAdjuster
                servings={currentServings}
                onChange={setCurrentServings}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-[#FFF8F0] rounded-lg">
                <p className="text-[#FFB86B] font-semibold">Préparation</p>
                <p className="text-gray-600">{adjustedDuration.prep}</p>
              </div>
              <div className="text-center p-3 bg-[#FFF8F0] rounded-lg">
                <p className="text-[#FFB86B] font-semibold">{preparationType}</p>
                <p className="text-gray-600">{adjustedDuration.cook}</p>
              </div>
              <div className="text-center p-3 bg-[#FFF8F0] rounded-lg">
                <p className="text-[#FFB86B] font-semibold">Total</p>
                <p className="text-gray-600">{adjustedDuration.total}</p>
              </div>
            </div>
          </div>

          {equipmentTips.length > 0 && (
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
              <h4 className="font-semibold text-yellow-800 mb-2">Conseils pour grande quantité :</h4>
              <ul className="list-disc list-inside space-y-1">
                {equipmentTips.map((tip, index) => (
                  <li key={index} className="text-yellow-700">{tip}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Ingrédients</h3>
            <ul className="grid grid-cols-2 gap-3">
              {adjustedIngredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg"
                >
                  <span className="w-2 h-2 bg-[#FFB86B] rounded-full"></span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Étapes</h3>
            <div className="space-y-6">
              {(recipe.steps || []).map((step, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-[#FFB86B] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <h4 className="font-semibold">{step.title}</h4>
                  </div>
                  <p className="text-gray-600 ml-11">{step.description}</p>
                  {step.tip && (
                    <div className="ml-11 mt-3 bg-[#FFF8F0] p-3 rounded-lg">
                      <p className="text-[#FFB86B] font-medium">Astuce du chef</p>
                      <p className="text-gray-600">{step.tip}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;