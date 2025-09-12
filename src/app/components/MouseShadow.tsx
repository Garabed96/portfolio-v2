'use client';

import { useEffect, useRef, useState } from 'react';

const INTENSITY = 0.2;
const INACTIVITY_DELAY = 2000;

export default function MouseShadow() {
  const shadowRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isAutoMoving, setIsAutoMoving] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<number | null>(null);
  const autoMoveStartTime = useRef<number>(0);
  const autoMoveStartPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocity = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Initialize position at center of screen
  useEffect(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setPosition({ x: centerX, y: centerY });
    currentPosition.current = { x: centerX, y: centerY };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (shadowRef.current) {
        const { clientX, clientY } = e;
        const shadowSize = 400;

        // Constrain mouse position to screen boundaries
        const constrainedX = Math.max(
          shadowSize,
          Math.min(window.innerWidth - shadowSize, clientX)
        );
        const constrainedY = Math.max(
          shadowSize,
          Math.min(window.innerHeight - shadowSize, clientY)
        );

        setPosition({ x: constrainedX, y: constrainedY });
        currentPosition.current = { x: constrainedX, y: constrainedY };
        setIsAutoMoving(false);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Set timeout to start auto movement after 3 seconds of no movement
        timeoutRef.current = setTimeout(() => {
          autoMoveStartTime.current = Date.now();
          autoMoveStartPosition.current = {
            x: currentPosition.current.x,
            y: currentPosition.current.y
          };

          velocity.current = {
            x: 0.45 * 4,
            y: 0.45 * 4
          };
          setIsAutoMoving(true);
        }, INACTIVITY_DELAY);
      }
    };

    const handleMouseLeave = () => {
      setIsAutoMoving(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    const handleMouseEnter = () => {
      setIsAutoMoving(false);
    };

    const animateAutoMovement = () => {
      if (isAutoMoving && shadowRef.current) {
        const shadowSize = 400;
        const newX = currentPosition.current.x + velocity.current.x;
        const newY = currentPosition.current.y + velocity.current.y;

        // Bounce off edges
        if (newX - shadowSize <= 0 || newX + shadowSize >= window.innerWidth) {
          velocity.current.x *= -1;
        }
        if (newY - shadowSize <= 0 || newY + shadowSize >= window.innerHeight) {
          velocity.current.y *= -1;
        }

        // Update position
        const finalX = Math.max(shadowSize, Math.min(window.innerWidth - shadowSize, newX));
        const finalY = Math.max(shadowSize, Math.min(window.innerHeight - shadowSize, newY));

        currentPosition.current = { x: finalX, y: finalY };
        setPosition({ x: finalX, y: finalY });
        animationRef.current = requestAnimationFrame(animateAutoMovement);
      }
    };

    if (isAutoMoving) {
      animationRef.current = requestAnimationFrame(animateAutoMovement);
    }

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAutoMoving]);

  return (
    <div
      ref={shadowRef}
      className="mouse-shadow animate-pulse-and-spin"
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: -1,
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        background: `
          radial-gradient(circle at 30% 20%, rgba(255, 0, 150, ${INTENSITY}) 0%, transparent 60%),
          radial-gradient(circle at 70% 30%, rgba(0, 255, 255, ${INTENSITY}) 0%, transparent 60%),
          radial-gradient(circle at 20% 70%, rgba(255, 255, 0, ${INTENSITY}) 0%, transparent 60%),
          radial-gradient(circle at 80% 80%, rgba(150, 0, 255, ${INTENSITY}) 0%, transparent 60%),
          radial-gradient(circle at 50% 50%, rgba(255, 100, 0, ${INTENSITY}) 0%, transparent 80%)
        `,
        filter: 'blur(100px)',
        transition: isAutoMoving ? 'none' : 'opacity 0.5s ease, left 0.1s ease, top 0.1s ease'
      }}
    />
  );
}
