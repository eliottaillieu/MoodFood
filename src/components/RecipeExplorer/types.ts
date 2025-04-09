export interface Recipe {
  id: string | number;
  title: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  time: string;
  image: string;
  mood: string;
  moods?: string[];
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
  servings: number;
}