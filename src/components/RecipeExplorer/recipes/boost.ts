import { Recipe } from '../types';
import { updateRecipeServings } from '../../../utils/updateServings';

const originalRecipes: Recipe[] = [
  {
    id: 'boost-smoothie-banane-cafe',
    title: 'Smoothie Banane-Café Énergisant',
    difficulty: 'Facile',
    time: '10 min',
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&q=80&w=800',
    mood: 'Boost',
    moods: ['Énergie', 'Healthy'],
    ingredients: [
      '1 banane mûre',
      '200ml de café froid',
      '120ml de lait d\'amande',
      '1 cuillère à café de miel',
      '1 pincée de cannelle',
      'Glaçons'
    ],
    steps: [
      {
        title: 'Préparation du café',
        description: 'Préparer le café et le laisser refroidir complètement.',
        tip: 'Un café froid donne une meilleure texture au smoothie.'
      },
      {
        title: 'Mixage',
        description: 'Mixer tous les ingrédients jusqu\'à obtenir une consistance lisse.',
        tip: 'Ajouter les glaçons en dernier pour une texture plus onctueuse.'
      },
      {
        title: 'Ajustement',
        description: 'Goûter et ajuster la douceur avec du miel si nécessaire.',
        tip: 'Le miel naturel apporte une énergie durable.'
      },
      {
        title: 'Service',
        description: 'Servir immédiatement dans un grand verre.',
        tip: 'Décorer d\'une pincée de cannelle pour plus de saveur.'
      }
    ],
    duration: {
      prep: '5 min',
      cook: '5 min',
      total: '10 min'
    },
    servings: 1
  }
];

export const recipes: Recipe[] = originalRecipes.map(updateRecipeServings);