import { useEffect } from 'react';

interface UseImagePreloaderProps {
  enable?: boolean;
  images: string[];
  currentIndex?: number;
}

export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

export function useImagePreloader({ enable = true, images }: UseImagePreloaderProps) {
  useEffect(() => {
    if (!enable || images.length === 0) return;

    images.forEach(imageSrc => {
      const img = new Image();
      img.src = imageSrc;
    });
  }, [enable, images]);
}
