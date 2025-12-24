import React, { useState, useMemo } from 'react';
import { CATEGORIES, PROBABILITY_LEVELS } from './data/config';
import CategoryComponent from './components/Category';
import Result from './components/Result';
import GithubLink from './components/GithubLink';
import ThemeToggle from './components/ThemeToggle';
import ScrollToTop from './components/ScrollToTop';

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
    return (
      PROBABILITY_LEVELS.find((level) => totalWeight >= level.minWeight) ||
      PROBABILITY_LEVELS[PROBABILITY_LEVELS.length - 1]
    );
  }, [totalWeight]);

  const handleSelect = (categoryId: string, optionId: string) => {
    setSelections((prev) => ({
      ...prev,
      [categoryId]: optionId,
    }));
  };

  const resetSelections = () => {
    setSelections({});
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <GithubLink />
      <ScrollToTop />

      <div className="max-w-4xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
        <header className="flex flex-col items-center mb-8 sm:mb-12">
          <div className="w-full flex justify-end mb-8">
            <ThemeToggle />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 text-center">
            跨性别概率计算器
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 text-center max-w-2xl">
            根据技术栈与硬件偏好评估跨性别概率（仅供娱乐）
          </p>
          
          {Object.keys(selections).length > 0 && (
            <button
              onClick={resetSelections}
              className="mt-6 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium underline underline-offset-4 transition-colors focus:outline-none"
            >
              清空所有选择
            </button>
          )}
        </header>

        <main className="space-y-6 sm:space-y-8 bg-white dark:bg-gray-900 p-5 sm:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          {CATEGORIES.map((category) => (
            <CategoryComponent
              key={category.id}
              category={category}
              selectedValue={selections[category.id]}
              onSelect={(optionId) => handleSelect(category.id, optionId)}
            />
          ))}
        </main>

        <section aria-live="polite" className="mt-12">
          <Result result={result} totalWeight={totalWeight} />
        </section>

        <footer className="mt-12 pb-8 text-center text-gray-400 dark:text-gray-600 text-xs sm:text-sm">
          <p>&copy; {new Date().getFullYear()} Trans Probability Calculator. Built for fun.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;