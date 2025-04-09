import { Recipe } from '../types';
import { updateRecipeServings } from '../../../utils/updateServings';

const originalRecipes: Recipe[] = [
  {
    id: 'quinoa-buddha-bowl',
    title: 'Buddha Bowl au Quinoa',
    difficulty: 'Facile',
    time: '35 min',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    mood: 'Healthy',
    moods: ['Détox', 'Énergie'],
    ingredients: [
      '200g de quinoa',
      '1 patate douce',
      '2 poignées de chou kale',
      '1 boîte de pois chiches',
      '1 avocat',
      '2 cuillères à soupe de tahini',
      '1 citron',
      '2 cuillères à soupe d\'huile d\'olive'
    ],
    steps: [
      {
        title: 'Préparation du quinoa',
        description: 'Rincer le quinoa et le cuire selon les instructions du paquet.',
        tip: 'Bien rincer le quinoa pour enlever l\'amertume.'
      },
      {
        title: 'Cuisson des légumes',
        description: 'Couper la patate douce en cubes et la rôtir au four à 200°C pendant 20 minutes.',
        tip: 'Des cubes de taille égale pour une cuisson uniforme.'
      },
      {
        title: 'Préparation du kale',
        description: 'Masser le kale avec de l\'huile d\'olive et du jus de citron.',
        tip: 'Le massage attendrit les feuilles de kale.'
      },
      {
        title: 'Assemblage',
        description: 'Disposer tous les ingrédients dans un bol et napper de sauce tahini.',
        tip: 'Créer des sections distinctes pour un bel effet visuel.'
      }
    ],
    duration: {
      prep: '15 min',
      cook: '20 min',
      total: '35 min'
    },
    servings: 2
  },
  {
    id: 'grilled-salmon-asparagus',
    title: 'Saumon Grillé aux Asperges',
    difficulty: 'Moyen',
    time: '25 min',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    mood: 'Healthy',
    moods: ['Protéiné', 'Léger'],
    ingredients: [
      '2 pavés de saumon',
      '1 botte d\'asperges',
      '1 citron',
      '2 cuillères à soupe d\'huile d\'olive',
      '2 cuillères à soupe d\'aneth frais',
      '2 gousses d\'ail',
      'Sel et poivre'
    ],
    steps: [
      {
        title: 'Préparation du saumon',
        description: 'Assaisonner les pavés de saumon d\'huile d\'olive, sel et poivre.',
        tip: 'Sortir le saumon du réfrigérateur 15 minutes avant la cuisson.'
      },
      {
        title: 'Préparation des asperges',
        description: 'Laver les asperges et couper les bases dures.',
        tip: 'Les asperges doivent être croquantes à la fin de la cuisson.'
      },
      {
        title: 'Cuisson',
        description: 'Griller le saumon 4-5 minutes de chaque côté avec les asperges.',
        tip: 'Le saumon est cuit quand il se défait facilement à la fourchette.'
      },
      {
        title: 'Finition',
        description: 'Garnir d\'aneth frais et de quartiers de citron.',
        tip: 'Un filet d\'huile d\'olive en finition apporte du brillant.'
      }
    ],
    duration: {
      prep: '10 min',
      cook: '15 min',
      total: '25 min'
    },
    servings: 2
  }
];

export const recipes: Recipe[] = originalRecipes.map(updateRecipeServings);