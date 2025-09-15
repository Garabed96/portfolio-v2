import { useEffect } from 'react';

interface UseImagePreloaderProps {
  images: string[];
  preloadNext?: boolean;
  currentIndex?: number;
}

export function useImagePreloader({ 
  images, 
  preloadNext = true, 
  currentIndex = 0 
}: UseImagePreloaderProps) {
  useEffect(() => {
    if (!preloadNext || images.length === 0) return;

    // Preload the next few images
    const imagesToPreload = images.slice(currentIndex + 1, currentIndex + 3);
    
    imagesToPreload.forEach((imageSrc) => {
      const img = new Image();
      img.src = imageSrc;
    });
  }, [images, preloadNext, currentIndex]);
}

export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}
