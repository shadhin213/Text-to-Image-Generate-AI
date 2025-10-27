import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { ImageDisplay } from './components/ImageDisplay';
import { generateImage as generateImageFromApi } from './services/geminiService';
import { AspectRatioSelector } from './components/AspectRatioSelector';
import { ExamplePrompts } from './components/ExamplePrompts';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');

  const handleGenerateImage = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null);
    setGeneratedPrompt(prompt);

    try {
      const url = await generateImageFromApi(prompt, aspectRatio);
      setImageUrl(url);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      console.error("Generation failed:", errorMessage);
      setError(`Failed to generate image. Please try again. Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading, aspectRatio]);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="flex flex-col items-center justify-center w-full max-w-2xl flex-grow">
        <ImageDisplay
          imageUrl={imageUrl}
          isLoading={isLoading}
          error={error}
          prompt={generatedPrompt}
          aspectRatio={aspectRatio}
        />
      </main>
      <footer className="w-full max-w-2xl py-4 flex flex-col gap-4">
        <AspectRatioSelector 
            value={aspectRatio}
            onChange={setAspectRatio}
            disabled={isLoading}
        />
        <PromptInput
          prompt={prompt}
          setPrompt={setPrompt}
          isLoading={isLoading}
          onGenerate={handleGenerateImage}
        />
        <ExamplePrompts
            onSelectPrompt={(p) => setPrompt(p)}
            disabled={isLoading}
        />
      </footer>
    </div>
  );
};

export default App;
