import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface ServingsAdjusterProps {
  servings: number;
  onChange: (servings: number) => void;
}

const ServingsAdjuster = ({ servings, onChange }: ServingsAdjusterProps) => {
  const handleDecrease = () => {
    if (servings > 1) {
      onChange(servings - 1);
    }
  };

  const handleIncrease = () => {
    if (servings < 200) {
      onChange(servings + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 200) {
      onChange(value);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleDecrease}
        disabled={servings <= 1}
        className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Minus size={20} />
      </button>
      <input
        type="number"
        min="1"
        max="200"
        value={servings}
        onChange={handleInputChange}
        className="w-16 text-center border rounded-md p-1"
      />
      <button
        onClick={handleIncrease}
        disabled={servings >= 200}
        className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus size={20} />
      </button>
    </div>
  );
};

export default ServingsAdjuster;