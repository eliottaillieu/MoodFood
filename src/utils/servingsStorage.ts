const SERVINGS_STORAGE_KEY = 'recipe_servings';
const LAST_VISIT_KEY = 'last_visit';

interface ServingsStorage {
  [recipeId: number]: number;
}

function shouldResetServings(): boolean {
  const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
  const now = new Date().getTime();
  
  // Si c'est la première visite ou si la dernière visite date de plus de 30 minutes
  if (!lastVisit || now - parseInt(lastVisit) > 30 * 60 * 1000) {
    localStorage.setItem(LAST_VISIT_KEY, now.toString());
    return true;
  }
  
  // Mettre à jour le timestamp de la dernière visite
  localStorage.setItem(LAST_VISIT_KEY, now.toString());
  return false;
}

export function getStoredServings(recipeId: number): number | null {
  try {
    // Vérifier si on doit réinitialiser les portions
    if (shouldResetServings()) {
      localStorage.removeItem(SERVINGS_STORAGE_KEY);
      return null;
    }

    const storage = localStorage.getItem(SERVINGS_STORAGE_KEY);
    if (!storage) return null;

    const servings: ServingsStorage = JSON.parse(storage);
    return servings[recipeId] || null;
  } catch {
    return null;
  }
}

export function storeServings(recipeId: number, servings: number): void {
  try {
    const storage = localStorage.getItem(SERVINGS_STORAGE_KEY);
    const servingsData: ServingsStorage = storage ? JSON.parse(storage) : {};
    
    servingsData[recipeId] = servings;
    localStorage.setItem(SERVINGS_STORAGE_KEY, JSON.stringify(servingsData));
  } catch {
    // En cas d'erreur avec localStorage, on continue silencieusement
    console.warn('Impossible de sauvegarder les portions dans le localStorage');
  }
}