import React, { useState, useMemo } from 'react';
import { CATEGORIES, PROBABILITY_LEVELS } from './data/config';

const App: React.FC = () => {
  const [selections, setSelections] = useState<Record<string, string>>({});

  const totalWeight = useMemo(() => {
    return Object.entries(selections).reduce((acc, [catId, optId]) => {
      const category = CATEGORIES.find((c) => c.id === catId);
      const option = category?.options.find((o) => o.id === optId);
      return acc + (option?.weight || 0);
    }, 0);
  }, [selections]);

  const result = useMemo(() => {
    return PROBABILITY_LEVELS.find((level) => totalWeight >= level.minWeight) || PROBABILITY_LEVELS[PROBABILITY_LEVELS.length - 1];
  }, [totalWeight]);

  const handleSelect = (categoryId: string, optionId: string) => {
    setSelections((prev) => ({
      ...prev,
      [categoryId]: optionId,
    }));
  };

  const reset = () => {
    setSelections({});
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12 relative flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            跨性别概率计算器
          </h1>
          <p className="text-lg text-gray-600">
            根据技术栈与硬件偏好评估跨性别概率（仅供娱乐）
          </p>
          {Object.keys(selections).length > 0 && (
            <button
              onClick={reset}
              className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium underline underline-offset-4"
            >
              清空选择
            </button>
          )}
        </header>

        <div className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          {CATEGORIES.map((category) => (
            <div key={category.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{category.title}</h2>
              <div className={`flex flex-wrap gap-3 ${category.horizontal ? 'flex-row' : ''}`}>
                {category.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(category.id, option.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border
                      ${
                        selections[category.id] === option.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-8 bg-white rounded-2xl shadow-lg border-2 border-indigo-50">
          <h3 className="text-2xl font-bold text-gray-700 mb-2">计算结果</h3>
          <div className="flex flex-col items-center justify-center">
            <span className={`text-5xl font-black mb-4 ${result.color}`}>
              {result.message}
            </span>
            <div className="text-gray-500 text-sm">
              当前总权重值: <span className="font-mono font-bold">{totalWeight}</span>
            </div>
          </div>
          <p className="mt-6 text-sm text-gray-400 italic">
            * 结果仅供娱乐，不代表任何实际医学或心理学建议。
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;