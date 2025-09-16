'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils';

interface ImageCarouselProps {
  images: string[];
  selectedIndex: number;
  onIndexChange?: (index: number) => void;
  className?: string;
  imageClassName?: string;
  showNavigation?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  shouldPreload?: boolean;
}

export default function ImageCarousel({
  images,
  selectedIndex,
  onIndexChange,
  className = '',
  imageClassName = '',
  showNavigation = true,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 3000,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current?.querySelector('.flex.h-full.w-full');
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const newIndex = Math.round(scrollLeft / containerWidth);

      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < images.length) {
        setCurrentIndex(newIndex);
        onIndexChange?.(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentIndex, images.length, onIndexChange]);

  const goToNext = useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current.querySelector('.flex.h-full.w-full');
      if (container) {
        const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        const scrollLeft = nextIndex * container.clientWidth;
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth',
        });
        setCurrentIndex(nextIndex);
      }
    }
  }, [currentIndex, images.length]);

  const goToPrevious = () => {
    if (containerRef.current) {
      const container = containerRef.current.querySelector('.flex.h-full.w-full');
      if (container) {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        const scrollLeft = prevIndex * container.clientWidth;
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth',
        });
        setCurrentIndex(prevIndex);
      }
    }
  };

  const goToImage = (index: number) => {
    if (index >= 0 && index < images.length && index !== currentIndex && containerRef.current) {
      const container = containerRef.current.querySelector('.flex.h-full.w-full');
      if (container) {
        const scrollLeft = index * container.clientWidth;
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth',
        });
        setCurrentIndex(index);
        // onIndexChange will be called by the scroll event handler
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Click handler for image tap (mobile)
  const handleImageTap = (e: React.MouseEvent) => {
    // Only handle tap if it's not on a button
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }

    if (window.innerWidth < 768) {
      goToNext();
    }
  };

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, goToNext]);

  if (images.length === 0) {
    return (
      <div
        className={cn('flex h-64 items-center justify-center rounded-lg bg-gray-100', className)}
      >
        <p className="text-gray-500">No images to display</p>
      </div>
    );
  }

  return (
    <div className={cn('group relative', className)}>
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleImageTap}
      >
        <div className="scrollbar-hide flex h-full w-full snap-x snap-mandatory items-center overflow-x-auto bg-black">
          {images.map((image, index) => (
            <div key={index} className="flex h-full w-full flex-shrink-0 snap-center snap-always">
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                className={cn('h-auto w-full object-cover', imageClassName)}
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                quality={90}
                width={800}
                height={600}
              />
            </div>
          ))}
        </div>

        {showNavigation && images.length > 1 && (
          <>
            <button
              className={cn(
                'absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition-opacity duration-200',
                'focus:ring-primary-400 hover:bg-black/50 focus:ring-2 focus:outline-none',
                'cursor-pointer opacity-0 group-hover:opacity-100'
              )}
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="size-6" />
            </button>

            <button
              className={cn(
                'absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition-opacity duration-200',
                'focus:ring-primary-400 hover:bg-black/50 focus:ring-2 focus:outline-none',
                'cursor-pointer opacity-0 group-hover:opacity-100'
              )}
              onClick={goToNext}
              aria-label="Next image"
            >
              <ChevronRight className="size-6" />
            </button>
          </>
        )}
      </div>

      {showDots && images.length > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={cn(
                'h-3 w-3 cursor-pointer rounded-full transition-colors duration-200',
                index === currentIndex ? 'bg-primary-400' : 'bg-gray-300 hover:bg-gray-400'
              )}
              onClick={() => goToImage(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {images.length > 1 && (
        <div className="absolute top-4 right-4 rounded bg-black/50 px-2 py-1 text-sm text-white">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
