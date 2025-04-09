import React, { useState, useEffect, useRef } from 'react';
import { Book, Calendar, Music, Share2, HeadphonesIcon, AlignJustify as Spotify, AppleIcon, Music2, Plus, Smile, PlusCircle, Medal, Bell, Camera, Crown, Star } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface MoodEntry {
  date: Date;
  mood: string;
  recipe: string;
  notes: string;
}

interface MusicService {
  id: string;
  name: string;
  icon: typeof Music;
  color: string;
  connected: boolean;
}

interface Playlist {
  id: string;
  name: string;
  mood: string;
  tracks: number;
  image: string;
  isCustom?: boolean;
}

interface MoodPlaylist {
  id: string;
  moods: string[];
  name: string;
  tracks: number;
  image: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: typeof Medal;
  progress: number;
  total: number;
  achieved: boolean;
  image: string;
}

interface Notification {
  id: string;
  message: string;
  type: 'motivation' | 'achievement' | 'reminder';
  timestamp: Date;
  read: boolean;
}

const Account = () => {
  const [activeSection, setActiveSection] = useState<'journal' | 'planner' | 'social' | 'playlist'>('journal');
  const [selectedMusicService, setSelectedMusicService] = useState<string | null>(null);
  const [showNewPlaylistModal, setShowNewPlaylistModal] = useState(false);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowSubscribeModal(false);
      }
    };

    if (showSubscribeModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSubscribeModal]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      message: "Et si tu te préparais un petit plat réconfortant ce soir ? 🍲",
      type: 'motivation',
      timestamp: new Date(),
      read: false
    },
    {
      id: '2',
      message: "Bravo ! Tu as débloqué le badge 'Explorateur Culinaire' ! 🏆",
      type: 'achievement',
      timestamp: new Date(Date.now() - 3600000),
      read: false
    }
  ]);

  const moods = [
    'Réconfort',
    'Healthy',
    'Énergie',
    'Détox',
    'Festif',
    'Romantique',
    'Cocooning',
    'Anti-stress',
    'Boost',
    'Nostalgie'
  ];

  const [moodEntries] = useState<MoodEntry[]>([
    {
      date: new Date(),
      mood: 'Stressé',
      recipe: 'Curry doux anti-stress',
      notes: 'La préparation m\'a vraiment détendu'
    }
  ]);

  const [musicServices] = useState<MusicService[]>([
    {
      id: 'spotify',
      name: 'Spotify',
      icon: Spotify,
      color: 'bg-[#1DB954]',
      connected: false
    },
    {
      id: 'apple',
      name: 'Apple Music',
      icon: AppleIcon,
      color: 'bg-[#FC3C44]',
      connected: false
    },
    {
      id: 'deezer',
      name: 'Deezer',
      icon: Music2,
      color: 'bg-[#00C7F2]',
      connected: false
    }
  ]);

  const [moodPlaylists, setMoodPlaylists] = useState<MoodPlaylist[]>([]);

  const [playlists] = useState<Playlist[]>([
    {
      id: '1',
      name: 'Cocooning Kitchen',
      mood: 'Cocooning',
      tracks: 25,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '2',
      name: 'Festive Cooking',
      mood: 'Festif',
      tracks: 30,
      image: 'https://images.unsplash.com/photo-1514782831304-632d84503f6f?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '3',
      name: 'Zen Kitchen',
      mood: 'Anti-stress',
      tracks: 20,
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800'
    }
  ]);

  const [badges] = useState<Badge[]>([
    {
      id: 'anti-stress-master',
      name: 'Anti-stress Master',
      description: 'Préparer 10 recettes anti-stress',
      icon: Medal,
      progress: 7,
      total: 10,
      achieved: false,
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'nostalgic-master',
      name: 'Nostalgique Invétéré',
      description: 'Recréer 5 recettes d\'enfance',
      icon: Medal,
      progress: 5,
      total: 5,
      achieved: true,
      image: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'world-explorer',
      name: 'Globetrotteur Gustatif',
      description: 'Essayer des recettes de 8 pays différents',
      icon: Medal,
      progress: 6,
      total: 8,
      achieved: false,
      image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=800'
    }
  ]);

  useEffect(() => {
    const motivationalMessages = [
      "Et si tu te préparais un petit plat réconfortant ce soir ? 🍲",
      "C'est l'heure de découvrir une nouvelle recette ! 👩‍🍳",
      "Un peu de stress ? Une recette anti-stress t'attend ! 🫖",
      "Parfait moment pour essayer cette recette qui te fait envie ! ✨"
    ];

    const interval = setInterval(() => {
      const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      setNotifications(prev => [{
        id: Date.now().toString(),
        message: randomMessage,
        type: 'motivation',
        timestamp: new Date(),
        read: false
      }, ...prev]);
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  const handleMusicServiceConnect = (serviceId: string) => {
    setSelectedMusicService(serviceId);
    const updatedServices = musicServices.map(service => 
      service.id === serviceId ? { ...service, connected: true } : service
    );
    console.log('Service connecté:', serviceId);
  };

  const handleCreateMoodPlaylist = () => {
    if (selectedMoods.length === 0) return;

    const newPlaylist: MoodPlaylist = {
      id: `mood-${Date.now()}`,
      moods: selectedMoods,
      name: `Playlist ${selectedMoods.join(' & ')}`,
      tracks: 0,
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800'
    };

    setMoodPlaylists([...moodPlaylists, newPlaylist]);
    setSelectedMoods([]);
    setShowNewPlaylistModal(false);
  };

  const renderJournal = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Journal de Bord</h3>
        <button className="px-4 py-2 bg-[#FFB86B] text-white rounded-lg hover:bg-[#ffa53d] transition-colors">
          Nouvelle entrée
        </button>
      </div>
      <div className="grid gap-4">
        {moodEntries.map((entry, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  {format(entry.date, "d MMMM yyyy 'à' HH'h'mm", { locale: fr })}
                </p>
                <h4 className="text-lg font-semibold mt-1">{entry.mood}</h4>
              </div>
              <span className="bg-[#FFF8F0] text-[#FFB86B] px-3 py-1 rounded-full">
                {entry.recipe}
              </span>
            </div>
            <p className="text-gray-600">{entry.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPlanner = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">Planificateur de Menus</h3>
      <p className="text-gray-600">Planifiez vos repas en fonction de vos humeurs</p>
    </div>
  );

  const renderSocial = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">Communauté MoodFood</h3>
      <p className="text-gray-600">Partagez vos créations et découvrez celles des autres</p>
    </div>
  );

  const renderPlaylist = () => (
    <div className="space-y-8">
      {!selectedMusicService ? (
        <div className="bg-white p-8 rounded-xl shadow-lg text-center space-y-6">
          <div className="flex justify-center">
            <HeadphonesIcon size={48} className="text-[#FFB86B]" />
          </div>
          <h3 className="text-2xl font-semibold">Connecte-toi à ton appli musicale ! 🎵</h3>
          <p className="text-gray-600">Choisis ton service de streaming préféré pour commencer</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {musicServices.map((service) => {
              const ServiceIcon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => handleMusicServiceConnect(service.id)}
                  className={`flex items-center justify-center gap-3 p-4 rounded-lg border-2 border-dashed transition-all hover:border-[${service.color.replace('bg-', '')}] hover:bg-opacity-10 ${
                    service.connected ? service.color : ''
                  }`}
                >
                  <ServiceIcon size={24} />
                  <span className="font-medium">{service.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              onClick={() => setShowNewPlaylistModal(true)}
              className="bg-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#FFF8F0]">
                  <PlusCircle size={24} className="text-[#FFB86B]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Quel mood pour ta playlist ? 🎵</h4>
                  <p className="text-gray-600">Crée une playlist selon ton humeur</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#FFF8F0]">
                  <Music size={24} className="text-[#FFB86B]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Ma Musique 🎧</h4>
                  <p className="text-gray-600">Accède à tes playlists existantes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {moodPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden group relative transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={playlist.image}
                    alt={playlist.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Music size={48} className="text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-2">{playlist.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {playlist.moods.map((mood) => (
                      <span key={mood} className="text-sm bg-[#FFF8F0] text-[#FFB86B] px-3 py-1 rounded-full">
                        {mood}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showNewPlaylistModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div ref={modalRef} className="bg-white rounded-xl p-6 max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Crée ta playlist Mood</h3>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {moods.map((mood) => (
                  <button
                    key={mood}
                    onClick={() => {
                      if (selectedMoods.includes(mood)) {
                        setSelectedMoods(selectedMoods.filter(m => m !== mood));
                      } else {
                        setSelectedMoods([...selectedMoods, mood]);
                      }
                    }}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      selectedMoods.includes(mood)
                        ? 'bg-[#FFB86B] text-white'
                        : 'bg-[#FFF8F0] text-[#FFB86B] hover:bg-[#FFE5E5]'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={handleCreateMoodPlaylist}
                  disabled={selectedMoods.length === 0}
                  className="px-4 py-2 bg-[#FFB86B] text-white rounded-lg hover:bg-[#ffa53d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Créer la playlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderBadges = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">Mes Badges</h3>
        <button
          onClick={() => setShowSubscribeModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#FFB86B] text-white rounded-lg hover:bg-[#ffa53d] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
        >
          <Crown size={20} />
          <span>S'abonner</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {badges.map((badge) => (
          <div key={badge.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={badge.image}
                alt={badge.name}
                className="w-full h-48 object-cover"
              />
              {badge.achieved && (
                <div className="absolute top-4 right-4">
                  <Medal className="text-yellow-400" size={32} />
                </div>
              )}
            </div>
            <div className="p-4">
              <h4 className="font-semibold mb-2">{badge.name}</h4>
              <p className="text-gray-600 text-sm mb-3">{badge.description}</p>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-[#FFB86B]">
                      {Math.round((badge.progress / badge.total) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="flex h-2 mb-4 overflow-hidden rounded bg-[#FFF8F0]">
                  <div
                    style={{ width: `${(badge.progress / badge.total) * 100}%` }}
                    className="flex flex-col justify-center overflow-hidden bg-[#FFB86B]"
                  ></div>
                </div>
                <div className="text-xs text-gray-600">
                  {badge.progress} / {badge.total}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveSection('journal')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeSection === 'journal'
                ? 'bg-[#FFB86B] text-white'
                : 'bg-[#FFF8F0] text-[#FFB86B] hover:bg-[#FFE5E5]'
            }`}
          >
            <Book size={20} />
            Journal de bord
          </button>
          <button
            onClick={() => setActiveSection('planner')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeSection === 'planner'
                ? 'bg-[#FFB86B] text-white'
                : 'bg-[#FFF8F0] text-[#FFB86B] hover:bg-[#FFE5E5]'
            }`}
          >
            <Calendar size={20} />
            Planificateur
          </button>
          <button
            onClick={() => setActiveSection('social')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeSection === 'social'
                ? 'bg-[#FFB86B] text-white'
                : 'bg-[#FFF8F0] text-[#FFB86B] hover:bg-[#FFE5E5]'
            }`}
          >
            <Share2 size={20} />
            Communauté
          </button>
          <button
            onClick={() => setActiveSection('playlist')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeSection === 'playlist'
                ? 'bg-[#FFB86B] text-white'
                : 'bg-[#FFF8F0] text-[#FFB86B] hover:bg-[#FFE5E5]'
            }`}
          >
            <Music size={20} />
            Playlist
          </button>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-gray-100 relative"
          >
            <Bell size={24} />
            {notifications.some(n => !n.read) && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg z-50">
              <div className="p-4">
                <h4 className="font-semibold mb-4">Notifications</h4>
                <div className="space-y-3">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-[#FFF8F0]'}`}
                    >
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(notification.timestamp, "d MMMM 'à' HH'h'mm", { locale: fr })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {activeSection === 'journal' && renderJournal()}
      {activeSection === 'planner' && renderPlanner()}
      {activeSection === 'social' && renderSocial()}
      {activeSection === 'playlist' && renderPlaylist()}
      {renderBadges()}

      {showSubscribeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div ref={modalRef} className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="text-center mb-8">
              <Crown size={48} className="text-[#FFB86B] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Devenez Premium</h3>
              <p className="text-gray-600">Accédez à tous nos tutoriels et devenez un véritable chef !</p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#FFF8F0] p-6 rounded-xl border-2 border-[#FFB86B] cursor-pointer transform hover:scale-105 transition-all duration-200">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xl font-semibold text-[#FFB86B]">Abonnement Premium</h4>
                  <span className="text-2xl font-bold text-[#FFB86B]">4.99€</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">par mois</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2 text-gray-700">
                    <Star size={16} className="text-[#FFB86B]" />
                    Accès illimité aux tutoriels
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Star size={16} className="text-[#FFB86B]" />
                    Nouveaux tutoriels chaque semaine
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <Star size={16} className="text-[#FFB86B]" />
                    Support prioritaire
                  </li>
                </ul>
                <button className="w-full bg-[#FFB86B] text-white py-3 rounded-lg font-semibold hover:bg-[#ffa53d] transition-colors flex items-center justify-center gap-2">
                  <span>Deviens un chef ! 💪</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;