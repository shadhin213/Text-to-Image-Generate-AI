import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { ImageDisplay } from './components/ImageDisplay';
import { generateImages as generateImagesFromApi } from './services/geminiService';
import { AspectRatioSelector } from './components/AspectRatioSelector';
import { ExamplePrompts } from './components/ExamplePrompts';

export interface GeneratedImage {
    imageUrl: string;
    style: string;
}

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [imageUrls, setImageUrls] = useState<GeneratedImage[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const loadingIntervalRef = useRef<number | null>(null);

  const startLoadingIndicator = () => {
    const messages = [
        'Analyzing prompt...',
        'Contacting AI art directors...',
        'Warming up the pixels for four masterpieces...',
        'Rendering your creations...',
        'Adding the final touches...',
    ];
    let messageIndex = 0;
    setLoadingMessage(messages[messageIndex]);

    if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
    }

    loadingIntervalRef.current = window.setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        setLoadingMessage(messages[messageIndex]);
    }, 2500);
  };

  const stopLoadingIndicator = () => {
    if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
        loadingIntervalRef.current = null;
    }
    setLoadingMessage('');
  };

  useEffect(() => {
    return () => {
        if (loadingIntervalRef.current) {
            clearInterval(loadingIntervalRef.current);
        }
    };
  }, []);

  const handleGenerateImage = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImageUrls(null);
    setGeneratedPrompt(prompt);
    startLoadingIndicator();

    try {
      const urls = await generateImagesFromApi(prompt, aspectRatio);
      setImageUrls(urls);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      console.error("Generation failed:", errorMessage);
      setError(`Failed to generate images. Please try again. Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
      stopLoadingIndicator();
    }
  }, [prompt, isLoading, aspectRatio]);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="flex flex-col items-center justify-center w-full max-w-4xl flex-grow">
        <ImageDisplay
          imageUrls={imageUrls}
          isLoading={isLoading}
          loadingMessage={loadingMessage}
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