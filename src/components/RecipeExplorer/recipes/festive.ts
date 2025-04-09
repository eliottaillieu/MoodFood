import { Recipe } from '../types';
import { updateRecipeServings } from '../../../utils/updateServings';

const originalRecipes: Recipe[] = [
  {
    id: 'buche-noel',
    title: 'Bûche de Noël aux Marrons',
    difficulty: 'Difficile',
    time: '2h30',
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&q=80&w=800',
    mood: 'Festif',
    moods: ['Gourmand', 'Traditionnel'],
    ingredients: [
      '4 œufs',
      '120g de sucre',
      '120g de farine',
      '1 sachet de levure chimique',
      '500g de crème de marrons',
      '200g de crème fraîche entière',
      '2 cuillères à soupe de cacao en poudre',
      '1 pincée de sel'
    ],
    steps: [
      {
        title: 'Préparation du biscuit',
        description: 'Préchauffer le four à 180°C. Séparer les blancs des jaunes d\'œufs. Battre les jaunes avec le sucre jusqu\'à blanchiment. Incorporer délicatement la farine et la levure tamisées.',
        tip: 'Les ingrédients à température ambiante donnent un meilleur résultat.'
      },
      {
        title: 'Montage des blancs',
        description: 'Monter les blancs en neige ferme avec une pincée de sel. Les incorporer délicatement à la préparation précédente en soulevant la masse pour garder un maximum d\'air.',
        tip: 'Un mouvement en 8 avec la spatule permet de ne pas faire retomber les blancs.'
      },
      {
        title: 'Cuisson du biscuit',
        description: 'Étaler la pâte sur une plaque recouverte de papier cuisson. Cuire 10-12 minutes jusqu\'à ce que le biscuit soit légèrement doré. Dès la sortie du four, rouler le biscuit dans un torchon humide pour lui donner sa forme.',
        tip: 'Le torchon humide évite que le biscuit ne sèche et ne casse.'
      },
      {
        title: 'Montage de la bûche',
        description: 'Mélanger la crème de marrons avec la crème fraîche. Dérouler délicatement le biscuit, le garnir de crème puis le rouler à nouveau. Décorer avec du cacao en poudre tamisé.',
        tip: 'Réserver au frais au moins 2 heures avant de servir pour que la crème se raffermisse.'
      }
    ],
    duration: {
      prep: '30 min',
      cook: '12 min',
      total: '2h30'
    },
    servings: 8
  },
  {
    id: 'foie-gras-maison',
    title: 'Foie Gras Maison',
    difficulty: 'Difficile',
    time: '48h',
    image: 'https://images.unsplash.com/photo-1514910503705-4fa2b7b7598e?auto=format&fit=crop&q=80&w=800',
    mood: 'Festif',
    moods: ['Raffiné', 'Traditionnel'],
    ingredients: [
      '1 foie gras de canard cru (600g)',
      '8g de sel fin',
      '2g de poivre blanc moulu',
      '2 cuillères à soupe de Cognac',
      '1 cuillère à café de sucre',
      'Fleur de sel',
      '1 feuille de laurier'
    ],
    steps: [
      {
        title: 'Préparation du foie',
        description: 'Sortir le foie 2 heures avant pour qu\'il soit à température ambiante. Le dénerver délicatement en suivant les veines. Séparer les deux lobes et retirer les plus gros vaisseaux sanguins.',
        tip: 'Un foie à température ambiante se dénervera plus facilement.'
      },
      {
        title: 'Assaisonnement',
        description: 'Mélanger le sel, le poivre et le sucre. Assaisonner généreusement l\'intérieur des lobes. Arroser de Cognac et masser délicatement pour faire pénétrer les aromates.',
        tip: 'Le sucre aide à équilibrer le goût et à contrebalancer le sel.'
      },
      {
        title: 'Mise en forme',
        description: 'Reformer le foie dans une terrine en tassant légèrement. Placer la feuille de laurier sur le dessus. Couvrir hermétiquement et réfrigérer 24 heures pour que les saveurs se développent.',
        tip: 'La marinade permet aux saveurs de se développer et au foie de se raffermir.'
      },
      {
        title: 'Cuisson',
        description: 'Préchauffer le four à 120°C. Cuire au bain-marie pendant 30-35 minutes. Le foie est cuit quand il atteint 65°C à cœur. Laisser refroidir puis réfrigérer 24h avant de servir.',
        tip: 'La température de cuisson est cruciale : trop haute, le foie fond, trop basse, il reste cru.'
      }
    ],
    duration: {
      prep: '1h',
      cook: '35 min',
      total: '48h'
    },
    servings: 8
  },
  {
    id: 'saumon-gravlax',
    title: 'Saumon Gravlax aux Agrumes',
    difficulty: 'Moyen',
    time: '48h',
    image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80&w=800',
    mood: 'Festif',
    moods: ['Raffiné', 'Healthy'],
    ingredients: [
      '1 filet de saumon frais avec peau (800g)',
      '100g de gros sel',
      '100g de sucre',
      'Zestes de 2 oranges bio',
      'Zestes de 2 citrons bio',
      '1 bouquet d\'aneth frais',
      '2 cuillères à soupe de baies roses',
      'Poivre noir du moulin'
    ],
    steps: [
      {
        title: 'Préparation du saumon',
        description: 'Retirer les arêtes du saumon avec une pince. Mélanger le sel, le sucre et les zestes d\'agrumes. Hacher grossièrement l\'aneth et écraser légèrement les baies roses.',
        tip: 'Un saumon de première qualité et ultra-frais est essentiel pour cette recette.'
      },
      {
        title: 'Marinade',
        description: 'Étaler la moitié du mélange sel-sucre dans un plat, poser le saumon dessus, recouvrir du reste du mélange. Parsemer d\'aneth et de baies roses. Filmer hermétiquement.',
        tip: 'Une répartition uniforme de la marinade assure une cure homogène.'
      },
      {
        title: 'Maturation',
        description: 'Placer un poids sur le saumon et réfrigérer 48h en le retournant toutes les 12h. Le saumon va s\'affaisser et perdre de l\'eau.',
        tip: 'Le temps de maturation est crucial pour la texture finale.'
      },
      {
        title: 'Finition',
        description: 'Rincer rapidement le saumon sous l\'eau froide et le sécher. Trancher finement à 45° juste avant de servir.',
        tip: 'Des tranches fines permettent d\'apprécier toutes les saveurs.'
      }
    ],
    duration: {
      prep: '30 min',
      cook: '0 min',
      total: '48h'
    },
    servings: 8
  }
];

export const recipes: Recipe[] = originalRecipes.map(updateRecipeServings);