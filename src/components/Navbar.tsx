import React from 'react';
import { ChefHat, Search, BookOpen, Trophy, Star } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar = ({ activeTab, setActiveTab }: NavbarProps) => {
  const navItems = [
    { id: 'explorer', icon: ChefHat, label: 'Mood' },
    { id: 'favorites', icon: Star, label: 'Favoris' },
    { id: 'search', icon: Search, label: 'Ingrédients' },
    { id: 'tutorials', icon: BookOpen, label: 'Tutos' },
    { id: 'challenges', icon: Trophy, label: 'Défis' }
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-around p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'text-[#FFB86B] bg-[#FFF8F0]'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={24} />
                <span className="text-sm mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;