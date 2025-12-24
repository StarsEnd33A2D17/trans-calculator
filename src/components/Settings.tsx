import React from 'react';

export type SortMode = 'random' | 'ordered' | 'weights';

interface SettingsProps {
  mode: SortMode;
  onChange: (mode: SortMode) => void;
}

const Settings: React.FC<SettingsProps> = ({ mode, onChange }) => {
  const modes: { value: SortMode; icon: string; label: string }[] = [
    { value: 'random', icon: '🎲', label: '随机' },
    { value: 'ordered', icon: '📝', label: '有序' },
    { value: 'weights', icon: '📊', label: '权重' },
  ];

  return (
    <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
      {modes.map((m) => (
        <button
          key={m.value}
          onClick={() => onChange(m.value)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all
            ${
              mode === m.value
                ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          aria-label={`Switch to ${m.label} mode`}
        >
          <span>{m.icon}</span>
          <span className="hidden sm:inline">{m.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Settings;
