import { Recipe } from '../types';
import { updateRecipeServings } from '../../../utils/updateServings';

const originalRecipes: Recipe[] = [
  {
    id: 'chocolat-chaud-epice',
    title: 'Chocolat Chaud Épicé',
    mood: 'Cocooning',
    difficulty: 'Facile',
    time: '15 min',
    servings: 1,
    image: 'https://images.unsplash.com/photo-1517578239113-b03992dcdd25?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
    ingredients: [
      '200ml lait entier',
      '30g chocolat noir 70% de cacao',
      '1 bâton de cannelle',
      '1 pincée de muscade fraîchement râpée',
      '1 pincée de gingembre moulu',
      'Crème fouettée maison',
      'Mini marshmallows'
    ],
    steps: [
      {
        title: 'Infusion des épices',
        description: 'Dans une petite casserole, verser le lait et ajouter le bâton de cannelle. Chauffer à feu doux jusqu\'à frémissement, sans faire bouillir. Laisser infuser 5 minutes pour que les arômes de la cannelle se développent pleinement. Cette étape permet d\'obtenir une base parfumée qui sublimera le chocolat.',
        tip: 'Un lait infusé aux épices donne plus de profondeur au chocolat chaud.'
      },
      {
        title: 'Préparation du chocolat',
        description: 'Hacher finement le chocolat noir pour faciliter sa fonte. Retirer le bâton de cannelle du lait et ajouter le chocolat en plusieurs fois, en remuant constamment avec un fouet. La chaleur résiduelle du lait doit faire fondre le chocolat progressivement pour obtenir un mélange parfaitement lisse et brillant.',
        tip: 'Plus le chocolat est finement haché, plus il fondra uniformément.'
      },
      {
        title: 'Ajout des épices',
        description: 'Une fois le chocolat complètement fondu, ajouter la muscade fraîchement râpée et le gingembre moulu. Fouetter énergiquement pour bien incorporer les épices et obtenir une texture onctueuse. Goûter et ajuster l\'assaisonnement selon vos préférences. Les épices doivent être présentes mais subtiles.',
        tip: 'La muscade fraîchement râpée a beaucoup plus de saveur que la muscade en poudre.'
      },
      {
        title: 'Service et finitions',
        description: 'Verser le chocolat chaud dans une grande tasse préalablement chauffée. Garnir généreusement de crème fouettée maison et parsemer de mini marshmallows. Pour une touche finale, saupoudrer légèrement de cacao en poudre ou de cannelle moulue. Servir immédiatement pendant que le chocolat est encore bien chaud et que la crème commence à fondre.',
        tip: 'Préchauffer la tasse avec de l\'eau chaude permet de maintenir le chocolat à la bonne température plus longtemps.'
      }
    ],
    duration: {
      prep: '5 min',
      cook: '10 min',
      total: '15 min'
    }
  },
  {
    id: 'soupe-potimarron-chataignes',
    title: 'Velouté de Potimarron aux Châtaignes',
    mood: 'Cocooning',
    difficulty: 'Moyen',
    time: '45 min',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&q=80&w=2944&ixlib=rb-4.0.3',
    ingredients: [
      '1 potimarron moyen (environ 1kg)',
      '200g de châtaignes cuites',
      '1 gros oignon doux',
      '2 gousses d\'ail',
      '1L de bouillon de légumes maison',
      '20cl de crème fraîche',
      'Sel et poivre du moulin',
      '2 cuillères à soupe d\'huile d\'olive'
    ],
    steps: [
      {
        title: 'Préparation des légumes',
        description: 'Laver soigneusement le potimarron. Si la peau est bio et fine, vous pouvez la conserver pour plus de saveur et de nutriments. Le couper en cubes réguliers d\'environ 3cm. Éplucher et émincer finement l\'oignon. Peler et écraser les gousses d\'ail. La taille régulière des morceaux assure une cuisson uniforme.',
        tip: 'La peau du potimarron devient très tendre à la cuisson et est comestible.'
      },
      {
        title: 'Base aromatique',
        description: 'Dans une grande cocotte, faire chauffer l\'huile d\'olive à feu moyen. Y faire revenir l\'oignon émincé pendant 5-7 minutes jusqu\'à ce qu\'il devienne translucide et commence à caraméliser légèrement. Ajouter l\'ail écrasé et poursuivre la cuisson 1 minute pour développer les arômes sans que l\'ail ne brûle.',
        tip: 'La caramélisation des oignons apporte une douceur naturelle au velouté.'
      },
      {
        title: 'Cuisson des légumes',
        description: 'Ajouter les cubes de potimarron et les châtaignes dans la cocotte. Remuer pour bien enrober les légumes d\'huile et les faire revenir 2-3 minutes. Verser le bouillon de légumes chaud, porter à ébullition puis réduire le feu. Laisser mijoter à couvert pendant 20-25 minutes, jusqu\'à ce que le potimarron soit très tendre.',
        tip: 'Les châtaignes apportent une onctuosité naturelle et une saveur subtilement sucrée.'
      },
      {
        title: 'Mixage et finition',
        description: 'Une fois les légumes bien tendres, mixer le velouté jusqu\'à obtenir une texture parfaitement lisse et soyeuse. Incorporer la crème fraîche et mixer à nouveau brièvement. Ajuster l\'assaisonnement en sel et poivre selon votre goût. Si le velouté est trop épais, le détendre avec un peu de bouillon chaud. Servir bien chaud dans des bols préchauffés.',
        tip: 'Un mixage prolongé donne une texture plus soyeuse. Pour plus de gourmandise, ajouter quelques châtaignes concassées au moment du service.'
      }
    ],
    duration: {
      prep: '15 min',
      cook: '30 min',
      total: '45 min'
    }
  },
  {
    id: 'gratin-macaroni-fromage',
    title: 'Gratin de Macaroni au Fromage',
    mood: 'Cocooning',
    difficulty: 'Facile',
    time: '40 min',
    servings: 6,
    image: 'https://images.unsplash.com/photo-1543352634-99a5d50ae78e?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
    ingredients: [
      '500g de macaroni',
      '400g de mélange de fromages râpés (comté, gruyère)',
      '50g de parmesan fraîchement râpé',
      '50g de beurre doux',
      '50g de farine',
      '75cl de lait entier',
      'Noix de muscade fraîche',
      'Sel fin et poivre noir du moulin'
    ],
    steps: [
      {
        title: 'Cuisson des pâtes',
        description: 'Porter une grande casserole d\'eau salée à ébullition. La quantité de sel doit être importante, comme l\'eau de mer. Cuire les macaroni 2 minutes de moins que le temps indiqué sur le paquet pour une cuisson al dente. Les pâtes termineront leur cuisson dans le gratin. Égoutter en réservant une tasse d\'eau de cuisson.',
        tip: 'Une cuisson al dente est essentielle car les pâtes continuent de cuire au four.'
      },
      {
        title: 'Préparation de la sauce',
        description: 'Dans une casserole à fond épais, faire fondre le beurre à feu moyen. Ajouter la farine et cuire ce roux en remuant constamment pendant 2-3 minutes pour éliminer le goût de farine. Verser progressivement le lait chaud tout en fouettant énergiquement pour éviter les grumeaux. Cuire la béchamel 5-7 minutes jusqu\'à épaississement.',
        tip: 'Un lait chaud versé sur un roux chaud évite la formation de grumeaux.'
      },
      {
        title: 'Enrichissement de la sauce',
        description: 'Retirer la casserole du feu et incorporer les fromages râpés en plusieurs fois, en mélangeant bien entre chaque ajout pour obtenir une sauce parfaitement lisse. Assaisonner généreusement de muscade fraîchement râpée, sel et poivre. Si la sauce est trop épaisse, la détendre avec un peu d\'eau de cuisson des pâtes.',
        tip: 'La muscade est l\'épice traditionnelle des gratins, elle sublime les fromages.'
      },
      {
        title: 'Assemblage et cuisson',
        description: 'Préchauffer le four à 180°C. Mélanger les pâtes et la sauce dans un grand plat à gratin beurré. La sauce doit bien enrober tous les macaroni. Saupoudrer de parmesan râpé et enfourner pour 20-25 minutes jusqu\'à ce que le dessus soit bien doré et gratiné. Laisser reposer 5 minutes avant de servir.',
        tip: 'Pour une croûte plus croustillante, passer le gratin sous le gril les dernières minutes.'
      }
    ],
    duration: {
      prep: '15 min',
      cook: '25 min',
      total: '40 min'
    }
  }
];

export const recipes: Recipe[] = originalRecipes.map(updateRecipeServings);