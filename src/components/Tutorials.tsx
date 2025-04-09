import React from 'react';
import { Play, ChefHat, PocketKnife as Knife, Flame, Star } from 'lucide-react';

const Tutorials = () => {
  const tutorials = {
    beginner: [
      {
        id: 1,
        title: 'Comment aiguiser un couteau',
        duration: '5 min',
        thumbnail: 'https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 2,
        title: 'Émincer un oignon sans pleurer',
        duration: '3 min',
        thumbnail: 'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 3,
        title: 'Cuire des pâtes al dente',
        duration: '4 min',
        thumbnail: 'https://images.unsplash.com/photo-1551462147-ff29ce7d6f7b?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 4,
        title: 'Utiliser une mandoline en sécurité',
        duration: '6 min',
        thumbnail: 'https://images.unsplash.com/photo-1495546968767-f0573cca821e?auto=format&fit=crop&q=80&w=800'
      }
    ],
    intermediate: [
      {
        id: 5,
        title: 'Réaliser une béchamel sans grumeaux',
        duration: '7 min',
        thumbnail: 'https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 6,
        title: 'Maîtriser la cuisson de l\'œuf parfait',
        duration: '8 min',
        thumbnail: 'https://images.unsplash.com/photo-1607690424560-35d578c7a7ad?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 7,
        title: 'Saisir une viande sans la dessécher',
        duration: '6 min',
        thumbnail: 'https://images.unsplash.com/photo-1615937691194-97dbd3f3dc29?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 8,
        title: 'Cuisiner avec des herbes fraîches',
        duration: '5 min',
        thumbnail: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=800'
      }
    ],
    advanced: [
      {
        id: 9,
        title: 'Cuisson basse température',
        duration: '10 min',
        thumbnail: 'https://images.unsplash.com/photo-1624374814417-bb2f85422a68?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 10,
        title: 'Montage d\'un millefeuille',
        duration: '12 min',
        thumbnail: 'https://images.unsplash.com/photo-1464195244916-405fa0a82545?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 11,
        title: 'Techniques de fermentation maison',
        duration: '15 min',
        thumbnail: 'https://images.unsplash.com/photo-1593280201706-d3e04eb33b40?auto=format&fit=crop&q=80&w=800'
      }
    ],
    technical: [
      {
        id: 12,
        title: 'Plier des samossas',
        duration: '8 min',
        thumbnail: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 13,
        title: 'Rouler des makis',
        duration: '10 min',
        thumbnail: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 14,
        title: 'Technique du pliage en dim sum',
        duration: '12 min',
        thumbnail: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800'
      }
    ]
  };

  const renderTutorialCard = (tutorial: typeof tutorials.beginner[0]) => (
    <div
      key={tutorial.id}
      className="bg-white rounded-xl shadow-lg overflow-hidden group relative transform transition-all duration-300 hover:scale-105 focus-within:scale-105 cursor-pointer"
    >
      <div className="relative">
        <img
          src={tutorial.thumbnail}
          alt={tutorial.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="text-white" size={48} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{tutorial.title}</h3>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{tutorial.duration}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-12">
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Knife className="text-[#FFB86B]" size={28} />
          <h2 className="text-3xl font-bold">Débutant</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.beginner.map(renderTutorialCard)}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <ChefHat className="text-[#FFB86B]" size={28} />
          <h2 className="text-3xl font-bold">Intermédiaire</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.intermediate.map(renderTutorialCard)}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <Star className="text-[#FFB86B]" size={28} />
          <h2 className="text-3xl font-bold">Avancé</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.advanced.map(renderTutorialCard)}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <Flame className="text-[#FFB86B]" size={28} />
          <h2 className="text-3xl font-bold">Gestes Techniques</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.technical.map(renderTutorialCard)}
        </div>
      </section>
    </div>
  );
};

export default Tutorials;