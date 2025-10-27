import React from 'react';

interface AspectRatioSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const RATIOS = ['1:1', '16:9', '9:16', '4:3', '3:4'];

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ value, onChange, disabled }) => {
  return (
    <div className="flex justify-center items-center gap-2">
        <span className="text-sm text-slate-400 mr-2">Aspect Ratio:</span>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-1 flex gap-1 flex-wrap justify-center">
            {RATIOS.map((ratio) => (
            <button
                key={ratio}
                onClick={() => onChange(ratio)}
                disabled={disabled}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                value === ratio
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                {ratio}
            </button>
            ))}
      </div>
    </div>
  );
};
