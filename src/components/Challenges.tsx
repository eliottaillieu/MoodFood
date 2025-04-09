import React, { useState } from 'react';
import { Trophy, Timer, Share2, Camera } from 'lucide-react';
import { format, addHours } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Challenge {
  id: number;
  title: string;
  description: string;
  level: 1 | 2 | 3;
  levelName: string;
  participants: number;
  image: string;
}

interface ActiveChallenge extends Challenge {
  startDate: Date;
  endDate: Date;
}

const challenges: Challenge[] = [
  // Niveau 1 : Curiosité
  {
    id: 1,
    title: 'Le Légume Mystère',
    description: 'Cuisiner un légume que tu n\'as jamais acheté',
    level: 1,
    levelName: 'Curiosité',
    participants: 234,
    image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Sans Sel mais Savoureux',
    description: 'Faire un plat sans sel mais plein de goût',
    level: 1,
    levelName: 'Curiosité',
    participants: 156,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Le Légume Sucré',
    description: 'Préparer un dessert avec un légume',
    level: 1,
    levelName: 'Curiosité',
    participants: 189,
    image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=800'
  },
  // Niveau 2 : Créativité
  {
    id: 4,
    title: 'La Madeleine de Proust',
    description: 'Reproduire une recette d\'enfance uniquement de mémoire',
    level: 2,
    levelName: 'Créativité',
    participants: 145,
    image: 'https://images.unsplash.com/photo-1464195244916-405fa0a82545?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    title: 'Le Trio Imposé',
    description: 'Inventer un plat à partir de 3 ingrédients imposés',
    level: 2,
    levelName: 'Créativité',
    participants: 278,
    image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    title: 'Fast-Food Healthy',
    description: 'Rendre un plat fast-food healthy & maison',
    level: 2,
    levelName: 'Créativité',
    participants: 198,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=800'
  },
  // Niveau 3 : Challenge
  {
    id: 7,
    title: 'Tour du Monde',
    description: 'Faire un plat du monde que tu n\'as jamais goûté',
    level: 3,
    levelName: 'Challenge',
    participants: 167,
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 8,
    title: '24h Veggie',
    description: '24h cuisine sans viande ni poisson',
    level: 3,
    levelName: 'Challenge',
    participants: 245,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 9,
    title: 'Dîner Thématique',
    description: 'Réaliser un dîner entier à thème',
    level: 3,
    levelName: 'Challenge',
    participants: 134,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'
  }
];

const Challenges = () => {
  const [activeChallenge, setActiveChallenge] = useState<ActiveChallenge | null>(null);

  const startChallenge = (challenge: Challenge) => {
    const startDate = new Date();
    const endDate = addHours(startDate, 48);
    setActiveChallenge({
      ...challenge,
      startDate,
      endDate
    });
  };

  const formatDate = (date: Date) => {
    return format(date, "d MMMM yyyy 'à' HH'h'mm", { locale: fr });
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-green-100 text-green-800';
      case 2:
        return 'bg-orange-100 text-orange-800';
      case 3:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Défis Culinaires</h2>

      {activeChallenge && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">{activeChallenge.title}</h3>
              <p className="text-gray-600">{activeChallenge.description}</p>
            </div>
            <Timer className="text-[#FFB86B]" size={24} />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Fin du défi le {formatDate(activeChallenge.endDate)}
            </p>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#FFF8F0] text-[#FFB86B] rounded-lg hover:bg-[#FFE5E5] transition-colors">
                <Camera size={20} />
                Photo
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#FFF8F0] text-[#FFB86B] rounded-lg hover:bg-[#FFE5E5] transition-colors">
                <Share2 size={20} />
                Partager
              </button>
            </div>
          </div>
        </div>
      )}

      {[1, 2, 3].map((level) => (
        <section key={level} className="space-y-4">
          <h3 className="text-2xl font-semibold flex items-center gap-3">
            <span>Niveau {level} : </span>
            <span className={`${getLevelColor(level)} px-3 py-1 rounded-full text-sm`}>
              {level === 1 ? 'Curiosité' : level === 2 ? 'Créativité' : 'Challenge'}
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges
              .filter((challenge) => challenge.level === level)
              .map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={challenge.image}
                    alt={challenge.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-2">{challenge.title}</h4>
                    <p className="text-gray-600 mb-4">{challenge.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Trophy size={16} />
                        <span>{challenge.participants} participants</span>
                      </div>
                    </div>
                    <button
                      onClick={() => startChallenge(challenge)}
                      className="w-full bg-[#FFB86B] text-white py-2 rounded-lg hover:bg-[#ffa53d] transition-colors"
                    >
                      Je tente le défi !
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Challenges;