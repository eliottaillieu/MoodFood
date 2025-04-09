import React, { useState, useEffect } from 'react';
import { ChefHat, Menu, X, ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import RecipeExplorer from './components/RecipeExplorer';
import IngredientSearch from './components/IngredientSearch';
import Tutorials from './components/Tutorials';
import Challenges from './components/Challenges';
import Account from './components/Account';
import Favorites from './components/Favorites';

function App() {
  const [activeTab, setActiveTab] = useState('explorer');
  const [showSidebar, setShowSidebar] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <header className="bg-[#FFB86B] text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChefHat size={32} />
            <h1 className="text-2xl font-bold">Mood Food</h1>
          </div>
          <button 
            onClick={() => setShowSidebar(true)}
            className="p-2 hover:bg-[#ffa53d] rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'explorer' && <RecipeExplorer />}
        {activeTab === 'favorites' && <Favorites />}
        {activeTab === 'search' && <IngredientSearch />}
        {activeTab === 'tutorials' && <Tutorials />}
        {activeTab === 'challenges' && <Challenges />}
      </main>

      {/* Bouton retour en haut */}
      <button
        onClick={scrollToTop}
        className={`fixed left-1/2 -translate-x-1/2 bottom-8 bg-[#FFB86B] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:bg-[#ffa53d] ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}
      >
        <ArrowUp size={24} strokeWidth={3} className="rounded-full" />
      </button>

      {/* Sidebar overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-50 ${
          showSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setShowSidebar(false)}
      >
        {/* Sidebar content */}
        <div 
          className={`absolute right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 flex flex-col ${
            showSidebar ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          {/* Sidebar header */}
          <div className="p-4 border-b flex-shrink-0">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Menu</h2>
              <button 
                onClick={() => setShowSidebar(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <Account />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;