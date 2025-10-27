import React from 'react';
import { Spinner } from './Spinner';
import { PhotoIcon } from './icons/PhotoIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { GeneratedImage } from '../App';

interface ImageDisplayProps {
  imageUrls: GeneratedImage[] | null;
  isLoading: boolean;
  loadingMessage: string;
  error: string | null;
  prompt: string;
  aspectRatio: string;
}

const aspectRatioClasses: { [key: string]: string } = {
    '1:1': 'aspect-square',
    '16:9': 'aspect-video',
    '9:16': 'aspect-[9/16]',
    '4:3': 'aspect-[4/3]',
    '3:4': 'aspect-[3/4]',
};

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrls, isLoading, loadingMessage, error, prompt, aspectRatio }) => {
  
  const handleDownload = (imageUrl: string, style: string) => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    const fileName = `${prompt.substring(0, 40).replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'generated'}_${style.toLowerCase()}.jpg`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-slate-400 bg-slate-800/50">
          <Spinner />
          <p className="text-lg text-center px-4">{loadingMessage}</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="absolute inset-0 flex items-center justify-center text-center text-red-400 bg-red-900/20 p-6">
          <div>
            <h3 className="font-bold text-lg mb-2">Oops! Something went wrong.</h3>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      );
    }

    if (imageUrls) {
      return (
         <div className="grid grid-cols-2 gap-2 sm:gap-4 w-full">
            {imageUrls.map(({ imageUrl, style }) => (
                <div key={style} className={`relative w-full h-full group rounded-lg overflow-hidden shadow-lg ${aspectRatioClasses[aspectRatio]}`}>
                    <img
                        src={imageUrl}
                        alt={`${prompt} - ${style}`}
                        className="object-cover w-full h-full transition-opacity duration-500 opacity-0 animate-fade-in"
                        onLoad={(e) => e.currentTarget.style.opacity = '1'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <button
                        onClick={() => handleDownload(imageUrl, style)}
                        className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                        aria-label={`Download ${style} image`}
                    >
                        <DownloadIcon className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                        {style}
                    </div>
                </div>
            ))}
        </div>
      );
    }

    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-slate-500">
        <PhotoIcon className="w-24 h-24" />
        <p className="text-lg text-center">Your 4 generated images will appear here.</p>
      </div>
    );
  };

  return (
    <div className={`w-full bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-2xl flex items-center justify-center p-4 mb-6 transition-all duration-300 relative ${!imageUrls ? 'aspect-square' : ''}`}>
      {renderContent()}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};