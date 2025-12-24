import React from 'react';
import type { Category } from '../types';

interface CategoryProps {
  category: Category;
  selectedValue: string | undefined;
  onSelect: (optionId: string) => void;
}

const CategoryComponent: React.FC<CategoryProps> = ({ category, selectedValue, onSelect }) => {
  return (
    <div className="border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0 last:pb-0">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{category.title}</h2>
      <div className={`flex flex-wrap gap-3 ${category.horizontal ? 'flex-row' : ''}`}>
        {category.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border
              ${
                selectedValue === option.id
                  ? 'bg-indigo-600 text-white border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500 shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:border-indigo-600 dark:hover:bg-gray-700'
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryComponent;
