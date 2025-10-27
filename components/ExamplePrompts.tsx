import React from 'react';
import { ShuffleIcon } from './icons/ShuffleIcon';

interface ExamplePromptsProps {
  onSelectPrompt: (prompt: string) => void;
  disabled: boolean;
}

const PROMPTS = [
  "A majestic lion wearing a crown, cinematic style",
  "A cute corgi working on a laptop, pixel art",
  "Synthwave sunset over a retro-futuristic city",
  "An enchanted forest library with glowing books",
];

export const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ onSelectPrompt, disabled }) => {
  const handleSurpriseMe = () => {
    const randomPrompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
    onSelectPrompt(randomPrompt);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={handleSurpriseMe}
        disabled={disabled}
        className="flex items-center gap-2 text-sm text-slate-300 bg-slate-800 border border-slate-700 rounded-full px-4 py-2 hover:bg-slate-700 transition-colors disabled:opacity-50"
      >
        <ShuffleIcon className="w-4 h-4" />
        Surprise Me
      </button>
      <div className="hidden sm:flex items-center justify-center gap-2 flex-wrap text-xs text-slate-500">
        <span>Try:</span>
        {PROMPTS.map((prompt, i) => (
          <React.Fragment key={prompt}>
            <button
                onClick={() => onSelectPrompt(prompt)}
                disabled={disabled}
                className="hover:text-slate-300 transition-colors disabled:opacity-50 text-left"
            >
                {prompt}
            </button>
            {i < PROMPTS.length - 1 && <span className="select-none">&bull;</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
