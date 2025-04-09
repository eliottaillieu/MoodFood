import { Recipe } from '../types';
import { updateRecipeServings } from '../../../utils/updateServings';

const originalRecipes: Recipe[] = [
  {
    id: 701,
    title: 'Tisane Relaxante aux Herbes',
    difficulty: 'Facile',
    time: '10 min',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=800',
    mood: 'Anti-stress',
    moods: ['Détox', 'Cocooning'],
    ingredients: [
      '2 cuillères à café de camomille bio',
      '1 cuillère à café de lavande séchée bio',
      '1 cuillère à café de mélisse fraîche',
      '1 cuillère à café de verveine citronnée',
      '1 cuillère à soupe de miel d\'acacia',
      'Zeste d\'un citron bio',
      '300ml d\'eau filtrée'
    ],
    steps: [
      {
        title: 'Préparation des herbes',
        description: 'Sélectionner soigneusement les herbes séchées, en vérifiant leur fraîcheur et leur arôme. Les mélanger délicatement dans une boule à thé ou un filtre en respectant les proportions. La combinaison de ces herbes est spécifiquement choisie pour leurs propriétés apaisantes et relaxantes.',
        tip: 'Choisir des herbes bio pour plus de bienfaits et un meilleur goût.'
      },
      {
        title: 'Infusion',
        description: 'Faire chauffer l\'eau jusqu\'à frémissement, sans atteindre l\'ébullition pour préserver les propriétés des plantes. Verser l\'eau sur les herbes et laisser infuser 5-7 minutes en couvrant pour conserver les huiles essentielles. L\'infusion doit développer une belle couleur dorée et un parfum délicat.',
        tip: 'Ne pas faire bouillir l\'eau pour préserver les propriétés des plantes et éviter l\'amertume.'
      },
      {
        title: 'Aromatisation',
        description: 'Retirer le filtre contenant les herbes. Ajouter une cuillère de miel d\'acacia, reconnu pour ses propriétés calmantes, et quelques zestes de citron bio finement râpés. Remuer doucement pour faire fondre le miel et libérer les huiles essentielles du citron. Le miel et le citron équilibrent parfaitement les saveurs herbacées.',
        tip: 'Le miel adoucit naturellement la tisane et ajoute ses propriétés apaisantes.'
      },
      {
        title: 'Service',
        description: 'Verser la tisane dans un mug confortable, idéalement préchauffé pour maintenir la température optimale plus longtemps. Prendre le temps de respirer les arômes apaisants avant de déguster. Cette tisane est particulièrement efficace en fin de journée ou avant le coucher pour favoriser la détente.',
        tip: 'Prendre le temps de savourer dans un endroit calme, loin des écrans et du bruit.'
      }
    ],
    duration: {
      prep: '5 min',
      cook: '5 min',
      total: '10 min'
    },
    servings: 1
  },
  {
    id: 702,
    title: 'Bowl de Smoothie au Matcha',
    difficulty: 'Facile',
    time: '15 min',
    image: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?auto=format&fit=crop&q=80&w=800',
    mood: 'Anti-stress',
    moods: ['Healthy', 'Énergie'],
    ingredients: [
      '2 bananes mûres congelées',
      '1 cuillère à café de matcha en poudre de qualité',
      '200ml de lait d\'amande non sucré',
      '1 cuillère à soupe de miel de fleurs',
      '1 poignée de myrtilles fraîches',
      '2 cuillères à soupe de granola maison',
      '1 cuillère à soupe de graines de chia'
    ],
    steps: [
      {
        title: 'Préparation du matcha',
        description: 'Dans un petit bol, tamiser le matcha pour éviter les grumeaux. Ajouter une cuillère à soupe d\'eau chaude (pas bouillante) et fouetter énergiquement avec un chasen (fouet en bambou) ou une petite cuillère jusqu\'à obtenir une pâte lisse et brillante. Cette technique traditionnelle permet de développer pleinement les saveurs du thé.',
        tip: 'La qualité du matcha est essentielle pour un goût optimal et des bienfaits maximaux.'
      },
      {
        title: 'Mixage du smoothie',
        description: 'Dans un blender puissant, placer les bananes congelées coupées en morceaux et le lait d\'amande. Mixer jusqu\'à obtenir une consistance crémeuse. Ajouter le matcha dilué et le miel, puis mixer à nouveau brièvement pour bien incorporer. La texture doit être épaisse mais onctueuse.',
        tip: 'Les bananes congelées donnent une texture crémeuse sans avoir besoin d\'ajouter de glace.'
      },
      {
        title: 'Ajustement de la texture',
        description: 'Vérifier la consistance du smoothie. Elle doit être assez épaisse pour tenir sur une cuillère mais suffisamment fluide pour être lisse. Si nécessaire, ajouter du lait d\'amande cuillère par cuillère jusqu\'à obtenir la texture parfaite. Goûter et ajuster la douceur avec du miel selon vos préférences.',
        tip: 'La consistance idéale permet de créer un beau dressage qui tiendra en place.'
      },
      {
        title: 'Dressage artistique',
        description: 'Verser le smoothie dans un grand bol. Disposer harmonieusement les garnitures en créant différentes zones : myrtilles fraîches, granola croustillant, et graines de chia. Créer des motifs en spirale ou en rayons pour un effet visuel apaisant. Le dressage fait partie intégrante de l\'expérience anti-stress.',
        tip: 'Prendre le temps de créer un beau dressage participe au rituel relaxant de la préparation.'
      }
    ],
    duration: {
      prep: '15 min',
      cook: '0 min',
      total: '15 min'
    },
    servings: 1
  },
  {
    id: 703,
    title: 'Soupe Miso Réconfortante',
    difficulty: 'Facile',
    time: '20 min',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800',
    mood: 'Anti-stress',
    moods: ['Réconfort', 'Détox'],
    ingredients: [
      '2 cuillères à soupe de pâte miso blanc',
      '200g de tofu soyeux bio',
      '4 champignons shiitake frais',
      '10g d\'algues wakame séchées',
      '2 oignons verts frais',
      '3cm de gingembre frais bio',
      '1L de bouillon dashi maison'
    ],
    steps: [
      {
        title: 'Préparation du bouillon',
        description: 'Dans une casserole, porter le bouillon dashi à frémissement. Peler et râper finement le gingembre, l\'ajouter au bouillon. Laisser infuser à feu doux pendant 5 minutes pour que les saveurs du gingembre se développent. Le gingembre apporte ses propriétés anti-inflammatoires et digestives.',
        tip: 'Le gingembre frais râpé libère plus de saveurs et de composés bénéfiques que le gingembre en poudre.'
      },
      {
        title: 'Incorporation du miso',
        description: 'Dans un bol, délayer la pâte miso avec un peu de bouillon chaud jusqu\'à obtenir une consistance lisse. Verser ce mélange dans la casserole en remuant délicatement. Maintenir à feu très doux sans jamais faire bouillir pour préserver les probiotiques du miso. Le miso est riche en enzymes et en probiotiques bénéfiques.',
        tip: 'Ne jamais faire bouillir le miso pour préserver ses propriétés nutritionnelles.'
      },
      {
        title: 'Ajout des garnitures',
        description: 'Couper le tofu en cubes de 2cm. Réhydrater les algues wakame dans de l\'eau froide pendant 5 minutes, puis les égoutter. Émincer finement les champignons shiitake. Ajouter ces ingrédients dans le bouillon et laisser chauffer doucement pendant 3-4 minutes. Chaque ingrédient apporte ses bienfaits nutritionnels.',
        tip: 'Les algues sont riches en minéraux apaisants et les champignons renforcent le système immunitaire.'
      },
      {
        title: 'Finition et service',
        description: 'Ciseler finement les oignons verts en rondelles. Répartir la soupe dans des bols individuels et parsemer d\'oignons verts. Servir immédiatement pendant que la soupe est bien chaude. Le rituel de dégustation d\'une soupe miso est en lui-même relaxant.',
        tip: 'Prendre le temps de respirer les arômes avant de déguster contribue à l\'effet apaisant.'
      }
    ],
    duration: {
      prep: '10 min',
      cook: '10 min',
      total: '20 min'
    },
    servings: 2
  },
  {
    id: 704,
    title: 'Porridge aux Fruits Secs',
    difficulty: 'Facile',
    time: '15 min',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=800',
    mood: 'Anti-stress',
    moods: ['Cocooning', 'Healthy'],
    ingredients: [
      '100g de flocons d\'avoine bio',
      '300ml de lait d\'amande non sucré',
      '50g de mélange de fruits secs (raisins, abricots, figues)',
      '1 cuillère à café de cannelle en poudre',
      '2 cuillères à soupe de miel de thym',
      '30g de graines de courge',
      '30g de noix concassées'
    ],
    steps: [
      {
        title: 'Cuisson de base',
        description: 'Dans une casserole, verser le lait végétal et porter à frémissement. Ajouter les flocons d\'avoine et la cannelle. Remuer constamment à feu doux pendant 5-7 minutes jusqu\'à ce que le mélange épaississe et devienne crémeux. La cuisson lente permet aux flocons de libérer leur amidon pour une texture onctueuse.',
        tip: 'Remuer constamment pour une texture crémeuse et éviter que ça n\'attache au fond.'
      },
      {
        title: 'Incorporation des fruits secs',
        description: 'Une fois la consistance désirée atteinte, ajouter les fruits secs coupés en petits morceaux. Les laisser s\'imprégner de la chaleur du porridge pendant quelques minutes. Les fruits secs apportent des minéraux essentiels et des fibres qui contribuent au bien-être.',
        tip: 'Les fruits secs apportent du magnésium anti-stress et des sucres lents énergisants.'
      },
      {
        title: 'Ajustement de la consistance',
        description: 'Si le porridge devient trop épais, ajouter un peu de lait chaud pour obtenir la texture souhaitée. Le porridge doit être onctueux mais pas trop liquide. Goûter et ajuster la douceur avec du miel selon vos préférences. La consistance parfaite est celle qui vous apporte le plus de réconfort.',
        tip: 'Le porridge doit être onctueux mais pas trop liquide pour être réconfortant.'
      },
      {
        title: 'Service et garniture',
        description: 'Verser le porridge dans un bol. Garnir avec les graines de courge et les noix concassées. Ajouter un filet de miel et une pincée de cannelle supplémentaire si désiré. La présentation soignée et les différentes textures participent au plaisir de la dégustation et au moment de détente.',
        tip: 'Servir chaud dans un bol préchauffé pour prolonger le moment de dégustation.'
      }
    ],
    duration: {
      prep: '5 min',
      cook: '10 min',
      total: '15 min'
    },
    servings: 2
  }
];

export const recipes: Recipe[] = originalRecipes.map(updateRecipeServings);