import React, { useRef, useEffect } from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isLoading: boolean;
  onGenerate: () => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, isLoading, onGenerate }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [prompt]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onGenerate();
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-slate-800 border border-slate-700 rounded-xl shadow-lg">
      <textarea
        ref={textareaRef}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., A majestic lion wearing a crown, cinematic style..."
        className="w-full bg-transparent text-gray-200 placeholder-slate-500 focus:outline-none resize-none p-2 overflow-y-hidden max-h-48"
        rows={1}
        disabled={isLoading}
        style={{ minHeight: '2.5rem' }} // Corresponds to h-12 in default setup
      />
      <button
        onClick={onGenerate}
        disabled={isLoading || !prompt.trim()}
        className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300 flex-shrink-0 self-end"
      >
        {isLoading ? 'Generating...' : 'Generate'}
      </button>
    </div>
  );
};
