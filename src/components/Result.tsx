import React from 'react';
import type { ProbabilityLevel } from '../types';

interface ResultProps {
  result: ProbabilityLevel;
  totalWeight: number;
  showWeights: boolean;
}

const Result: React.FC<ResultProps> = ({ result, totalWeight, showWeights }) => {
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
      <p className="mt-6 text-sm text-gray-400 dark:text-gray-500 italic">
        * 结果仅供娱乐，不代表任何实际医学或心理学建议。
      </p>
    </div>
  );
};

export default Result;
