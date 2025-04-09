import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, X, ChevronDown, Camera } from 'lucide-react';
import { recipes } from './RecipeExplorer';
import RecipeModal from './RecipeModal';

const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const IngredientSearch = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<typeof recipes[0] | null>(null);
  const [possibleRecipes, setPossibleRecipes] = useState<{
    complete: typeof recipes;
    partial: { recipe: typeof recipes[0]; matchingIngredients: string[] }[];
  }>({ complete: [], partial: [] });
  
  const [showScanner, setShowScanner] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanning, setScanning] = useState(false);
  const [scannedIngredients, setScannedIngredients] = useState<string[]>([]);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    const findMatchingRecipes = () => {
      if (ingredients.length === 0) {
        setPossibleRecipes({ complete: [], partial: [] });
        return;
      }

      const normalizedIngredients = ingredients.map(ing => normalizeText(ing));
      
      const matches = recipes.reduce((acc, recipe) => {
        const normalizedRecipeIngredients = recipe.ingredients.map(ing => normalizeText(ing));
        const normalizedTitle = normalizeText(recipe.title);
        
        const matchingIngredients = normalizedIngredients.filter(ing => 
          normalizedRecipeIngredients.some(recipeIng => recipeIng.includes(ing)) ||
          normalizedTitle.includes(ing)
        );

        if (matchingIngredients.length > 0) {
          if (matchingIngredients.length === normalizedIngredients.length) {
            acc.complete.push(recipe);
          } else {
            acc.partial.push({
              recipe,
              matchingIngredients: ingredients.filter((_, index) => matchingIngredients.includes(normalizedIngredients[index]))
            });
          }
        }

        return acc;
      }, { complete: [] as typeof recipes, partial: [] as { recipe: typeof recipes[0]; matchingIngredients: string[] }[] });

      matches.partial.sort((a, b) => b.matchingIngredients.length - b.matchingIngredients.length);

      setPossibleRecipes(matches);
    };

    findMatchingRecipes();
  }, [ingredients]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      handleAddIngredient();
    }
  };

  const handleAddIngredient = () => {
    if (currentInput.trim() && !ingredients.includes(currentInput.trim())) {
      setIngredients([...ingredients, currentInput.trim()]);
      setCurrentInput('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleRecipeClick = (recipe: typeof recipes[0]) => {
    setSelectedRecipe(recipe);
  };

  const startScanner = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setScanning(true);
      }
    } catch (err) {
      console.error('Erreur d\'accès à la caméra:', err);
      let errorMessage = 'Une erreur est survenue lors de l\'accès à la caméra.';
      
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          errorMessage = 'L\'accès à la caméra a été refusé. Pour utiliser le scanner, veuillez autoriser l\'accès à la caméra dans les paramètres de votre navigateur.';
        } else if (err.name === 'NotFoundError') {
          errorMessage = 'Aucune caméra n\'a été détectée sur votre appareil.';
        } else if (err.name === 'NotReadableError') {
          errorMessage = 'Impossible d\'accéder à votre caméra. Elle est peut-être utilisée par une autre application.';
        }
      }
      
      setCameraError(errorMessage);
      setScanning(false);
    }
  };

  const stopScanner = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setScanning(false);
    }
    setCameraError(null);
  };

  const captureImage = () => {
    const mockDetectedIngredients = ['tomate', 'oignon', 'ail', 'persil'];
    setScannedIngredients(mockDetectedIngredients);
    setIngredients(prev => [...new Set([...prev, ...mockDetectedIngredients])]);
    stopScanner();
    setShowScanner(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">On a quoi dans son frigo ? 🧐</h2>
      
      <div className="mb-8">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 mb-4">
            {ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#FFF8F0] text-[#FFB86B] rounded-full flex items-center gap-2"
              >
                {ingredient}
                <button
                  onClick={() => handleRemoveIngredient(index)}
                  className="hover:bg-[#FFB86B] hover:text-white rounded-full p-1"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={currentInput}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Entrez un ingrédient..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFB86B] focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
            <button
              onClick={() => setShowScanner(true)}
              className="px-4 py-2 bg-[#FFB86B] text-white rounded-lg hover:bg-[#ffa53d] transition-colors flex items-center gap-2"
            >
              <Camera size={20} />
              Scanner
            </button>
            <button
              onClick={handleAddIngredient}
              className="px-4 py-2 bg-[#FFB86B] text-white rounded-lg hover:bg-[#ffa53d] transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Ajouter
            </button>
          </div>
        </div>

        {/* Scanner Modal */}
        {showScanner && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Scanner ton frigo</h3>
                <button
                  onClick={() => {
                    stopScanner();
                    setShowScanner(false);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
                {cameraError ? (
                  <div className="absolute inset-0 flex items-center justify-center p-6 bg-gray-100">
                    <div className="text-center">
                      <p className="text-red-500 mb-4">{cameraError}</p>
                      <button
                        onClick={startScanner}
                        className="px-6 py-3 bg-[#FFB86B] text-white rounded-lg hover:bg-[#ffa53d] transition-colors"
                      >
                        Réessayer
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    {!scanning && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={startScanner}
                          className="px-6 py-3 bg-[#FFB86B] text-white rounded-lg hover:bg-[#ffa53d] transition-colors"
                        >
                          Démarrer la caméra
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {scanning && (
                <button
                  onClick={captureImage}
                  className="w-full px-4 py-2 bg-[#FFB86B] text-white rounded-lg hover:bg-[#ffa53d] transition-colors"
                >
                  Capturer
                </button>
              )}
            </div>
          </div>
        )}

        {(possibleRecipes.complete.length > 0 || possibleRecipes.partial.length > 0) && (
          <div className="mt-8 space-y-6">
            {possibleRecipes.complete.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Ce qu'on te propose !
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {possibleRecipes.complete.map(recipe => (
                    <div
                      key={recipe.id}
                      onClick={() => handleRecipeClick(recipe)}
                      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
                    >
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="text-lg font-semibold mb-2">{recipe.title}</h4>
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>{recipe.difficulty}</span>
                            <span>{recipe.time}</span>
                          </div>
                          <div className="flex justify-end">
                            <span className="text-sm bg-[#FFF8F0] text-[#FFB86B] px-3 py-1 rounded-full">
                              {recipe.mood}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {possibleRecipes.partial.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Ce qu'on te propose !
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {possibleRecipes.partial.map(({ recipe, matchingIngredients }) => (
                    <div
                      key={recipe.id}
                      onClick={() => handleRecipeClick(recipe)}
                      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
                    >
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="text-lg font-semibold mb-2">{recipe.title}</h4>
                        <div className="flex flex-col gap-2">
                          <p className="text-sm text-gray-600">
                            {matchingIngredients.length} ingrédient{matchingIngredients.length > 1 ? 's' : ''} correspondant{matchingIngredients.length > 1 ? 's' : ''}
                          </p>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>{recipe.difficulty}</span>
                            <span>{recipe.time}</span>
                          </div>
                          <div className="flex justify-end">
                            <span className="text-sm bg-[#FFF8F0] text-[#FFB86B] px-3 py-1 rounded-full">
                              {recipe.mood}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
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

export default IngredientSearch;