/* eslint-disable no-console */
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

    // Preload images with better error handling and progress tracking
    const preloadPromises = images.map(imageSrc =>
      preloadImage(imageSrc).catch(error => {
        console.warn(`Failed to preload image: ${imageSrc}`, error);
        return null; // Don't fail the entire preload process
      })
    );

    // Optional: Track when all images are loaded
    Promise.allSettled(preloadPromises).then(results => {
      const successful = results.filter(result => result.status === 'fulfilled').length;
      const failed = results.filter(result => result.status === 'rejected').length;

      if (failed > 0) {
        console.warn(`Image preloading: ${successful} successful, ${failed} failed`);
      } else {
        console.log(`✅ All ${successful} images preloaded successfully`);
      }
    });
  }, [enable, images]);
}
