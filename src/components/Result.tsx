import React, { useState } from 'react';
import type { ProbabilityLevel } from '../types';

interface ResultProps {
  result: ProbabilityLevel;
  totalWeight: number;
  showWeights: boolean;
  selectedLabels: string[];
}

const Result: React.FC<ResultProps> = ({ result, totalWeight, showWeights, selectedLabels }) => {
  const [copied, setCopied] = useState(false);

  const summaryString = selectedLabels.join(' + ');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="mt-12 text-center p-8 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg border-2 border-indigo-50 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">计算结果</h3>
      <div className="flex flex-col items-center justify-center">
        <span className={`text-5xl font-black mb-4 ${result.color}`}>{result.message}</span>
        {showWeights && (
          <div className="text-gray-500 dark:text-gray-400 text-sm animate-in fade-in duration-300">
            当前总权重值:{' '}
            <span className="font-mono font-bold text-gray-700 dark:text-gray-200">
              {totalWeight}
            </span>
          </div>
        )}
      </div>

      <div
        onClick={handleCopy}
        className="mt-6 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg cursor-pointer group hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors border border-gray-100 dark:border-gray-700/50 relative"
        title="点击复制"
      >
        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono break-all line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
          {summaryString}
        </p>
        <div
          className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-sm transition-opacity duration-200 ${copied ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          已复制!
        </div>
        <div className="mt-1 text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
          点击复制摘要
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-400 dark:text-gray-500 italic">
        <a
          href="https://github.com/StarsEnd33A2D17/trans-calculator/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-500 transition-colors underline"
        >
          对结果不满意？
        </a>
      </p>
      <p className="mt-6 text-sm text-gray-400 dark:text-gray-500 italic">
        * 结果仅供娱乐，不代表任何实际医学或心理学建议。
      </p>
    </div>
  );
};

export default Result;
