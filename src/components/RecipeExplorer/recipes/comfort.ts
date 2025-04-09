import { Recipe } from '../types';
import { updateRecipeServings } from '../../../utils/updateServings';

const originalRecipes: Recipe[] = [
  {
    id: 'carbonara',
    title: 'Pâtes Carbonara',
    difficulty: 'Facile',
    time: '20 min',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800',
    mood: 'Réconfort',
    moods: ['Traditionnel', 'Gourmand'],
    ingredients: [
      '400g de spaghetti',
      '200g de guanciale',
      '4 jaunes d\'œufs',
      '100g de pecorino romano râpé',
      '100g de parmesan reggiano râpé',
      'Poivre noir du moulin',
      'Gros sel de mer'
    ],
    steps: [
      {
        title: 'Cuisson des pâtes',
        description: 'Porter une grande casserole d\'eau à ébullition. Saler généreusement (environ 10g de sel par litre). Plonger les spaghetti et les cuire al dente selon les instructions du paquet. Réserver un verre d\'eau de cuisson avant d\'égoutter.',
        tip: 'L\'eau doit être aussi salée que la mer pour bien assaisonner les pâtes.'
      },
      {
        title: 'Préparation sauce',
        description: 'Dans un grand bol, mélanger les jaunes d\'œufs avec les fromages râpés et une généreuse dose de poivre noir fraîchement moulu. La consistance doit être crémeuse mais assez épaisse. Laisser le mélange à température ambiante pendant la cuisson des pâtes.',
        tip: 'Les œufs et les fromages à température ambiante donnent une sauce plus crémeuse.'
      },
      {
        title: 'Cuisson du guanciale',
        description: 'Couper le guanciale en lardons d\'environ 1cm d\'épaisseur. Les faire revenir à sec dans une grande poêle à feu moyen pendant 5-7 minutes, jusqu\'à ce qu\'ils soient dorés et croustillants mais encore légèrement tendres au cœur.',
        tip: 'Ne pas trop cuire le guanciale pour qu\'il reste tendre.'
      },
      {
        title: 'Assemblage final',
        description: 'Verser les pâtes chaudes dans la poêle avec le guanciale, HORS DU FEU. Ajouter rapidement le mélange œufs-fromage et remuer vivement. Si nécessaire, ajouter un peu d\'eau de cuisson chaude pour une sauce crémeuse.',
        tip: 'Le secret est de travailler hors du feu pour que les œufs ne cuisent pas trop.'
      }
    ],
    duration: {
      prep: '10 min',
      cook: '10 min',
      total: '20 min'
    },
    servings: 4
  },
  {
    id: 'gratin-dauphinois',
    title: 'Gratin Dauphinois',
    difficulty: 'Moyen',
    time: '1h30',
    image: 'https://images.unsplash.com/photo-1601063458289-77247ba485ec?auto=format&fit=crop&q=80&w=800',
    mood: 'Réconfort',
    moods: ['Traditionnel', 'Gourmand'],
    ingredients: [
      '1kg de pommes de terre à chair ferme',
      '50cl de crème fraîche entière',
      '50cl de lait entier',
      '2 gousses d\'ail',
      '1 noix de muscade entière',
      'Sel fin',
      'Poivre noir du moulin',
      '100g de gruyère râpé'
    ],
    steps: [
      {
        title: 'Préparation des pommes de terre',
        description: 'Éplucher et laver les pommes de terre. Les couper en fines lamelles régulières d\'environ 3mm d\'épaisseur à la mandoline. Rincer les lamelles à l\'eau froide et les sécher soigneusement.',
        tip: 'Des tranches régulières assurent une cuisson uniforme.'
      },
      {
        title: 'Préparation de la crème',
        description: 'Dans une casserole, faire chauffer la crème et le lait avec l\'ail écrasé et une bonne râpée de noix de muscade. Saler et poivrer généreusement. Porter à frémissement puis retirer du feu.',
        tip: 'L\'infusion de l\'ail dans la crème parfume délicatement le gratin.'
      },
      {
        title: 'Montage du gratin',
        description: 'Frotter un plat à gratin avec une gousse d\'ail. Disposer les pommes de terre en couches régulières, en versant un peu de crème entre chaque couche. Terminer par la crème et le gruyère râpé.',
        tip: 'Alterner pommes de terre et crème permet une cuisson homogène.'
      },
      {
        title: 'Cuisson',
        description: 'Enfourner dans un four préchauffé à 180°C pour environ 1h15. Le gratin doit être doré en surface et les pommes de terre tendres à cœur. Laisser reposer 10 minutes avant de servir.',
        tip: 'Piquer un couteau pour vérifier la cuisson : il doit s\'enfoncer sans résistance.'
      }
    ],
    duration: {
      prep: '15 min',
      cook: '1h15',
      total: '1h30'
    },
    servings: 6
  },
  {
    id: 'soupe-oignon',
    title: 'Soupe à l\'Oignon Gratinée',
    difficulty: 'Facile',
    time: '1h',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800',
    mood: 'Réconfort',
    moods: ['Traditionnel', 'Hiver'],
    ingredients: [
      '1kg d\'oignons jaunes',
      '50g de beurre demi-sel',
      '1L de bouillon de bœuf',
      '20cl de vin blanc sec',
      '8 tranches de pain de campagne',
      '200g de gruyère râpé',
      '2 branches de thym frais',
      '1 feuille de laurier',
      'Sel fin',
      'Poivre noir du moulin'
    ],
    steps: [
      {
        title: 'Préparation des oignons',
        description: 'Éplucher et émincer finement les oignons en rondelles. Dans une grande cocotte, faire fondre le beurre et y ajouter les oignons. Les faire suer à feu doux pendant 30-40 minutes en remuant régulièrement jusqu\'à caramélisation.',
        tip: 'La patience est la clé pour des oignons bien caramélisés.'
      },
      {
        title: 'Cuisson de la soupe',
        description: 'Déglacer avec le vin blanc et laisser réduire de moitié. Ajouter le bouillon, le thym et le laurier. Porter à ébullition puis laisser mijoter à feu doux pendant 20 minutes.',
        tip: 'Le vin blanc apporte de la profondeur au goût.'
      },
      {
        title: 'Préparation des croûtons',
        description: 'Couper le pain en tranches épaisses et les faire griller légèrement. Frotter chaque tranche avec une gousse d\'ail. Réserver jusqu\'au moment de servir.',
        tip: 'Des croûtons bien grillés restent croustillants plus longtemps.'
      },
      {
        title: 'Gratinage',
        description: 'Préchauffer le four en position gril. Répartir la soupe dans des bols allant au four. Poser une tranche de pain sur chaque bol et recouvrir de gruyère râpé. Faire gratiner jusqu\'à coloration dorée.',
        tip: 'Surveiller attentivement le gratinage pour un résultat parfait.'
      }
    ],
    duration: {
      prep: '20 min',
      cook: '40 min',
      total: '1h'
    },
    servings: 4
  }
];

export const recipes: Recipe[] = originalRecipes.map(updateRecipeServings);