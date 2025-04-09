import { Recipe } from '../types';
import { updateRecipeServings } from '../../../utils/updateServings';

const originalRecipes: Recipe[] = [
  {
    id: 'detox-green-smoothie',
    title: 'Smoothie Vert Détox',
    difficulty: 'Facile',
    time: '10 min',
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80&w=800',
    mood: 'Détox',
    moods: ['Healthy', 'Bien-être'],
    ingredients: [
      '1 pomme verte',
      '1 concombre',
      '2 branches de céleri',
      '1 poignée d\'épinards',
      '1 citron vert',
      '1 morceau de gingembre frais',
      'Eau de coco (selon consistance désirée)'
    ],
    steps: [
      {
        title: 'Préparation des légumes',
        description: 'Laver soigneusement tous les légumes et fruits. Éplucher le gingembre et le râper finement.',
        tip: 'Des ingrédients bio garantissent une détox plus efficace.'
      },
      {
        title: 'Découpe',
        description: 'Couper tous les ingrédients en morceaux adaptés à votre blender.',
        tip: 'Des morceaux plus petits permettent un mixage plus homogène.'
      },
      {
        title: 'Mixage',
        description: 'Placer tous les ingrédients dans le blender. Mixer jusqu\'à obtention d\'une consistance lisse.',
        tip: 'Commencer à vitesse basse puis augmenter progressivement.'
      },
      {
        title: 'Ajustement',
        description: 'Ajouter de l\'eau de coco si nécessaire pour ajuster la texture.',
        tip: 'L\'eau de coco apporte des électrolytes bénéfiques.'
      }
    ],
    duration: {
      prep: '7 min',
      cook: '3 min',
      total: '10 min'
    },
    servings: 2
  },
  {
    id: 'detox-lentil-soup',
    title: 'Soupe Détox aux Lentilles et Curcuma',
    difficulty: 'Moyen',
    time: '30 min',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800',
    mood: 'Détox',
    moods: ['Healthy', 'Réconfort'],
    ingredients: [
      '200g de lentilles corail',
      '1 oignon',
      '2 carottes',
      '2 cm de curcuma frais',
      '1L de bouillon de légumes',
      '1 cuillère à café de cumin',
      'Sel et poivre',
      'Persil frais'
    ],
    steps: [
      {
        title: 'Préparation des légumes',
        description: 'Émincer finement l\'oignon et râper les carottes. Peler et râper le curcuma frais.',
        tip: 'Le curcuma frais est plus efficace que la poudre.'
      },
      {
        title: 'Base aromatique',
        description: 'Faire revenir l\'oignon dans une casserole avec un peu d\'huile d\'olive.',
        tip: 'Une coloration légère apporte plus de saveur.'
      },
      {
        title: 'Cuisson',
        description: 'Ajouter les carottes, le curcuma et les lentilles. Verser le bouillon et cuire 20 minutes à feu doux.',
        tip: 'Les lentilles corail cuisent rapidement et sont faciles à digérer.'
      },
      {
        title: 'Finition',
        description: 'Assaisonner et garnir de persil frais ciselé.',
        tip: 'Le persil apporte une touche de fraîcheur et de chlorophylle.'
      }
    ],
    duration: {
      prep: '10 min',
      cook: '20 min',
      total: '30 min'
    },
    servings: 4
  },
  {
    id: 'detox-quinoa-bowl',
    title: 'Buddha Bowl Détox au Quinoa',
    difficulty: 'Facile',
    time: '25 min',
    image: 'https://images.unsplash.com/photo-1546007600-8c2e5a7f58a4?auto=format&fit=crop&q=80&w=800',
    mood: 'Détox',
    moods: ['Healthy', 'Bien-être'],
    ingredients: [
      '150g de quinoa',
      '1 avocat',
      '100g de pousses d\'épinards',
      '1 betterave crue râpée',
      '2 cuillères à soupe de graines de courge',
      '2 cuillères à soupe d\'huile d\'olive extra vierge',
      'Jus d\'un citron',
      'Sel marin'
    ],
    steps: [
      {
        title: 'Cuisson du quinoa',
        description: 'Rincer le quinoa et le cuire dans deux fois son volume d\'eau pendant 15 minutes.',
        tip: 'Bien rincer le quinoa pour enlever l\'amertume.'
      },
      {
        title: 'Préparation des légumes',
        description: 'Laver les épinards, râper la betterave, couper l\'avocat en tranches.',
        tip: 'Arroser l\'avocat de citron pour éviter qu\'il noircisse.'
      },
      {
        title: 'Assemblage',
        description: 'Disposer le quinoa dans un bol, ajouter les légumes en sections.',
        tip: 'Créer des sections distinctes rend le plat plus appétissant.'
      },
      {
        title: 'Finition',
        description: 'Parsemer de graines de courge, arroser d\'huile d\'olive et de jus de citron.',
        tip: 'L\'huile d\'olive aide à l\'absorption des nutriments.'
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