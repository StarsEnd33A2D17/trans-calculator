import React, { useState, useMemo } from 'react';
import { CATEGORIES, PROBABILITY_LEVELS } from './data/config';
import CategoryComponent from './components/Category';
import Result from './components/Result';
import GithubLink from './components/GithubLink';
import ThemeToggle from './components/ThemeToggle';
import ScrollToTop from './components/ScrollToTop';
import Settings from './components/Settings';
import type { SortMode } from './components/Settings';

const App: React.FC = () => {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [sortMode, setSortMode] = useState<SortMode>('ordered');

  const processedCategories = useMemo(() => {
    return CATEGORIES.map((category) => {
      let options = [...category.options];

      if (sortMode === 'random') {
        options = options
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
      } else {
        // 'ordered' or 'weights': sort by weight descending
        options.sort((a, b) => (b.weight || 0) - (a.weight || 0));
      }

      return {
        ...category,
        processedOptions: options,
      };
    });
  }, [sortMode]);

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

  const selectedLabels = useMemo(() => {
    return CATEGORIES.map((category) => {
      const optionId = selections[category.id];
      if (!optionId) return null;
      const option = category.options.find((o) => o.id === optionId);
      return option ? option.label : null;
    }).filter((label): label is string => label !== null);
  }, [selections]);

  const allSelected = useMemo(() => {
    return CATEGORIES.every((c) => selections[c.id]);
  }, [selections]);

  const handleSelect = (categoryId: string, optionId: string) => {
    setSelections((prev) => ({
      ...prev,
      [categoryId]: optionId,
    }));
  };

  const resetSelections = () => {
    setSelections({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showWeights = sortMode === 'weights';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <GithubLink />
      <ScrollToTop />

      <div className="max-w-4xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
        <header className="flex flex-col items-center mb-8 sm:mb-12">
          <div className="w-full flex justify-end mb-8 gap-2">
            <Settings mode={sortMode} onChange={setSortMode} />
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
          {processedCategories.map((category) => (
            <CategoryComponent
              key={category.id}
              category={category}
              options={category.processedOptions}
              selectedValue={selections[category.id]}
              onSelect={(optionId) => handleSelect(category.id, optionId)}
              showWeights={showWeights}
            />
          ))}
        </main>

        <section aria-live="polite">
          {allSelected && (
            <Result
              result={result}
              totalWeight={totalWeight}
              showWeights={showWeights}
              selectedLabels={selectedLabels}
            />
          )}
        </section>

        <footer className="mt-12 pb-8 text-center text-gray-400 dark:text-gray-600 text-xs sm:text-sm">
          <p>
            &copy; {new Date().getFullYear()}{' '}
            <a
              href="https://github.com/StarsEnd33A2D17"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-500 transition-colors underline"
            >
              StarsEnd33A2D17
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
