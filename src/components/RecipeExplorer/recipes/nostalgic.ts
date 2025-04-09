import { Recipe } from '../types';
import { updateRecipeServings } from '../../../utils/updateServings';

const originalRecipes: Recipe[] = [
  {
    id: 901,
    title: 'Gâteau au Yaourt de Grand-Mère',
    difficulty: 'Facile',
    time: '45 min',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=800',
    mood: 'Nostalgie',
    moods: ['Cocooning', 'Réconfort'],
    ingredients: [
      '1 pot de yaourt nature',
      '3 pots de farine',
      '2 pots de sucre',
      '3 œufs',
      '1/2 pot d\'huile',
      '1 sachet de levure',
      '1 sachet de sucre vanillé',
      'Zeste de citron'
    ],
    steps: [
      {
        title: 'Préparation de base',
        description: 'Verser le yaourt dans un grand saladier. Utiliser le pot de yaourt vide comme mesure pour tous les autres ingrédients. Cette méthode traditionnelle permet de ne pas avoir besoin de balance. Conserver le pot pour les mesures suivantes.',
        tip: 'Un yaourt nature classique de 125g est la mesure parfaite.'
      },
      {
        title: 'Mélange des ingrédients',
        description: 'Ajouter successivement les œufs un à un en mélangeant bien entre chaque ajout. Incorporer le sucre et le sucre vanillé, puis l\'huile. Mélanger énergiquement à la cuillère en bois pour obtenir une préparation homogène et légèrement mousseuse.',
        tip: 'La cuillère en bois est l\'ustensile traditionnel idéal pour ce gâteau.'
      },
      {
        title: 'Incorporation de la farine',
        description: 'Tamiser la farine avec la levure au-dessus du mélange. Incorporer délicatement en soulevant la pâte pour garder son moelleux. Ajouter le zeste de citron râpé qui apportera une touche de fraîcheur. La pâte doit être lisse et sans grumeaux.',
        tip: 'Le tamisage de la farine garantit un gâteau plus léger.'
      },
      {
        title: 'Cuisson',
        description: 'Verser la pâte dans un moule beurré et fariné. Enfourner dans un four préchauffé à 180°C pendant 35 minutes. Le gâteau est cuit quand la pointe d\'un couteau ressort sèche. Laisser tiédir avant de démouler sur une grille.',
        tip: 'Le temps de repos permet au gâteau de se décoller plus facilement du moule.'
      }
    ],
    duration: {
      prep: '10 min',
      cook: '35 min',
      total: '45 min'
    },
    servings: 8
  },
  {
    id: 902,
    title: 'Riz au Lait à l\'Ancienne',
    difficulty: 'Moyen',
    time: '50 min',
    image: 'https://images.unsplash.com/photo-1551450632-f5b7ea5f4e29?auto=format&fit=crop&q=80&w=800',
    mood: 'Nostalgie',
    moods: ['Cocooning', 'Réconfort'],
    ingredients: [
      '150g de riz rond',
      '1L de lait entier',
      '1 gousse de vanille',
      '80g de sucre',
      '1 pincée de sel',
      'Cannelle',
      'Caramel (facultatif)'
    ],
    steps: [
      {
        title: 'Préparation du lait',
        description: 'Fendre la gousse de vanille en deux dans le sens de la longueur et gratter les graines. Porter le lait à ébullition avec la gousse et les graines de vanille. Ajouter une pincée de sel qui rehaussera la saveur sucrée. Laisser infuser 10 minutes à feu doux.',
        tip: 'Un lait bien parfumé est la base d\'un bon riz au lait.'
      },
      {
        title: 'Cuisson du riz',
        description: 'Verser le riz dans le lait vanillé frémissant. Cuire à feu très doux pendant 35-40 minutes en remuant régulièrement avec une cuillère en bois pour éviter que le riz n\'attache au fond. Le riz doit rester crémeux tout en étant cuit à cœur.',
        tip: 'La patience est la clé : une cuisson lente permet au riz d\'absorber tous les parfums.'
      },
      {
        title: 'Finition',
        description: 'En fin de cuisson, quand le riz est tendre, ajouter le sucre et mélanger délicatement. Retirer la gousse de vanille. Laisser tiédir en remuant de temps en temps pour éviter la formation d\'une peau en surface. Le riz va continuer à épaissir en refroidissant.',
        tip: 'Le riz au lait s\'épaissit considérablement en refroidissant, ne pas trop le réduire à la cuisson.'
      },
      {
        title: 'Service',
        description: 'Répartir le riz au lait dans des ramequins individuels. Saupoudrer légèrement de cannelle ou napper de caramel selon les goûts. Servir tiède ou froid, comme le faisaient nos grands-mères. Pour plus d\'authenticité, servir dans des bols en faïence.',
        tip: 'La température de dégustation est une question de préférence, certains le préfèrent encore tiède, d\'autres bien frais.'
      }
    ],
    duration: {
      prep: '10 min',
      cook: '40 min',
      total: '50 min'
    },
    servings: 6
  }
];

export const recipes: Recipe[] = originalRecipes.map(updateRecipeServings);