import { Recipe } from '../types';
import { updateRecipeServings } from '../../../utils/updateServings';

const originalRecipes: Recipe[] = [
  {
    id: 'energy-smoothie-bowl',
    title: 'Smoothie Bowl Énergisant',
    difficulty: 'Facile',
    time: '10 min',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=800',
    mood: 'Énergie',
    moods: ['Healthy', 'Boost'],
    ingredients: [
      '1 banane congelée',
      '150g de fruits rouges congelés',
      '1 cuillère à soupe de poudre d\'açaï',
      '1 cuillère à soupe de graines de chia',
      '200ml de lait d\'amande',
      '2 cuillères à soupe de granola',
      'Fruits frais pour la garniture',
      'Noix de coco râpée'
    ],
    steps: [
      {
        title: 'Préparation des ingrédients',
        description: 'Sortir les fruits congelés quelques minutes avant pour qu\'ils soient plus faciles à mixer.',
        tip: 'Des fruits bien congelés donneront une texture plus crémeuse.'
      },
      {
        title: 'Mixage',
        description: 'Dans un blender puissant, mixer la banane, les fruits rouges, la poudre d\'açaï et le lait d\'amande jusqu\'à obtenir une consistance crémeuse.',
        tip: 'Ajouter le lait progressivement pour contrôler la texture.'
      },
      {
        title: 'Ajout des super-aliments',
        description: 'Incorporer les graines de chia en mixant brièvement.',
        tip: 'Les graines de chia apportent des oméga-3 et des fibres.'
      },
      {
        title: 'Dressage',
        description: 'Verser dans un bol et garnir de granola, fruits frais et noix de coco râpée.',
        tip: 'Créer un beau dressage pour un petit-déjeuner plus appétissant.'
      }
    ],
    duration: {
      prep: '10 min',
      cook: '0 min',
      total: '10 min'
    },
    servings: 1
  }
];

export const recipes: Recipe[] = originalRecipes.map(updateRecipeServings);