import { Recipe } from '../types';
import { updateRecipeServings } from '../../../utils/updateServings';

const originalRecipes: Recipe[] = [
  {
    id: 'risotto-saint-jacques',
    title: 'Risotto aux Saint-Jacques et Champagne',
    difficulty: 'Moyen',
    time: '45 min',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800',
    mood: 'Romantique',
    moods: ['Festif', 'Raffiné'],
    ingredients: [
      '300g de riz carnaroli',
      '12 noix de Saint-Jacques',
      '1 échalote',
      '50cl de champagne',
      '1L de bouillon de volaille',
      '50g de parmesan',
      '30g de beurre',
      'Ciboulette fraîche'
    ],
    steps: [
      {
        title: 'Préparation du risotto',
        description: 'Ciseler finement l\'échalote et la faire suer dans une noix de beurre jusqu\'à ce qu\'elle devienne translucide. Ajouter le riz et le faire nacrer pendant 2-3 minutes en remuant constamment.',
        tip: 'Le nacrage est essentiel pour que le riz libère son amidon progressivement.'
      },
      {
        title: 'Cuisson au champagne',
        description: 'Déglacer avec le champagne et laisser réduire presque complètement en remuant. Commencer à ajouter le bouillon chaud louche par louche, en attendant que chaque ajout soit absorbé avant d\'en remettre.',
        tip: 'Le champagne apporte une élégante acidité qui sublime les Saint-Jacques.'
      },
      {
        title: 'Cuisson des Saint-Jacques',
        description: 'Pendant les dernières minutes de cuisson du risotto, saisir les Saint-Jacques dans une poêle très chaude avec un peu de beurre. Cuire 1 minute de chaque côté.',
        tip: 'Les Saint-Jacques doivent être juste saisies pour rester tendres.'
      },
      {
        title: 'Finition',
        description: 'Hors du feu, incorporer le parmesan râpé et le reste de beurre au risotto. Dresser dans des assiettes chaudes, disposer les Saint-Jacques et parsemer de ciboulette.',
        tip: 'Le risotto doit être crémeux et "all\'onda" (faire des vagues).'
      }
    ],
    duration: {
      prep: '15 min',
      cook: '30 min',
      total: '45 min'
    },
    servings: 2
  },
  {
    id: 'souffle-chocolat',
    title: 'Soufflé au Chocolat',
    difficulty: 'Difficile',
    time: '30 min',
    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&q=80&w=800',
    mood: 'Romantique',
    moods: ['Gourmand', 'Raffiné'],
    ingredients: [
      '200g de chocolat noir 70%',
      '4 œufs',
      '30g de beurre',
      '30g de sucre',
      '1 pincée de sel',
      'Beurre et sucre pour les moules'
    ],
    steps: [
      {
        title: 'Préparation des moules',
        description: 'Beurrer généreusement l\'intérieur de deux ramequins à soufflé. Saupoudrer de sucre en faisant tourner les moules pour bien répartir.',
        tip: 'Le beurrage et le sucrage des moules sont essentiels pour la montée du soufflé.'
      },
      {
        title: 'Préparation du chocolat',
        description: 'Faire fondre le chocolat avec le beurre au bain-marie. Remuer délicatement jusqu\'à obtenir un mélange lisse et brillant.',
        tip: 'Un chocolat de qualité donnera un meilleur résultat.'
      },
      {
        title: 'Montage des blancs',
        description: 'Séparer les blancs des jaunes. Monter les blancs en neige avec une pincée de sel. Ajouter le sucre progressivement.',
        tip: 'Les blancs doivent être à température ambiante pour mieux monter.'
      },
      {
        title: 'Assemblage et cuisson',
        description: 'Incorporer les jaunes au chocolat fondu. Ajouter délicatement les blancs en neige. Remplir les moules et enfourner à 180°C pour 12 minutes.',
        tip: 'Ne pas ouvrir le four pendant la cuisson.'
      }
    ],
    duration: {
      prep: '15 min',
      cook: '15 min',
      total: '30 min'
    },
    servings: 2
  },
  {
    id: 'filet-boeuf-rossini',
    title: 'Filet de Bœuf Rossini',
    difficulty: 'Difficile',
    time: '40 min',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    mood: 'Romantique',
    moods: ['Raffiné', 'Festif'],
    ingredients: [
      '2 filets de bœuf de 180g',
      '2 escalopes de foie gras',
      '2 tranches de pain de mie',
      '25cl de fond de veau',
      '10cl de vin de Madère',
      'Beurre clarifié',
      'Fleur de sel',
      'Poivre du moulin'
    ],
    steps: [
      {
        title: 'Préparation des filets',
        description: 'Sortir les filets 1 heure avant. Les sécher et assaisonner généreusement de fleur de sel et de poivre.',
        tip: 'La viande à température permet une meilleure saisie.'
      },
      {
        title: 'Préparation de la sauce',
        description: 'Faire réduire le Madère de moitié. Ajouter le fond de veau et réduire à nouveau jusqu\'à consistance nappante.',
        tip: 'Une bonne réduction donne une sauce plus intense.'
      },
      {
        title: 'Cuisson de la viande',
        description: 'Saisir les filets 3-4 minutes de chaque côté. Laisser reposer sous une feuille d\'aluminium.',
        tip: 'Le temps de repos est crucial pour que les jus se répartissent.'
      },
      {
        title: 'Finition et dressage',
        description: 'Poêler rapidement le foie gras. Dresser en superposant pain, filet et foie gras. Napper de sauce.',
        tip: 'Le foie gras doit être saisi au dernier moment.'
      }
    ],
    duration: {
      prep: '15 min',
      cook: '25 min',
      total: '40 min'
    },
    servings: 2
  }
];

export const recipes: Recipe[] = originalRecipes.map(updateRecipeServings);