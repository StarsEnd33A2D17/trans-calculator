import React from 'react';
import type { Category, Option } from '../types';

interface CategoryProps {
  category: Category;
  options: Option[];
  selectedValue: string | undefined;
  onSelect: (optionId: string) => void;
  showWeights: boolean;
}

const CategoryComponent: React.FC<CategoryProps> = ({ category, options, selectedValue, onSelect, showWeights }) => {
  return (
    <div className="border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0 last:pb-0">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{category.title}</h2>
      <div className={`flex flex-wrap gap-3 ${category.horizontal ? 'flex-row' : ''}`}>
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border flex items-center gap-2
              ${
                selectedValue === option.id
                  ? 'bg-indigo-600 text-white border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500 shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:border-indigo-600 dark:hover:bg-gray-700'
              }`}
          >
            <span>{option.label}</span>
            {showWeights && option.weight !== undefined && (
              <span className={`text-xs opacity-80 font-mono ${selectedValue === option.id ? 'text-indigo-100' : 'text-gray-400'}`}>
                {option.weight}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryComponent;
