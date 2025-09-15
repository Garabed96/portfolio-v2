'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import useClickOutside from '../hooks/useClickOutside';

const navItems = [
  { id: 'introduction', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' }
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    const snapContainer = document.querySelector('.snap-container') as HTMLElement;

    if (element && snapContainer) {
      // Update active section immediately for better UX
      setActiveSection(sectionId);

      // Set scrolling flag to prevent scroll handler from overriding
      setIsScrolling(true);

      // Scroll the snap container to the section
      snapContainer.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });

      // Reset scrolling flag after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000); // Adjust timing based on your scroll animation
    } else {
      console.warn(`Section with id "${sectionId}" or snap container not found`);
    }
    // Close mobile menu when navigating
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useClickOutside(navbarRef, () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  });

  // Track which section is currently in view
  useEffect(() => {
    const snapContainer = document.querySelector('.snap-container') as HTMLElement;

    if (!snapContainer) {
      console.warn('Snap container not found');
      return;
    }

    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = snapContainer.scrollTop + 100; // Add some buffer

      let activeId = 'introduction';

      // Find the section that's currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          activeId = section.id;
          break;
        }
      }

      setActiveSection(activeId);
    };

    // Call once on mount
    handleScroll();

    snapContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => snapContainer.removeEventListener('scroll', handleScroll);
  }, [isScrolling]);

  return (
    <nav ref={navbarRef} className="fixed top-0 right-0 left-0 z-50 bg-black/20 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('introduction')}
              className="hover:text-primary-400 cursor-pointer text-lg font-medium text-white transition-colors duration-200"
            >
              Mathieu Bertin's Portfolio
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`cursor-pointer px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-primary-400 border-primary-400 border-b-2'
                      : 'hover:text-primary-400 text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              className="hover:text-primary-400 cursor-pointer text-white transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="w-full space-y-1 bg-black/20 px-2 pt-2 pb-3 backdrop-blur-md sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full cursor-pointer px-3 py-2 text-left text-base font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-primary-400 bg-white/10'
                      : 'hover:text-primary-400 text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
