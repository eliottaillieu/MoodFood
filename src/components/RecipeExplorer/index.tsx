import React, { useState, useMemo } from 'react';
import { ChefHat, Leaf, Zap, Sparkles, Trophy, Heart, Home, Coffee, Battery, History } from 'lucide-react';
import RecipeModal from '../RecipeModal';
import { recipes as antiStressRecipes } from './recipes/antiStress';
import { recipes as boostRecipes } from './recipes/boost';
import { recipes as cocooningRecipes } from './recipes/cocooning';
import { recipes as comfortRecipes } from './recipes/comfort';
import { recipes as detoxRecipes } from './recipes/detox';
import { recipes as energyRecipes } from './recipes/energy';
import { recipes as festiveRecipes } from './recipes/festive';
import { recipes as healthyRecipes } from './recipes/healthy';
import { recipes as nostalgicRecipes } from './recipes/nostalgic';
import { recipes as romanticRecipes } from './recipes/romantic';

export const allRecipes = [
  ...antiStressRecipes,
  ...boostRecipes,
  ...cocooningRecipes,
  ...comfortRecipes,
  ...detoxRecipes,
  ...energyRecipes,
  ...festiveRecipes,
  ...healthyRecipes,
  ...nostalgicRecipes,
  ...romanticRecipes
];

const RecipeExplorer: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<typeof allRecipes[0] | null>(null);
  const [selectedMood, setSelectedMood] = useState<string>('all');

  const moods = [
    { id: 'all', label: 'Tous les moods' },
    { id: 'Réconfort', label: 'Réconfort', icon: ChefHat, description: 'Des plats qui réchauffent le cœur' },
    { id: 'Healthy', label: 'Healthy', icon: Leaf, description: 'Une cuisine saine et équilibrée' },
    { id: 'Énergie', label: 'Repas Énergétiques', icon: Zap, description: 'Des repas complets pour tenir toute la journée' },
    { id: 'Détox', label: 'Détox', icon: Sparkles, description: 'Des plats légers et purifiants' },
    { id: 'Festif', label: 'Festif', icon: Trophy, description: 'Pour les grandes occasions' },
    { id: 'Romantique', label: 'Romantique', icon: Heart, description: 'Des recettes pour les moments à deux' },
    { id: 'Cocooning', label: 'Cocooning', icon: Home, description: 'Le réconfort de la maison' },
    { id: 'Anti-stress', label: 'Anti-stress', icon: Coffee, description: 'Des plats qui apaisent' },
    { id: 'Boost', label: 'Coup de Fouet', icon: Battery, description: 'Des recettes express pour un regain d\'énergie rapide' },
    { id: 'Nostalgie', label: 'Nostalgie', icon: History, description: 'Les recettes de notre enfance' }
  ];

  const filteredRecipes = useMemo(() => {
    if (selectedMood === 'all') return allRecipes;
    return allRecipes.filter(recipe => 
      recipe.mood === selectedMood || recipe.moods?.includes(selectedMood)
    );
  }, [selectedMood]);

  const getMoodIcon = (moodName: string) => {
    const mood = moods.find(m => m.id === moodName);
    return mood?.icon || ChefHat;
  };

  const RecipeCard = ({ recipe }: { recipe: typeof allRecipes[0] }) => {
    const MainIcon = getMoodIcon(recipe.mood);
    
    return (
      <div
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
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 bg-[#FFF8F0] text-[#FFB86B] px-3 py-1 rounded-full text-sm">
              <MainIcon size={16} />
              {recipe.mood}
            </span>
            {recipe.moods?.map((mood) => {
              const AdditionalIcon = getMoodIcon(mood);
              return (
                <span key={mood} className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  <AdditionalIcon size={16} />
                  {mood}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Alors, on mange quoi aujourd'hui ? 😋</h2>
        
        <div className="flex flex-wrap gap-3">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors group relative ${
                selectedMood === mood.id
                  ? 'bg-[#FFB86B] text-white'
                  : 'bg-[#FFF8F0] text-[#FFB86B] hover:bg-[#FFE5E5]'
              }`}
            >
              {mood.icon && <mood.icon size={16} />}
              {mood.label}
              {mood.description && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {mood.description}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
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

export default RecipeExplorer;