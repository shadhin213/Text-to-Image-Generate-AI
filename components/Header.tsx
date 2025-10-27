import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-2xl text-center mb-8">
      <div className="flex items-center justify-center gap-3">
        <SparklesIcon className="w-8 h-8 text-indigo-400" />
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
          AI Image Generator
        </h1>
      </div>
      <p className="mt-2 text-md text-slate-400">
        Bring your ideas to life. Describe anything you can imagine.
      </p>
    </header>
  );
};
