'use client';

import { useReducer, useState } from 'react';
import MouseShadow from './components/MouseShadow';
import Navbar from './components/Navbar';
import {
  GithubIcon,
  LinkedinIcon,
  DocxIcon,
  PdfIcon,
  TypeScriptIcon,
  SolidityIcon,
  PostgreSQLIcon,
  NextjsIcon,
  ReactIcon,
  NuxtjsIcon,
  VuejsIcon,
  TailwindcssIcon,
  DatabaseIcon,
  SmartContractIcon,
  BackendSystemsIcon
} from './components/icons';
import pointsAppScreen1 from './assets/points-app-screen-1.png';
import pointsAppScreen2 from './assets/points-app-screen-2.png';
import webWalletScreen1 from './assets/web-wallet-screen-1.png';
import webWalletScreen2 from './assets/web-wallet-screen-2.png';
import webWalletScreen3 from './assets/web-wallet-screen-3.png';
import nodeOperatorDashboardScreen1 from './assets/node-operator-dashboard-screen-1.png';
import nodeOperatorDashboardScreen2 from './assets/node-operator-dashboard-screen-2.png';
import nodeOperatorDashboardScreen3 from './assets/node-operator-dashboard-screen-3.png';
import webMessengerScreen1 from './assets/web-messenger-screen-1.png';
import webMessengerScreen2 from './assets/web-messenger-screen-2.png';
import webMessengerScreen3 from './assets/web-messenger-screen-3.png';
import tokenSaleScreen1 from './assets/token-sale-screen-1.png';
import tokenSaleScreen2 from './assets/token-sale-screen-2.png';
import tokenDashboardScreen1 from './assets/token-dashboard-screen-1.png';
import tokenDashboardScreen2 from './assets/token-dashboard-screen-2.png';
import tokenDashboardScreen3 from './assets/token-dashboard-screen-3.png';

import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { cn } from '@/utils';
import { StaticImageData } from 'next/image';

type Project = {
  name: string;
  repo?: string;
  url?: string;
  images: StaticImageData[];
};

const projects: Project[] = [
  {
    name: 'token dashboards',
    repo: 'https://github.com/Burtonium/token-dashboard',
    url: 'https://staging.vip.realworldgaming.io',
    images: [tokenDashboardScreen1, tokenDashboardScreen2, tokenDashboardScreen3]
  },
  {
    name: 'token sale portals',
    repo: 'https://github.com/Burtonium/token-sale-portal',
    images: [tokenSaleScreen1, tokenSaleScreen2],
    url: 'https://sale.getrealtoken.io/'
  },
  {
    name: 'points applications',
    url: 'https://quest.talisman.xyz/',
    images: [pointsAppScreen1, pointsAppScreen2]
  },
  {
    name: 'web wallets',
    repo: 'https://github.com/xxfoundation/wallet.xx.network',
    url: 'https://wallet.xx.network/',
    images: [webWalletScreen1, webWalletScreen2, webWalletScreen3]
  },
  {
    name: 'web messengers',
    repo: 'https://github.com/xxfoundation/haven',
    url: 'https://haven.xx.network/',
    images: [webMessengerScreen1, webMessengerScreen2, webMessengerScreen3]
  },
  {
    name: 'node operator dashboards',
    repo: 'https://github.com/Burtonium/node-operator-dashboard',
    url: 'https://dashboard.xx.network/',
    images: [
      nodeOperatorDashboardScreen1,
      nodeOperatorDashboardScreen2,
      nodeOperatorDashboardScreen3
    ]
  }
] as const;

// Action types
type Action =
  | { type: 'nextProject' }
  | { type: 'previousProject' }
  | { type: 'nextImage' }
  | { type: 'previousImage' };

// State type
interface State {
  selectedProject: (typeof projects)[number];
  selectedImage: number;
  hasNextImage: boolean;
  hasPreviousImage: boolean;
}

// Initial state
const initialState: State = {
  selectedProject: projects[0],
  selectedImage: 0,
  hasNextImage: projects[0].images.length > 1,
  hasPreviousImage: false
};

function portfolioReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'nextProject': {
      const currentIndex = projects.findIndex(
        (project) => project.name === state.selectedProject.name
      );
      const nextIndex = currentIndex + 1 === projects.length ? 0 : currentIndex + 1;
      const nextProject = projects[nextIndex];
      return {
        ...state,
        selectedProject: nextProject,
        selectedImage: 0,
        hasNextImage: nextProject.images.length > 1,
        hasPreviousImage: false
      };
    }
    case 'previousProject': {
      const currentIndex = projects.findIndex(
        (project) => project.name === state.selectedProject.name
      );
      const prevIndex = currentIndex - 1 < 0 ? projects.length - 1 : currentIndex - 1;
      const prevProject = projects[prevIndex];
      return {
        ...state,
        selectedProject: prevProject,
        selectedImage: 0,
        hasNextImage: prevProject.images.length > 1,
        hasPreviousImage: false
      };
    }
    case 'nextImage': {
      const newImageIndex = state.selectedImage + 1;
      const hasNext = newImageIndex < state.selectedProject.images.length - 1;
      const hasPrevious = newImageIndex > 0;

      // Don't allow going beyond the last image
      if (newImageIndex >= state.selectedProject.images.length) {
        return state;
      }

      return {
        ...state,
        selectedImage: newImageIndex,
        hasNextImage: hasNext,
        hasPreviousImage: hasPrevious
      };
    }
    case 'previousImage': {
      const newImageIndex = state.selectedImage - 1;
      const hasNext = newImageIndex < state.selectedProject.images.length - 1;
      const hasPrevious = newImageIndex > 0;

      // Don't allow going below the first image
      if (newImageIndex < 0) {
        return state;
      }

      return {
        ...state,
        selectedImage: newImageIndex,
        hasNextImage: hasNext,
        hasPreviousImage: hasPrevious
      };
    }
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleNextProject = () => {
    dispatch({ type: 'nextProject' });
  };

  const handlePreviousProject = () => {
    dispatch({ type: 'previousProject' });
  };

  const handleNextImage = () => {
    if (state.hasNextImage) {
      dispatch({ type: 'nextImage' });
    } else {
      // If no next image, go to next project
      handleNextProject();
    }
  };

  const handlePreviousImage = () => {
    dispatch({ type: 'previousImage' });
  };

  // Touch event handlers for mobile gestures
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
      // Swipe left - go to next project
      handleNextProject();
    } else if (isRightSwipe) {
      // Swipe right - go to previous project
      handlePreviousProject();
    }
  };

  // Tap handler for next image
  const handleImageTap = (e: React.MouseEvent) => {
    // Only handle tap if it's not on a button
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }

    // Check if we're on mobile (screen width < 768px)
    if (window.innerWidth < 768) {
      if (state.hasNextImage) {
        handleNextImage();
      } else {
        // If no next image, go to next project
        handleNextProject();
      }
    }
  };

  return (
    <main className="snap-container">
      <Navbar />
      <MouseShadow />
      <section
        id="introduction"
        className="main-section relative z-10 flex flex-col items-center justify-center px-4 pt-24 pb-16 md:px-8 md:pt-28 md:pb-20 lg:px-12 lg:pt-32 lg:pb-24"
        aria-label="Hero section with personal introduction"
      >
        <div className="flex w-full items-center justify-center">
          <div className="absolute top-0 z-10 h-full w-full backdrop-brightness-50" />
          <div className="relative z-10 h-full w-full p-5 md:p-12 lg:p-32">
            <div className="container mx-auto max-w-6xl space-y-5">
              <h1 className="text-4xl leading-none md:text-5xl xl:text-6xl">Mathieu Bertin</h1>
              <div>
                <h2 className="text-primary-400 mb-8 text-4xl leading-none md:text-5xl xl:text-6xl">
                  Full Stack Developer
                </h2>
                <p className="font-title text-lg leading-6 md:text-xl lg:text-2xl">
                  with 10+ years of development experience and exactly 0 professional design
                  experience.
                </p>
              </div>
              <ol className="mt-5 space-y-2 lg:flex lg:space-y-0 lg:space-x-5 lg:text-lg">
                <li>
                  <a
                    rel="noopener"
                    className="hover:text-primary-400 flex cursor-pointer items-center space-x-1"
                    href="https://github.com/burtonium/"
                  >
                    <GithubIcon />
                    <span>Github</span>
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener"
                    className="hover:text-primary-400 flex cursor-pointer items-center space-x-1"
                    href="https://www.linkedin.com/in/mathieu-bertin"
                  >
                    <LinkedinIcon />
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li className="flex items-center space-x-1">
                  <form method="get" action="Resume.docx">
                    <button
                      className="hover:text-primary-400 flex cursor-pointer items-center space-x-1"
                      type="submit"
                    >
                      <DocxIcon />
                      <span>Docx Resume</span>
                    </button>
                  </form>
                </li>
                <li className="flex items-center space-x-1">
                  <form method="get" action="Resume.pdf">
                    <button
                      className="hover:text-primary-400 group flex cursor-pointer items-center space-x-1"
                      type="submit"
                    >
                      <PdfIcon />
                      <span>PDF Resume</span>
                    </button>
                  </form>
                </li>
              </ol>
              <div>
                <h4 className="text-primary-400 mb-2 max-w-[12rem] text-lg font-medium md:text-xl lg:max-w-none lg:text-2xl">
                  Technologies
                </h4>
                <ol className="flex max-w-4xl flex-wrap items-center gap-3">
                  <li className="flex items-center space-x-1">
                    <TypeScriptIcon />
                    <span>Typescript</span>
                  </li>
                  <li className="flex items-center">
                    <SolidityIcon />
                    <span>Solidity</span>
                  </li>
                  <li>
                    <a rel="noopener" href="https://www.postgresql.org/">
                      <PostgreSQLIcon />
                    </a>
                    <span>Postgresql</span>
                  </li>

                  <li className="flex items-center space-x-1">
                    <NextjsIcon />
                    <span>Nextjs</span>
                  </li>

                  <li className="flex items-center space-x-1">
                    <ReactIcon />
                    <span>React</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <NuxtjsIcon />
                    <span>Nuxtjs</span>
                  </li>

                  <li className="flex items-center space-x-1">
                    <VuejsIcon />
                    <span>Vuejs</span>
                  </li>

                  <li className="flex items-center space-x-1">
                    <TailwindcssIcon />
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="skills"
        className="main-section flex flex-col items-center justify-center space-y-10 px-4 py-16 text-center md:px-8 md:py-20 lg:px-12 lg:py-24"
      >
        <div className="flex flex-col gap-1 md:gap-2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl">I make web3/blockchain</h2>
          <h2 className="text-primary-400 text-5xl md:text-6xl lg:text-7xl">web applications</h2>
          <h2 className="text-3xl md:text-4xl lg:text-5xl">entirely from scratch.</h2>
        </div>
        <p className="text-base md:text-lg lg:text-xl">
          Meaning I can provide value at <strong>every level</strong> of making a web application
          for your web3/blockchain business.
        </p>
        <ol className="grid max-w-6xl grid-cols-1 gap-5 py-5 text-left lg:grid-cols-2">
          <li className="frosted-glass-dark flex items-center space-x-4 rounded-xl p-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg">
              <DatabaseIcon />
            </div>
            <p>Database architecture and implementation.</p>
          </li>
          <li className="frosted-glass-dark flex items-center space-x-4 rounded-xl p-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg">
              <SmartContractIcon />
            </div>
            <p>Smart Contract auditing, development and deployment.</p>
          </li>
          <li className="frosted-glass-dark flex items-center space-x-4 rounded-xl p-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg">
              <BackendSystemsIcon />
            </div>
            <p>Developing backend services or designing intuitive RESTful APIs.</p>
          </li>
          <li className="frosted-glass-dark flex items-center space-x-4 rounded-xl p-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg">
              <ReactIcon className="h-12 w-12" />
            </div>
            <p>Building beautiful, responsive, and performant frontends.</p>
          </li>
        </ol>
      </section>
      <section className="main-section flex flex-col items-center justify-center" id="projects">
        <h2 className="mb-12 px-3 text-center text-3xl md:text-4xl lg:text-5xl">
          I've made &nbsp;
          {projects.map((project) => (
            <span
              key={project.name}
              className={
                project.name === state.selectedProject.name ? 'text-primary-400' : 'hidden'
              }
            >
              {project.name}
            </span>
          ))}
          .
        </h2>
        <div className="relative">
          <div className="hidden md:flex">
            <button className="text-primary-400 cursor-pointer" onClick={handlePreviousProject}>
              <ChevronFirst className="size-16" />
            </button>
            <button
              className={cn(
                'cursor-pointer',
                state.hasPreviousImage ? 'text-primary-400' : 'cursor-not-allowed text-gray-500'
              )}
              onClick={handlePreviousImage}
              disabled={!state.hasPreviousImage}
            >
              <ChevronLeft className="size-16" />
            </button>
            <div className="relative grow">
              {(() => {
                const currentProject = projects.find(
                  (project) => project.name === state.selectedProject.name
                );
                if (currentProject && 'images' in currentProject && currentProject.images) {
                  return (
                    <>
                      <img
                        src={currentProject.images[state.selectedImage]?.src}
                        alt={`${currentProject.name} screenshot ${state.selectedImage + 1}`}
                        className="w-full max-w-5xl drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                      />
                      {/* Overlay icons in bottom right */}
                      <div className="absolute right-4 bottom-4 flex gap-2">
                        {currentProject.repo && (
                          <a
                            href={currentProject.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-black/70 p-2 text-white transition-colors hover:bg-black/90"
                            title="View on GitHub"
                          >
                            <GithubIcon className="text-primary-400 h-10 w-10 drop-shadow-lg lg:h-12 lg:w-12" />
                          </a>
                        )}
                        {currentProject.url && (
                          <a
                            href={currentProject.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-black/70 p-2 text-white transition-colors hover:bg-black/90"
                            title="Visit website"
                          >
                            <ExternalLink className="text-primary-400 h-10 w-10 drop-shadow-lg lg:h-12 lg:w-12" />
                          </a>
                        )}
                      </div>
                    </>
                  );
                }
                return <div className="aspect-square">No image available</div>;
              })()}
            </div>
            <button className="text-primary-400 cursor-pointer" onClick={handleNextImage}>
              <ChevronRight className="size-16" />
            </button>
            <button className="text-primary-400 cursor-pointer" onClick={handleNextProject}>
              <ChevronLast className="size-16" />
            </button>
          </div>

          {/* Mobile layout - buttons overlaid on image */}
          <div
            className="relative md:hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={handleImageTap}
          >
            {(() => {
              const currentProject = projects.find(
                (project) => project.name === state.selectedProject.name
              );
              if (currentProject && 'images' in currentProject && currentProject.images) {
                return (
                  <>
                    <img
                      src={currentProject.images[state.selectedImage]?.src}
                      alt={`${currentProject.name} screenshot ${state.selectedImage + 1}`}
                      className="w-full drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                    />
                    {/* Overlay icons in bottom right */}
                    <div className="absolute right-4 bottom-4 flex gap-2">
                      {currentProject.repo && (
                        <a
                          href={currentProject.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-black/70 p-2 text-white transition-colors hover:bg-black/90"
                          title="View on GitHub"
                        >
                          <GithubIcon className="text-primary-400 h-8 w-8 drop-shadow-lg" />
                        </a>
                      )}
                      {currentProject.url && (
                        <a
                          href={currentProject.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-black/70 p-2 text-white transition-colors hover:bg-black/90"
                          title="Visit website"
                        >
                          <ExternalLink className="text-primary-400 h-8 w-8 drop-shadow-lg" />
                        </a>
                      )}
                    </div>
                    {/* Mobile navigation buttons overlaid on image */}
                    <div className="absolute top-1/2 right-0 left-0 flex items-center justify-between px-2">
                      <div className="flex gap-2">
                        <button
                          className="text-primary-400 cursor-pointer rounded-full bg-black/30 p-2"
                          onClick={handlePreviousProject}
                        >
                          <ChevronFirst className="size-8" />
                        </button>
                        <button
                          className={cn(
                            'cursor-pointer rounded-full bg-black/30 p-2',
                            state.hasPreviousImage
                              ? 'text-primary-400'
                              : 'cursor-not-allowed text-gray-500'
                          )}
                          onClick={handlePreviousImage}
                          disabled={!state.hasPreviousImage}
                        >
                          <ChevronLeft className="size-8" />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="text-primary-400 cursor-pointer rounded-full bg-black/30 p-2"
                          onClick={handleNextImage}
                        >
                          <ChevronRight className="size-8" />
                        </button>
                        <button
                          className="text-primary-400 cursor-pointer rounded-full bg-black/30 p-2"
                          onClick={handleNextProject}
                        >
                          <ChevronLast className="size-8" />
                        </button>
                      </div>
                    </div>
                  </>
                );
              }
              return <div className="aspect-square w-full">No image available</div>;
            })()}
          </div>
        </div>
        <p className="text-primary-400/75 mt-5 max-w-xl text-center text-sm">
          **Some of these project urls are <strong>not production deployments</strong> and may be
          moved, be partially broken or completely down. Please notify me if you find any issues.**
        </p>
      </section>
      <section
        id="experience"
        className="main-section px-4 py-16 text-center text-white md:px-8 md:py-20 lg:px-12 lg:py-24"
        aria-label="Work experience section"
      >
        <h2 className="mb-12 text-3xl md:text-4xl lg:text-5xl">Recent Work Experience</h2>
        <div className="m-auto grid max-w-6xl gap-10 text-left lg:grid-cols-2 [&>*:nth-child(odd):last-child]:lg:col-span-2 [&>*:nth-child(odd):last-child]:lg:max-w-2xl [&>*:nth-child(odd):last-child]:lg:justify-self-center">
          <div className="frosted-glass-dark space-y-4 p-5">
            <div>
              <h3 className="mb-2 text-2xl leading-tight md:text-3xl lg:text-4xl">
                Senior Full Stack Web3 Developer
              </h3>
              <p>
                <span className="font-bold text-white">APACX · Remote</span>&nbsp;
                <span className="mb-4 text-gray-300">[June 2025 – Current]</span>
              </p>
            </div>

            <div>
              <h4 className="mb-0 text-lg md:text-xl">Tech utilized:</h4>
              <ol className="mt-0 flex flex-wrap">
                <li className="m-2 flex items-center gap-x-1">
                  <img
                    className="inline"
                    width="22"
                    height="22"
                    src="https://cdn-icons-png.flaticon.com/512/919/919832.png"
                    alt="TypeScript logo"
                  />
                  <span>Typescript</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <svg
                    className="h-8"
                    viewBox="0 0 165 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M75.547 29.84v-7.782h-8.743v7.782H63.74V12.176h3.064V19.6h8.743v-7.425h3.093V29.84h-3.093ZM93.885 29.843l-.613-2.125c-.67 1.105-2.648 2.325-5.6 2.325-3.065 0-5.516-1.353-5.516-4.335 0-2.594 1.866-3.783 5.933-4.167l4.487-.442c-.084-2.054-.837-3.243-3.71-3.243-2.647 0-3.37 1.05-3.37 2.816l-2.903.029c0-2.927 1.226-5.188 6.241-5.188 5.822 0 6.661 2.486 6.661 6.292v8.033l-1.61.005Zm-1.31-6.514-4.036.442c-2.478.278-3.315.801-3.315 1.906 0 1.297 1.115 2.042 3.204 2.042 2.618 0 4.152-1.49 4.152-3.947l-.004-.443ZM105.419 18.082c-2.981 0-3.572 1.636-3.572 3.919v7.839h-2.975V15.708h1.589l.703 1.96c.446-.938 1.81-2.153 4.596-2.153h.475v2.623c-.288 0-.565-.056-.816-.056ZM119.74 29.841l-.67-2.016c-.501.967-2.089 2.21-5.465 2.21-4.708 0-6.103-3.395-6.103-7.26 0-3.865 1.338-7.259 6.073-7.259 2.815 0 4.236.994 4.849 1.933v-7.123h2.926v19.515h-1.61Zm-5.267-11.844c-3.258 0-3.927 1.932-3.927 4.775 0 2.842.67 4.83 3.901 4.83 3.315 0 4.011-1.932 4.011-4.83 0-2.73-.583-4.772-3.984-4.772l-.001-.003ZM135.204 29.841v-7.922c0-2.65-.447-3.919-3.485-3.919-3.007 0-3.65 1.242-3.65 3.919l-.054 7.922h-2.925V10.326h2.926v7.144c.556-1.014 1.809-1.959 4.541-1.959 4.653 0 5.6 2.623 5.6 6.68v7.645l-2.953.005ZM152.813 29.843l-.613-2.125c-.67 1.105-2.648 2.325-5.605 2.325-3.066 0-5.517-1.353-5.517-4.335 0-2.594 1.867-3.783 5.935-4.167l4.484-.442c-.078-2.054-.83-3.243-3.709-3.243-2.645 0-3.371 1.05-3.371 2.816l-2.903.029c0-2.927 1.227-5.188 6.241-5.188 5.823 0 6.662 2.486 6.662 6.292v8.033l-1.604.005Zm-1.309-6.514-4.037.442c-2.478.278-3.315.801-3.315 1.906 0 1.297 1.115 2.042 3.204 2.042 2.618 0 4.152-1.49 4.152-3.947l-.004-.443ZM161.256 18.082v7.7c0 1.326.557 1.933 3.65 1.796v2.369c-4.708.276-6.686-.829-6.686-4.17v-7.695h-2.036v-1.766l2.034-.607v-3.533h2.953v3.533h3.733v2.369l-3.648.004Z"
                      fill="currentColor"
                    />
                    <path
                      d="M50.782 34.189v-2.421c0-.45-.757-.879-2.116-1.266l.033-3.013c0-4.642-1.44-9.171-4.126-12.975a22.825 22.825 0 0 0-10.886-8.29l-.097-.604a1.722 1.722 0 0 0-.408-.872 1.747 1.747 0 0 0-.815-.521 23.148 23.148 0 0 0-12.925 0c-.317.093-.6.273-.818.52-.217.246-.36.548-.41.872l-.093.563a22.831 22.831 0 0 0-10.962 8.283A22.498 22.498 0 0 0 3 27.488v3.026c-1.34.386-2.087.81-2.087 1.257v2.421A.59.59 0 0 0 1 34.6a5.852 5.852 0 0 1 2.247-1.015c2.072-.5 4.179-.85 6.303-1.046a4.25 4.25 0 0 1 3.307 1.057 8.95 8.95 0 0 0 6.009 2.312H32.83a8.943 8.943 0 0 0 6.008-2.314 4.253 4.253 0 0 1 3.308-1.069c2.123.196 4.23.544 6.302 1.042a5.26 5.26 0 0 1 2.13.925c.035.035.078.066.108.099a.6.6 0 0 0 .096-.402Z"
                      fill="#FFF100"
                    />
                    <path
                      d="M12.89 29.094a53.064 53.064 0 0 1-.03-1.673c.007-8.416 1.992-15.964 5.262-21.235A22.831 22.831 0 0 0 7.16 14.468 22.498 22.498 0 0 0 3 27.488v3.026a55.9 55.9 0 0 1 9.89-1.42Z"
                      fill="url(#a)"
                    />
                    <path
                      d="M48.697 27.488a22.425 22.425 0 0 0-5.215-14.396 46.55 46.55 0 0 1 2.162 14.325c0 .82-.022 1.63-.06 2.435a28.49 28.49 0 0 1 3.074.648l.038-3.012Z"
                      fill="url(#b)"
                    />
                    <path
                      d="M48.448 33.576c-2.073-.5-4.18-.85-6.303-1.046a4.252 4.252 0 0 0-3.308 1.062 8.943 8.943 0 0 1-6.009 2.313H18.87a8.948 8.948 0 0 1-6.006-2.312 4.249 4.249 0 0 0-3.308-1.071c-2.124.196-4.23.546-6.303 1.045a5.929 5.929 0 0 0-2.246 1.015c1.06 1.608 11.782 3.295 24.846 3.295 13.065 0 23.782-1.693 24.844-3.294-.037-.032-.078-.063-.109-.098a5.463 5.463 0 0 0-2.14-.909Z"
                      fill="url(#c)"
                    />
                    <path d="M25.846 10.414 20.5 19.436l5.346 3.29V10.413Z" fill="#0A0A0A" />
                    <path
                      d="M25.848 10.417v12.306l5.345-3.284-5.345-9.022ZM25.848 24.51v4.291c.1-.142 5.345-7.58 5.345-7.583l-5.345 3.293Z"
                      fill="#4B4D4D"
                    />
                    <path d="m25.848 24.512-5.346-3.288 5.346 7.58V24.51v.002Z" fill="#0A0A0A" />
                    <defs>
                      <linearGradient
                        id="a"
                        x1="10.561"
                        y1="30.514"
                        x2="10.561"
                        y2="6.186"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#EDCF00" />
                        <stop offset=".33" stopColor="#F0D500" />
                        <stop offset=".77" stopColor="#F9E500" />
                        <stop offset="1" stopColor="#FFF100" />
                      </linearGradient>
                      <linearGradient
                        id="b"
                        x1="46.089"
                        y1="30.692"
                        x2="46.089"
                        y2="13.092"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#EDCF00" />
                        <stop offset=".59" stopColor="#F7E100" />
                        <stop offset="1" stopColor="#FFF100" />
                      </linearGradient>
                      <radialGradient
                        id="c"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="matrix(18.5398 0 0 18.4136 3.701 47.135)"
                      >
                        <stop stopColor="#FFF100" />
                        <stop offset=".23" stopColor="#F9E500" />
                        <stop offset=".67" stopColor="#F0D500" />
                        <stop offset="1" stopColor="#EDCF00" />
                      </radialGradient>
                    </defs>
                  </svg>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <svg className="inline" viewBox="0 0 180 180" width="18">
                    <mask
                      height="180"
                      id=":r8:mask0_408_134"
                      maskUnits="userSpaceOnUse"
                      width="180"
                      x="0"
                      y="0"
                      style={{ maskType: 'alpha' }}
                    >
                      <circle cx="90" cy="90" fill="black" r="90"></circle>
                    </mask>
                    <g mask="url(#:r8:mask0_408_134)">
                      <circle cx="90" cy="90" data-circle="true" fill="black" r="90"></circle>
                      <path
                        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
                        fill="url(#:r8:paint0_linear_408_134)"
                      ></path>
                      <rect
                        fill="url(#:r8:paint1_linear_408_134)"
                        height="72"
                        width="12"
                        x="115"
                        y="54"
                      ></rect>
                    </g>
                    <defs>
                      <linearGradient
                        gradientUnits="userSpaceOnUse"
                        id=":r8:paint0_linear_408_134"
                        x1="109"
                        x2="144.5"
                        y1="116.5"
                        y2="160.5"
                      >
                        <stop stopColor="white"></stop>
                        <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                      </linearGradient>
                      <linearGradient
                        gradientUnits="userSpaceOnUse"
                        id=":r8:paint1_linear_408_134"
                        x1="121"
                        x2="120.799"
                        y1="54"
                        y2="106.875"
                      >
                        <stop stopColor="white"></stop>
                        <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span>Nextjs</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <a href="https://www.postgresql.org/">
                    <img
                      className="inline"
                      width="22"
                      height="22"
                      src="https://www.postgresql.org/media/img/about/press/elephant.png"
                      alt="PostgreSQL logo"
                    />
                  </a>
                  <span>Postgresql</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <svg viewBox="0 0 248 31" className="h-4 w-auto text-white">
                    <title>Tailwind</title>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"
                      fill="#38bdf8"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M76.546 12.825h-4.453v8.567c0 2.285 1.508 2.249 4.453 2.106v3.463c-5.962.714-8.332-.928-8.332-5.569v-8.567H64.91V9.112h3.304V4.318l3.879-1.143v5.937h4.453v3.713zM93.52 9.112h3.878v17.849h-3.878v-2.57c-1.365 1.891-3.484 3.034-6.285 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.285 2.999V9.112zm-5.674 14.636c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm16.016-17.313c-1.364 0-2.477-1.142-2.477-2.463a2.475 2.475 0 012.477-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.879v17.849h-3.879zm8.368 0V.9h3.878v26.06h-3.878zm29.053-17.849h4.094l-5.638 17.849h-3.807l-3.735-12.03-3.771 12.03h-3.806l-5.639-17.849h4.094l3.484 12.315 3.771-12.315h3.699l3.734 12.315 3.52-12.315zm8.906-2.677c-1.365 0-2.478-1.142-2.478-2.463a2.475 2.475 0 012.478-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.878v17.849h-3.878zm17.812-18.313c4.022 0 6.895 2.713 6.895 7.354V26.96h-3.878V16.394c0-2.713-1.58-4.14-4.022-4.14-2.55 0-4.561 1.499-4.561 5.14v9.567h-3.879V9.112h3.879v2.285c1.185-1.856 3.124-2.749 5.566-2.749zm25.282-6.675h3.879V26.96h-3.879v-2.57c-1.364 1.892-3.483 3.034-6.284 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.284 2.999V1.973zm-5.674 21.775c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm22.553 3.677c-5.423 0-9.481-4.105-9.481-9.389 0-5.318 4.058-9.388 9.481-9.388 3.519 0 6.572 1.82 8.008 4.605l-3.34 1.928c-.79-1.678-2.549-2.749-4.704-2.749-3.16 0-5.566 2.392-5.566 5.604 0 3.213 2.406 5.605 5.566 5.605 2.155 0 3.914-1.107 4.776-2.749l3.34 1.892c-1.508 2.82-4.561 4.64-8.08 4.64zm14.472-13.387c0 3.249 9.661 1.285 9.661 7.89 0 3.57-3.125 5.497-7.003 5.497-3.591 0-6.177-1.607-7.326-4.177l3.34-1.927c.574 1.606 2.011 2.57 3.986 2.57 1.724 0 3.052-.571 3.052-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.909-5.462 6.572-5.462 2.945 0 5.387 1.357 6.644 3.713l-3.268 1.82c-.647-1.392-1.904-2.035-3.376-2.035-1.401 0-2.622.607-2.622 1.892zm16.556 0c0 3.249 9.66 1.285 9.66 7.89 0 3.57-3.124 5.497-7.003 5.497-3.591 0-6.176-1.607-7.326-4.177l3.34-1.927c.575 1.606 2.011 2.57 3.986 2.57 1.724 0 3.053-.571 3.053-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.908-5.462 6.572-5.462 2.944 0 5.386 1.357 6.643 3.713l-3.268 1.82c-.646-1.392-1.903-2.035-3.375-2.035-1.401 0-2.622.607-2.622 1.892z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <svg
                    className="-mb-2.5 w-8"
                    viewBox="0 -51.5 256 256"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    preserveAspectRatio="xMidYMid"
                  >
                    <title>AWS</title>
                    <g>
                      <path
                        d="M72.392053,55.4384106 C72.392053,58.5748344 72.7311258,61.1178808 73.3245033,62.9827815 C74.002649,64.8476821 74.8503311,66.8821192 76.0370861,69.0860927 C76.4609272,69.7642384 76.6304636,70.4423841 76.6304636,71.0357616 C76.6304636,71.8834437 76.1218543,72.7311258 75.0198675,73.5788079 L69.6794702,77.1390728 C68.9165563,77.6476821 68.1536424,77.9019868 67.4754967,77.9019868 C66.6278146,77.9019868 65.7801325,77.4781457 64.9324503,76.7152318 C63.7456954,75.4437086 62.7284768,74.0874172 61.8807947,72.7311258 C61.0331126,71.2900662 60.1854305,69.6794702 59.2529801,67.7298013 C52.6410596,75.5284768 44.3337748,79.4278146 34.3311258,79.4278146 C27.210596,79.4278146 21.5311258,77.3933775 17.3774834,73.3245033 C13.2238411,69.2556291 11.1046358,63.8304636 11.1046358,57.0490066 C11.1046358,49.8437086 13.6476821,43.994702 18.818543,39.586755 C23.989404,35.1788079 30.8556291,32.9748344 39.586755,32.9748344 C42.4688742,32.9748344 45.4357616,33.2291391 48.5721854,33.6529801 C51.7086093,34.0768212 54.9298013,34.7549669 58.3205298,35.5178808 L58.3205298,29.3298013 C58.3205298,22.8874172 56.9642384,18.394702 54.3364238,15.7668874 C51.6238411,13.1390728 47.0463576,11.8675497 40.5192053,11.8675497 C37.5523179,11.8675497 34.5006623,12.2066225 31.3642384,12.9695364 C28.2278146,13.7324503 25.1761589,14.6649007 22.2092715,15.8516556 C20.8529801,16.4450331 19.8357616,16.784106 19.2423841,16.9536424 C18.6490066,17.1231788 18.2251656,17.207947 17.8860927,17.207947 C16.6993377,17.207947 16.1059603,16.3602649 16.1059603,14.5801325 L16.1059603,10.4264901 C16.1059603,9.07019868 16.2754967,8.05298013 16.6993377,7.45960265 C17.1231788,6.86622517 17.8860927,6.27284768 19.0728477,5.6794702 C22.0397351,4.15364238 25.6,2.88211921 29.7536424,1.86490066 C33.9072848,0.762913907 38.3152318,0.254304636 42.9774834,0.254304636 C53.0649007,0.254304636 60.4397351,2.54304636 65.186755,7.1205298 C69.8490066,11.6980132 72.2225166,18.6490066 72.2225166,27.9735099 L72.2225166,55.4384106 L72.392053,55.4384106 Z M37.9761589,68.3231788 C40.7735099,68.3231788 43.6556291,67.8145695 46.7072848,66.797351 C49.7589404,65.7801325 52.4715232,63.9152318 54.7602649,61.3721854 C56.1165563,59.7615894 57.1337748,57.981457 57.6423841,55.9470199 C58.1509934,53.9125828 58.4900662,51.4543046 58.4900662,48.5721854 L58.4900662,45.0119205 C56.0317881,44.418543 53.4039735,43.9099338 50.6913907,43.5708609 C47.9788079,43.2317881 45.3509934,43.0622517 42.7231788,43.0622517 C37.0437086,43.0622517 32.8900662,44.1642384 30.0927152,46.4529801 C27.2953642,48.7417219 25.9390728,51.9629139 25.9390728,56.2013245 C25.9390728,60.1854305 26.9562914,63.1523179 29.0754967,65.186755 C31.1099338,67.3059603 34.0768212,68.3231788 37.9761589,68.3231788 Z M106.045033,77.4781457 C104.519205,77.4781457 103.501987,77.2238411 102.823841,76.6304636 C102.145695,76.1218543 101.552318,74.9350993 101.043709,73.3245033 L81.1231788,7.7986755 C80.6145695,6.10331126 80.3602649,5.0013245 80.3602649,4.40794702 C80.3602649,3.05165563 81.0384106,2.28874172 82.394702,2.28874172 L90.7019868,2.28874172 C92.3125828,2.28874172 93.4145695,2.54304636 94.007947,3.13642384 C94.6860927,3.64503311 95.194702,4.83178808 95.7033113,6.44238411 L109.944371,62.5589404 L123.168212,6.44238411 C123.592053,4.74701987 124.100662,3.64503311 124.778808,3.13642384 C125.456954,2.62781457 126.643709,2.28874172 128.169536,2.28874172 L134.950993,2.28874172 C136.561589,2.28874172 137.663576,2.54304636 138.341722,3.13642384 C139.019868,3.64503311 139.613245,4.83178808 139.952318,6.44238411 L153.345695,63.2370861 L168.010596,6.44238411 C168.519205,4.74701987 169.112583,3.64503311 169.70596,3.13642384 C170.384106,2.62781457 171.486093,2.28874172 173.011921,2.28874172 L180.895364,2.28874172 C182.251656,2.28874172 183.01457,2.96688742 183.01457,4.40794702 C183.01457,4.83178808 182.929801,5.25562914 182.845033,5.76423841 C182.760265,6.27284768 182.590728,6.95099338 182.251656,7.88344371 L161.822517,73.4092715 C161.313907,75.1046358 160.72053,76.2066225 160.042384,76.7152318 C159.364238,77.2238411 158.262252,77.5629139 156.821192,77.5629139 L149.531126,77.5629139 C147.92053,77.5629139 146.818543,77.3086093 146.140397,76.7152318 C145.462252,76.1218543 144.868874,75.0198675 144.529801,73.3245033 L131.390728,18.6490066 L118.336424,73.2397351 C117.912583,74.9350993 117.403974,76.0370861 116.725828,76.6304636 C116.047682,77.2238411 114.860927,77.4781457 113.335099,77.4781457 L106.045033,77.4781457 Z M214.972185,79.7668874 C210.564238,79.7668874 206.156291,79.2582781 201.917881,78.2410596 C197.67947,77.2238411 194.37351,76.1218543 192.169536,74.8503311 C190.813245,74.0874172 189.880795,73.2397351 189.541722,72.4768212 C189.202649,71.7139073 189.033113,70.8662252 189.033113,70.1033113 L189.033113,65.7801325 C189.033113,64 189.711258,63.1523179 190.982781,63.1523179 C191.491391,63.1523179 192,63.2370861 192.508609,63.4066225 C193.017219,63.5761589 193.780132,63.9152318 194.627815,64.2543046 C197.509934,65.5258278 200.646358,66.5430464 203.952318,67.2211921 C207.343046,67.8993377 210.649007,68.2384106 214.039735,68.2384106 C219.380132,68.2384106 223.533775,67.3059603 226.415894,65.4410596 C229.298013,63.5761589 230.823841,60.8635762 230.823841,57.3880795 C230.823841,55.0145695 230.060927,53.0649007 228.535099,51.4543046 C227.009272,49.8437086 224.127152,48.402649 219.97351,47.0463576 L207.682119,43.2317881 C201.49404,41.2821192 196.916556,38.4 194.119205,34.5854305 C191.321854,30.8556291 189.880795,26.7019868 189.880795,22.2940397 C189.880795,18.7337748 190.643709,15.597351 192.169536,12.8847682 C193.695364,10.1721854 195.729801,7.7986755 198.272848,5.93377483 C200.815894,3.98410596 203.698013,2.54304636 207.088742,1.52582781 C210.47947,0.508609272 214.039735,0.0847682119 217.769536,0.0847682119 C219.634437,0.0847682119 221.584106,0.169536424 223.449007,0.42384106 C225.398675,0.678145695 227.178808,1.01721854 228.95894,1.35629139 C230.654305,1.78013245 232.264901,2.20397351 233.790728,2.71258278 C235.316556,3.22119205 236.503311,3.72980132 237.350993,4.2384106 C238.537748,4.91655629 239.38543,5.59470199 239.89404,6.35761589 C240.402649,7.03576159 240.656954,7.96821192 240.656954,9.15496689 L240.656954,13.1390728 C240.656954,14.9192053 239.978808,15.8516556 238.707285,15.8516556 C238.029139,15.8516556 236.927152,15.5125828 235.486093,14.8344371 C230.654305,12.6304636 225.229139,11.5284768 219.210596,11.5284768 C214.378808,11.5284768 210.564238,12.2913907 207.936424,13.9019868 C205.308609,15.5125828 203.952318,17.9708609 203.952318,21.4463576 C203.952318,23.8198675 204.8,25.8543046 206.495364,27.4649007 C208.190728,29.0754967 211.327152,30.6860927 215.819868,32.1271523 L227.856954,35.9417219 C233.960265,37.8913907 238.368212,40.6039735 240.996026,44.0794702 C243.623841,47.5549669 244.895364,51.5390728 244.895364,55.9470199 C244.895364,59.592053 244.13245,62.8980132 242.691391,65.7801325 C241.165563,68.6622517 239.131126,71.205298 236.503311,73.2397351 C233.875497,75.3589404 230.739073,76.8847682 227.09404,77.986755 C223.27947,79.1735099 219.295364,79.7668874 214.972185,79.7668874 Z"
                        fill="currentColor"
                        fillRule="nonzero"
                      ></path>
                      <path
                        d="M230.993377,120.964238 C203.104636,141.562914 162.58543,152.498013 127.745695,152.498013 C78.9192053,152.498013 34.9245033,134.442384 1.69536424,104.434437 C-0.932450331,102.060927 1.4410596,98.8397351 4.57748344,100.704636 C40.5192053,121.557616 84.8529801,134.188079 130.712583,134.188079 C161.65298,134.188079 195.645033,127.745695 226.924503,114.521854 C231.586755,112.402649 235.570861,117.57351 230.993377,120.964238 Z M242.606623,107.740397 C239.046358,103.162914 219.04106,105.536424 209.970861,106.638411 C207.258278,106.977483 206.834437,104.603974 209.292715,102.823841 C225.229139,91.6344371 251.422517,94.8556291 254.474172,98.5854305 C257.525828,102.4 253.62649,128.593377 238.707285,141.139073 C236.418543,143.088742 234.21457,142.071523 235.231788,139.528477 C238.622517,131.136424 246.166887,112.233113 242.606623,107.740397 Z"
                        fill="#FF9900"
                      ></path>
                    </g>
                  </svg>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <svg
                    className="h-5 w-20 text-white"
                    aria-label="Vercel logotype"
                    height="64"
                    role="img"
                    viewBox="0 0 283 64"
                    width="283"
                  >
                    <title>Vercel</title>
                    <path
                      d="M141.68 16.25c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm117.14-14.5c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm-39.03 3.5c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9v-46h9zM37.59.25l36.95 64H.64l36.95-64zm92.38 5l-27.71 48-27.71-48h10.39l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10v14.8h-9v-34h9v9.2c0-5.08 5.91-9.2 13.2-9.2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <svg
                    className="-m-1 h-9 w-9"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1300 1300"
                    xmlSpace="preserve"
                  >
                    <path
                      opacity=".45"
                      d="M773.772 253.308 643.068 485.61H381.842l130.614-232.302h261.316"
                    />
                    <path
                      opacity=".6"
                      d="M643.068 485.61h261.318L773.772 253.308H512.456L643.068 485.61z"
                    />
                    <path
                      opacity=".8"
                      d="M512.456 717.822 643.068 485.61 512.456 253.308 381.842 485.61l130.614 232.212z"
                    />
                    <path
                      opacity=".45"
                      d="m513.721 1066.275 130.704-232.303h261.318l-130.705 232.303H513.721"
                    />
                    <path
                      opacity=".6"
                      d="M644.424 833.973H383.107l130.613 232.303h261.317L644.424 833.973z"
                    />
                    <path
                      opacity=".8"
                      d="M775.038 601.761 644.424 833.973l130.614 232.303 130.704-232.303-130.704-232.212z"
                    />
                  </svg>
                  <span>Solidity</span>
                </li>
              </ol>
            </div>
            <div>
              <h4 className="mb-0 text-lg md:text-xl">Responsibilities</h4>
              <ol className="list-disc pt-2 pl-5">
                <li>
                  Established immediately as a senior developer, acting as the main PR reviewer
                  ensuring code quality for the entire organization.
                </li>
                <li>
                  Wrote the frontend for our rewards platform from scratch and chose a Next.js,
                  Tailwind, shadcn, wagmi, tanstack/query tech stack.
                </li>
                <li>
                  Wrote, reviewed, and deployed solidity smart contracts for staking, governance,
                  and vesting functionalities.
                </li>
                <li>
                  Integrated these contracts with the frontend using viem, wagmi, and dynamic.xyz.
                </li>
                <li>
                  Identified bottlenecks that could be solved with advanced blockchain indexing
                  tools such as TheGraph, Dune.com, Goldsky, and Subsquid, eventually deciding on
                  the latter.
                </li>
              </ol>
            </div>
          </div>
          <div className="frosted-glass-dark space-y-4 p-5">
            <div>
              <h3 className="mb-2 text-2xl leading-tight md:text-3xl lg:text-4xl">
                Senior Full Stack React/Web3 Developer
              </h3>
              <p>
                <span className="font-bold text-white">Balthazar DAO · Full-time</span>&nbsp;
                <span className="mb-4 text-gray-300">[May 2024 - Present]</span>
              </p>
            </div>

            <div>
              <h4 className="mb-0 text-lg md:text-xl">Tech utilized:</h4>
              <ol className="mt-0 flex flex-wrap">
                <li className="m-2 flex items-center gap-x-1">
                  <img
                    className="inline"
                    width="22"
                    height="22"
                    src="https://cdn-icons-png.flaticon.com/512/919/919832.png"
                    alt="TypeScript logo"
                  />
                  <span>Typescript</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <svg
                    className="h-8"
                    viewBox="0 0 165 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M75.547 29.84v-7.782h-8.743v7.782H63.74V12.176h3.064V19.6h8.743v-7.425h3.093V29.84h-3.093ZM93.885 29.843l-.613-2.125c-.67 1.105-2.648 2.325-5.6 2.325-3.065 0-5.516-1.353-5.516-4.335 0-2.594 1.866-3.783 5.933-4.167l4.487-.442c-.084-2.054-.837-3.243-3.71-3.243-2.647 0-3.37 1.05-3.37 2.816l-2.903.029c0-2.927 1.226-5.188 6.241-5.188 5.822 0 6.661 2.486 6.661 6.292v8.033l-1.61.005Zm-1.31-6.514-4.036.442c-2.478.278-3.315.801-3.315 1.906 0 1.297 1.115 2.042 3.204 2.042 2.618 0 4.152-1.49 4.152-3.947l-.004-.443ZM105.419 18.082c-2.981 0-3.572 1.636-3.572 3.919v7.839h-2.975V15.708h1.589l.703 1.96c.446-.938 1.81-2.153 4.596-2.153h.475v2.623c-.288 0-.565-.056-.816-.056ZM119.74 29.841l-.67-2.016c-.501.967-2.089 2.21-5.465 2.21-4.708 0-6.103-3.395-6.103-7.26 0-3.865 1.338-7.259 6.073-7.259 2.815 0 4.236.994 4.849 1.933v-7.123h2.926v19.515h-1.61Zm-5.267-11.844c-3.258 0-3.927 1.932-3.927 4.775 0 2.842.67 4.83 3.901 4.83 3.315 0 4.011-1.932 4.011-4.83 0-2.73-.583-4.772-3.984-4.772l-.001-.003ZM135.204 29.841v-7.922c0-2.65-.447-3.919-3.485-3.919-3.007 0-3.65 1.242-3.65 3.919l-.054 7.922h-2.925V10.326h2.926v7.144c.556-1.014 1.809-1.959 4.541-1.959 4.653 0 5.6 2.623 5.6 6.68v7.645l-2.953.005ZM152.813 29.843l-.613-2.125c-.67 1.105-2.648 2.325-5.605 2.325-3.066 0-5.517-1.353-5.517-4.335 0-2.594 1.867-3.783 5.935-4.167l4.484-.442c-.078-2.054-.83-3.243-3.709-3.243-2.645 0-3.371 1.05-3.371 2.816l-2.903.029c0-2.927 1.227-5.188 6.241-5.188 5.823 0 6.662 2.486 6.662 6.292v8.033l-1.604.005Zm-1.309-6.514-4.037.442c-2.478.278-3.315.801-3.315 1.906 0 1.297 1.115 2.042 3.204 2.042 2.618 0 4.152-1.49 4.152-3.947l-.004-.443ZM161.256 18.082v7.7c0 1.326.557 1.933 3.65 1.796v2.369c-4.708.276-6.686-.829-6.686-4.17v-7.695h-2.036v-1.766l2.034-.607v-3.533h2.953v3.533h3.733v2.369l-3.648.004Z"
                      fill="currentColor"
                    />
                    <path
                      d="M50.782 34.189v-2.421c0-.45-.757-.879-2.116-1.266l.033-3.013c0-4.642-1.44-9.171-4.126-12.975a22.825 22.825 0 0 0-10.886-8.29l-.097-.604a1.722 1.722 0 0 0-.408-.872 1.747 1.747 0 0 0-.815-.521 23.148 23.148 0 0 0-12.925 0c-.317.093-.6.273-.818.52-.217.246-.36.548-.41.872l-.093.563a22.831 22.831 0 0 0-10.962 8.283A22.498 22.498 0 0 0 3 27.488v3.026c-1.34.386-2.087.81-2.087 1.257v2.421A.59.59 0 0 0 1 34.6a5.852 5.852 0 0 1 2.247-1.015c2.072-.5 4.179-.85 6.303-1.046a4.25 4.25 0 0 1 3.307 1.057 8.95 8.95 0 0 0 6.009 2.312H32.83a8.943 8.943 0 0 0 6.008-2.314 4.253 4.253 0 0 1 3.308-1.069c2.123.196 4.23.544 6.302 1.042a5.26 5.26 0 0 1 2.13.925c.035.035.078.066.108.099a.6.6 0 0 0 .096-.402Z"
                      fill="#FFF100"
                    />
                    <path
                      d="M12.89 29.094a53.064 53.064 0 0 1-.03-1.673c.007-8.416 1.992-15.964 5.262-21.235A22.831 22.831 0 0 0 7.16 14.468 22.498 22.498 0 0 0 3 27.488v3.026a55.9 55.9 0 0 1 9.89-1.42Z"
                      fill="url(#a)"
                    />
                    <path
                      d="M48.697 27.488a22.425 22.425 0 0 0-5.215-14.396 46.55 46.55 0 0 1 2.162 14.325c0 .82-.022 1.63-.06 2.435a28.49 28.49 0 0 1 3.074.648l.038-3.012Z"
                      fill="url(#b)"
                    />
                    <path
                      d="M48.448 33.576c-2.073-.5-4.18-.85-6.303-1.046a4.252 4.252 0 0 0-3.308 1.062 8.943 8.943 0 0 1-6.009 2.313H18.87a8.948 8.948 0 0 1-6.006-2.312 4.249 4.249 0 0 0-3.308-1.071c-2.124.196-4.23.546-6.303 1.045a5.929 5.929 0 0 0-2.246 1.015c1.06 1.608 11.782 3.295 24.846 3.295 13.065 0 23.782-1.693 24.844-3.294-.037-.032-.078-.063-.109-.098a5.463 5.463 0 0 0-2.14-.909Z"
                      fill="url(#c)"
                    />
                    <path d="M25.846 10.414 20.5 19.436l5.346 3.29V10.413Z" fill="#0A0A0A" />
                    <path
                      d="M25.848 10.417v12.306l5.345-3.284-5.345-9.022ZM25.848 24.51v4.291c.1-.142 5.345-7.58 5.345-7.583l-5.345 3.293Z"
                      fill="#4B4D4D"
                    />
                    <path d="m25.848 24.512-5.346-3.288 5.346 7.58V24.51v.002Z" fill="#0A0A0A" />
                    <defs>
                      <linearGradient
                        id="a"
                        x1="10.561"
                        y1="30.514"
                        x2="10.561"
                        y2="6.186"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#EDCF00" />
                        <stop offset=".33" stopColor="#F0D500" />
                        <stop offset=".77" stopColor="#F9E500" />
                        <stop offset="1" stopColor="#FFF100" />
                      </linearGradient>
                      <linearGradient
                        id="b"
                        x1="46.089"
                        y1="30.692"
                        x2="46.089"
                        y2="13.092"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#EDCF00" />
                        <stop offset=".59" stopColor="#F7E100" />
                        <stop offset="1" stopColor="#FFF100" />
                      </linearGradient>
                      <radialGradient
                        id="c"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="matrix(18.5398 0 0 18.4136 3.701 47.135)"
                      >
                        <stop stopColor="#FFF100" />
                        <stop offset=".23" stopColor="#F9E500" />
                        <stop offset=".67" stopColor="#F0D500" />
                        <stop offset="1" stopColor="#EDCF00" />
                      </radialGradient>
                    </defs>
                  </svg>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <svg className="inline" viewBox="0 0 180 180" width="18">
                    <mask
                      height="180"
                      id=":r8:mask0_408_134"
                      maskUnits="userSpaceOnUse"
                      width="180"
                      x="0"
                      y="0"
                      style={{ maskType: 'alpha' }}
                    >
                      <circle cx="90" cy="90" fill="black" r="90"></circle>
                    </mask>
                    <g mask="url(#:r8:mask0_408_134)">
                      <circle cx="90" cy="90" data-circle="true" fill="black" r="90"></circle>
                      <path
                        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
                        fill="url(#:r8:paint0_linear_408_134)"
                      ></path>
                      <rect
                        fill="url(#:r8:paint1_linear_408_134)"
                        height="72"
                        width="12"
                        x="115"
                        y="54"
                      ></rect>
                    </g>
                    <defs>
                      <linearGradient
                        gradientUnits="userSpaceOnUse"
                        id=":r8:paint0_linear_408_134"
                        x1="109"
                        x2="144.5"
                        y1="116.5"
                        y2="160.5"
                      >
                        <stop stopColor="white"></stop>
                        <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                      </linearGradient>
                      <linearGradient
                        gradientUnits="userSpaceOnUse"
                        id=":r8:paint1_linear_408_134"
                        x1="121"
                        x2="120.799"
                        y1="54"
                        y2="106.875"
                      >
                        <stop stopColor="white"></stop>
                        <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span>Nextjs</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <a href="https://www.postgresql.org/">
                    <img
                      className="inline"
                      width="22"
                      height="22"
                      src="https://www.postgresql.org/media/img/about/press/elephant.png"
                      alt="PostgreSQL logo"
                    />
                  </a>
                  <span>Postgresql</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <svg viewBox="0 0 248 31" className="h-4 w-auto text-white">
                    <title>Tailwind</title>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"
                      fill="#38bdf8"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M76.546 12.825h-4.453v8.567c0 2.285 1.508 2.249 4.453 2.106v3.463c-5.962.714-8.332-.928-8.332-5.569v-8.567H64.91V9.112h3.304V4.318l3.879-1.143v5.937h4.453v3.713zM93.52 9.112h3.878v17.849h-3.878v-2.57c-1.365 1.891-3.484 3.034-6.285 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.285 2.999V9.112zm-5.674 14.636c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm16.016-17.313c-1.364 0-2.477-1.142-2.477-2.463a2.475 2.475 0 012.477-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.879v17.849h-3.879zm8.368 0V.9h3.878v26.06h-3.878zm29.053-17.849h4.094l-5.638 17.849h-3.807l-3.735-12.03-3.771 12.03h-3.806l-5.639-17.849h4.094l3.484 12.315 3.771-12.315h3.699l3.734 12.315 3.52-12.315zm8.906-2.677c-1.365 0-2.478-1.142-2.478-2.463a2.475 2.475 0 012.478-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.878v17.849h-3.878zm17.812-18.313c4.022 0 6.895 2.713 6.895 7.354V26.96h-3.878V16.394c0-2.713-1.58-4.14-4.022-4.14-2.55 0-4.561 1.499-4.561 5.14v9.567h-3.879V9.112h3.879v2.285c1.185-1.856 3.124-2.749 5.566-2.749zm25.282-6.675h3.879V26.96h-3.879v-2.57c-1.364 1.892-3.483 3.034-6.284 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.284 2.999V1.973zm-5.674 21.775c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm22.553 3.677c-5.423 0-9.481-4.105-9.481-9.389 0-5.318 4.058-9.388 9.481-9.388 3.519 0 6.572 1.82 8.008 4.605l-3.34 1.928c-.79-1.678-2.549-2.749-4.704-2.749-3.16 0-5.566 2.392-5.566 5.604 0 3.213 2.406 5.605 5.566 5.605 2.155 0 3.914-1.107 4.776-2.749l3.34 1.892c-1.508 2.82-4.561 4.64-8.08 4.64zm14.472-13.387c0 3.249 9.661 1.285 9.661 7.89 0 3.57-3.125 5.497-7.003 5.497-3.591 0-6.177-1.607-7.326-4.177l3.34-1.927c.574 1.606 2.011 2.57 3.986 2.57 1.724 0 3.052-.571 3.052-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.909-5.462 6.572-5.462 2.945 0 5.387 1.357 6.644 3.713l-3.268 1.82c-.647-1.392-1.904-2.035-3.376-2.035-1.401 0-2.622.607-2.622 1.892zm16.556 0c0 3.249 9.66 1.285 9.66 7.89 0 3.57-3.124 5.497-7.003 5.497-3.591 0-6.176-1.607-7.326-4.177l3.34-1.927c.575 1.606 2.011 2.57 3.986 2.57 1.724 0 3.053-.571 3.053-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.908-5.462 6.572-5.462 2.944 0 5.386 1.357 6.643 3.713l-3.268 1.82c-.646-1.392-1.903-2.035-3.375-2.035-1.401 0-2.622.607-2.622 1.892z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <svg
                    className="-mb-2.5 w-8"
                    viewBox="0 -51.5 256 256"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    preserveAspectRatio="xMidYMid"
                  >
                    <title>AWS</title>
                    <g>
                      <path
                        d="M72.392053,55.4384106 C72.392053,58.5748344 72.7311258,61.1178808 73.3245033,62.9827815 C74.002649,64.8476821 74.8503311,66.8821192 76.0370861,69.0860927 C76.4609272,69.7642384 76.6304636,70.4423841 76.6304636,71.0357616 C76.6304636,71.8834437 76.1218543,72.7311258 75.0198675,73.5788079 L69.6794702,77.1390728 C68.9165563,77.6476821 68.1536424,77.9019868 67.4754967,77.9019868 C66.6278146,77.9019868 65.7801325,77.4781457 64.9324503,76.7152318 C63.7456954,75.4437086 62.7284768,74.0874172 61.8807947,72.7311258 C61.0331126,71.2900662 60.1854305,69.6794702 59.2529801,67.7298013 C52.6410596,75.5284768 44.3337748,79.4278146 34.3311258,79.4278146 C27.210596,79.4278146 21.5311258,77.3933775 17.3774834,73.3245033 C13.2238411,69.2556291 11.1046358,63.8304636 11.1046358,57.0490066 C11.1046358,49.8437086 13.6476821,43.994702 18.818543,39.586755 C23.989404,35.1788079 30.8556291,32.9748344 39.586755,32.9748344 C42.4688742,32.9748344 45.4357616,33.2291391 48.5721854,33.6529801 C51.7086093,34.0768212 54.9298013,34.7549669 58.3205298,35.5178808 L58.3205298,29.3298013 C58.3205298,22.8874172 56.9642384,18.394702 54.3364238,15.7668874 C51.6238411,13.1390728 47.0463576,11.8675497 40.5192053,11.8675497 C37.5523179,11.8675497 34.5006623,12.2066225 31.3642384,12.9695364 C28.2278146,13.7324503 25.1761589,14.6649007 22.2092715,15.8516556 C20.8529801,16.4450331 19.8357616,16.784106 19.2423841,16.9536424 C18.6490066,17.1231788 18.2251656,17.207947 17.8860927,17.207947 C16.6993377,17.207947 16.1059603,16.3602649 16.1059603,14.5801325 L16.1059603,10.4264901 C16.1059603,9.07019868 16.2754967,8.05298013 16.6993377,7.45960265 C17.1231788,6.86622517 17.8860927,6.27284768 19.0728477,5.6794702 C22.0397351,4.15364238 25.6,2.88211921 29.7536424,1.86490066 C33.9072848,0.762913907 38.3152318,0.254304636 42.9774834,0.254304636 C53.0649007,0.254304636 60.4397351,2.54304636 65.186755,7.1205298 C69.8490066,11.6980132 72.2225166,18.6490066 72.2225166,27.9735099 L72.2225166,55.4384106 L72.392053,55.4384106 Z M37.9761589,68.3231788 C40.7735099,68.3231788 43.6556291,67.8145695 46.7072848,66.797351 C49.7589404,65.7801325 52.4715232,63.9152318 54.7602649,61.3721854 C56.1165563,59.7615894 57.1337748,57.981457 57.6423841,55.9470199 C58.1509934,53.9125828 58.4900662,51.4543046 58.4900662,48.5721854 L58.4900662,45.0119205 C56.0317881,44.418543 53.4039735,43.9099338 50.6913907,43.5708609 C47.9788079,43.2317881 45.3509934,43.0622517 42.7231788,43.0622517 C37.0437086,43.0622517 32.8900662,44.1642384 30.0927152,46.4529801 C27.2953642,48.7417219 25.9390728,51.9629139 25.9390728,56.2013245 C25.9390728,60.1854305 26.9562914,63.1523179 29.0754967,65.186755 C31.1099338,67.3059603 34.0768212,68.3231788 37.9761589,68.3231788 Z M106.045033,77.4781457 C104.519205,77.4781457 103.501987,77.2238411 102.823841,76.6304636 C102.145695,76.1218543 101.552318,74.9350993 101.043709,73.3245033 L81.1231788,7.7986755 C80.6145695,6.10331126 80.3602649,5.0013245 80.3602649,4.40794702 C80.3602649,3.05165563 81.0384106,2.28874172 82.394702,2.28874172 L90.7019868,2.28874172 C92.3125828,2.28874172 93.4145695,2.54304636 94.007947,3.13642384 C94.6860927,3.64503311 95.194702,4.83178808 95.7033113,6.44238411 L109.944371,62.5589404 L123.168212,6.44238411 C123.592053,4.74701987 124.100662,3.64503311 124.778808,3.13642384 C125.456954,2.62781457 126.643709,2.28874172 128.169536,2.28874172 L134.950993,2.28874172 C136.561589,2.28874172 137.663576,2.54304636 138.341722,3.13642384 C139.019868,3.64503311 139.613245,4.83178808 139.952318,6.44238411 L153.345695,63.2370861 L168.010596,6.44238411 C168.519205,4.74701987 169.112583,3.64503311 169.70596,3.13642384 C170.384106,2.62781457 171.486093,2.28874172 173.011921,2.28874172 L180.895364,2.28874172 C182.251656,2.28874172 183.01457,2.96688742 183.01457,4.40794702 C183.01457,4.83178808 182.929801,5.25562914 182.845033,5.76423841 C182.760265,6.27284768 182.590728,6.95099338 182.251656,7.88344371 L161.822517,73.4092715 C161.313907,75.1046358 160.72053,76.2066225 160.042384,76.7152318 C159.364238,77.2238411 158.262252,77.5629139 156.821192,77.5629139 L149.531126,77.5629139 C147.92053,77.5629139 146.818543,77.3086093 146.140397,76.7152318 C145.462252,76.1218543 144.868874,75.0198675 144.529801,73.3245033 L131.390728,18.6490066 L118.336424,73.2397351 C117.912583,74.9350993 117.403974,76.0370861 116.725828,76.6304636 C116.047682,77.2238411 114.860927,77.4781457 113.335099,77.4781457 L106.045033,77.4781457 Z M214.972185,79.7668874 C210.564238,79.7668874 206.156291,79.2582781 201.917881,78.2410596 C197.67947,77.2238411 194.37351,76.1218543 192.169536,74.8503311 C190.813245,74.0874172 189.880795,73.2397351 189.541722,72.4768212 C189.202649,71.7139073 189.033113,70.8662252 189.033113,70.1033113 L189.033113,65.7801325 C189.033113,64 189.711258,63.1523179 190.982781,63.1523179 C191.491391,63.1523179 192,63.2370861 192.508609,63.4066225 C193.017219,63.5761589 193.780132,63.9152318 194.627815,64.2543046 C197.509934,65.5258278 200.646358,66.5430464 203.952318,67.2211921 C207.343046,67.8993377 210.649007,68.2384106 214.039735,68.2384106 C219.380132,68.2384106 223.533775,67.3059603 226.415894,65.4410596 C229.298013,63.5761589 230.823841,60.8635762 230.823841,57.3880795 C230.823841,55.0145695 230.060927,53.0649007 228.535099,51.4543046 C227.009272,49.8437086 224.127152,48.402649 219.97351,47.0463576 L207.682119,43.2317881 C201.49404,41.2821192 196.916556,38.4 194.119205,34.5854305 C191.321854,30.8556291 189.880795,26.7019868 189.880795,22.2940397 C189.880795,18.7337748 190.643709,15.597351 192.169536,12.8847682 C193.695364,10.1721854 195.729801,7.7986755 198.272848,5.93377483 C200.815894,3.98410596 203.698013,2.54304636 207.088742,1.52582781 C210.47947,0.508609272 214.039735,0.0847682119 217.769536,0.0847682119 C219.634437,0.0847682119 221.584106,0.169536424 223.449007,0.42384106 C225.398675,0.678145695 227.178808,1.01721854 228.95894,1.35629139 C230.654305,1.78013245 232.264901,2.20397351 233.790728,2.71258278 C235.316556,3.22119205 236.503311,3.72980132 237.350993,4.2384106 C238.537748,4.91655629 239.38543,5.59470199 239.89404,6.35761589 C240.402649,7.03576159 240.656954,7.96821192 240.656954,9.15496689 L240.656954,13.1390728 C240.656954,14.9192053 239.978808,15.8516556 238.707285,15.8516556 C238.029139,15.8516556 236.927152,15.5125828 235.486093,14.8344371 C230.654305,12.6304636 225.229139,11.5284768 219.210596,11.5284768 C214.378808,11.5284768 210.564238,12.2913907 207.936424,13.9019868 C205.308609,15.5125828 203.952318,17.9708609 203.952318,21.4463576 C203.952318,23.8198675 204.8,25.8543046 206.495364,27.4649007 C208.190728,29.0754967 211.327152,30.6860927 215.819868,32.1271523 L227.856954,35.9417219 C233.960265,37.8913907 238.368212,40.6039735 240.996026,44.0794702 C243.623841,47.5549669 244.895364,51.5390728 244.895364,55.9470199 C244.895364,59.592053 244.13245,62.8980132 242.691391,65.7801325 C241.165563,68.6622517 239.131126,71.205298 236.503311,73.2397351 C233.875497,75.3589404 230.739073,76.8847682 227.09404,77.986755 C223.27947,79.1735099 219.295364,79.7668874 214.972185,79.7668874 Z"
                        fill="currentColor"
                        fillRule="nonzero"
                      ></path>
                      <path
                        d="M230.993377,120.964238 C203.104636,141.562914 162.58543,152.498013 127.745695,152.498013 C78.9192053,152.498013 34.9245033,134.442384 1.69536424,104.434437 C-0.932450331,102.060927 1.4410596,98.8397351 4.57748344,100.704636 C40.5192053,121.557616 84.8529801,134.188079 130.712583,134.188079 C161.65298,134.188079 195.645033,127.745695 226.924503,114.521854 C231.586755,112.402649 235.570861,117.57351 230.993377,120.964238 Z M242.606623,107.740397 C239.046358,103.162914 219.04106,105.536424 209.970861,106.638411 C207.258278,106.977483 206.834437,104.603974 209.292715,102.823841 C225.229139,91.6344371 251.422517,94.8556291 254.474172,98.5854305 C257.525828,102.4 253.62649,128.593377 238.707285,141.139073 C236.418543,143.088742 234.21457,142.071523 235.231788,139.528477 C238.622517,131.136424 246.166887,112.233113 242.606623,107.740397 Z"
                        fill="#FF9900"
                      ></path>
                    </g>
                  </svg>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <svg
                    className="h-5 w-20 text-white"
                    aria-label="Vercel logotype"
                    height="64"
                    role="img"
                    viewBox="0 0 283 64"
                    width="283"
                  >
                    <title>Vercel</title>
                    <path
                      d="M141.68 16.25c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm117.14-14.5c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm-39.03 3.5c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9v-46h9zM37.59.25l36.95 64H.64l36.95-64zm92.38 5l-27.71 48-27.71-48h10.39l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10v14.8h-9v-34h9v9.2c0-5.08 5.91-9.2 13.2-9.2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <svg
                    className="-m-1 h-9 w-9"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1300 1300"
                    xmlSpace="preserve"
                  >
                    <path
                      opacity=".45"
                      d="M773.772 253.308 643.068 485.61H381.842l130.614-232.302h261.316"
                    />
                    <path
                      opacity=".6"
                      d="M643.068 485.61h261.318L773.772 253.308H512.456L643.068 485.61z"
                    />
                    <path
                      opacity=".8"
                      d="M512.456 717.822 643.068 485.61 512.456 253.308 381.842 485.61l130.614 232.212z"
                    />
                    <path
                      opacity=".45"
                      d="m513.721 1066.275 130.704-232.303h261.318l-130.705 232.303H513.721"
                    />
                    <path
                      opacity=".6"
                      d="M644.424 833.973H383.107l130.613 232.303h261.317L644.424 833.973z"
                    />
                    <path
                      opacity=".8"
                      d="M775.038 601.761 644.424 833.973l130.614 232.303 130.704-232.303-130.704-232.212z"
                    />
                  </svg>
                  <span>Solidity</span>
                </li>
              </ol>
            </div>
            <div>
              <h4 className="mb-0 text-lg md:text-xl">Responsibilities</h4>
              <ol className="list-disc pt-2 pl-5">
                <li>
                  Established immediately as a senior developer, acting as the main PR reviewer
                  ensuring code quality for the entire organization.
                </li>
                <li>
                  Wrote the frontend for our rewards platform from scratch and chose a Next.js,
                  Tailwind, shadcn, wagmi, tanstack/query tech stack.
                </li>
                <li>
                  Wrote, reviewed, and deployed solidity smart contracts for staking, governance,
                  and vesting functionalities.
                </li>
                <li>
                  Integrated these contracts with the frontend using viem, wagmi, and dynamic.xyz.
                </li>
                <li>
                  Identified bottlenecks that could be solved with advanced blockchain indexing
                  tools such as TheGraph, Dune.com, Goldsky, and Subsquid, eventually deciding on
                  the latter.
                </li>
              </ol>
            </div>
          </div>
          <div className="frosted-glass-dark space-y-4 p-5">
            <div>
              <h3 className="mb-1 text-2xl leading-tight md:text-3xl lg:text-4xl">
                Full Stack Web Developer
              </h3>
              <p>
                <span className="font-bold text-white">xx network · Full-time</span>
                &nbsp;
                <span className="mb-4 text-gray-300">[Apr 2019 - Aug 2023]</span>
              </p>
              <p>The first and only quantum-resistant and privacy-focused blockchain ecosystem.</p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl">Urls</h4>
              <ul>
                <li>
                  Website: <a href="https://xx.network">https://xx.network</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-0 text-lg md:text-xl">Tech utilized:</h4>
              <ol className="mt-0 flex flex-wrap">
                <li className="m-2 flex items-center space-x-1">
                  <img
                    className="inline"
                    width="22"
                    height="22"
                    src="https://cdn-icons-png.flaticon.com/512/919/919832.png"
                    alt="TypeScript logo"
                  />
                  <span>Typescript</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <svg
                    className="w-5"
                    viewBox="0 0 256 256"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMinYMin meet"
                  >
                    <path d="M0 0h256v256H0V0z" fill="#F7DF1E" />
                    <path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247L210.29 147.43c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574" />
                  </svg>
                  <span>Javascript</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <svg className="inline" viewBox="0 0 180 180" width="18">
                    <mask
                      height="180"
                      id=":r8:mask0_408_134"
                      maskUnits="userSpaceOnUse"
                      width="180"
                      x="0"
                      y="0"
                      style={{ maskType: 'alpha' }}
                    >
                      <circle cx="90" cy="90" fill="black" r="90"></circle>
                    </mask>
                    <g mask="url(#:r8:mask0_408_134)">
                      <circle cx="90" cy="90" data-circle="true" fill="black" r="90"></circle>
                      <path
                        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
                        fill="url(#:r8:paint0_linear_408_134)"
                      ></path>
                      <rect
                        fill="url(#:r8:paint1_linear_408_134)"
                        height="72"
                        width="12"
                        x="115"
                        y="54"
                      ></rect>
                    </g>
                    <defs>
                      <linearGradient
                        gradientUnits="userSpaceOnUse"
                        id=":r8:paint0_linear_408_134"
                        x1="109"
                        x2="144.5"
                        y1="116.5"
                        y2="160.5"
                      >
                        <stop stopColor="white"></stop>
                        <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                      </linearGradient>
                      <linearGradient
                        gradientUnits="userSpaceOnUse"
                        id=":r8:paint1_linear_408_134"
                        x1="121"
                        x2="120.799"
                        y1="54"
                        y2="106.875"
                      >
                        <stop stopColor="white"></stop>
                        <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span>Nextjs</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <svg
                    className="w-6"
                    viewBox="0 0 512 512"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M281.44 397.667H438.32C443.326 397.667 448.118 395.908 452.453 393.427C456.789 390.946 461.258 387.831 463.76 383.533C466.262 379.236 468.002 374.36 468 369.399C467.998 364.437 466.266 359.563 463.76 355.268L357.76 172.947C355.258 168.65 352.201 165.534 347.867 163.053C343.532 160.573 337.325 158.813 332.32 158.813C327.315 158.813 322.521 160.573 318.187 163.053C313.852 165.534 310.795 168.65 308.293 172.947L281.44 219.587L227.733 129.13C225.229 124.834 222.176 120.307 217.84 117.827C213.504 115.346 208.713 115 203.707 115C198.701 115 193.909 115.346 189.573 117.827C185.238 120.307 180.771 124.834 178.267 129.13L46.8267 355.268C44.3208 359.563 44.0022 364.437 44 369.399C43.9978 374.36 44.3246 379.235 46.8267 383.533C49.3288 387.83 53.7979 390.946 58.1333 393.427C62.4688 395.908 67.2603 397.667 72.2667 397.667H171.2C210.401 397.667 238.934 380.082 258.827 346.787L306.88 263.4L332.32 219.587L410.053 352.44H306.88L281.44 397.667ZM169.787 352.44H100.533L203.707 174.36L256 263.4L221.361 323.784C208.151 345.387 193.089 352.44 169.787 352.44Z"
                      fill="#00DC82"
                    />
                  </svg>
                  <span>Nuxtjs</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <a href="https://www.postgresql.org/">
                    <img
                      className="inline"
                      width="22"
                      height="22"
                      src="https://www.postgresql.org/media/img/about/press/elephant.png"
                      alt="PostgreSQL logo"
                    />
                  </a>
                  <span>Postgresql</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <svg viewBox="0 0 248 31" className="h-4 w-auto text-white">
                    <title>Tailwindcss</title>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"
                      fill="#38bdf8"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M76.546 12.825h-4.453v8.567c0 2.285 1.508 2.249 4.453 2.106v3.463c-5.962.714-8.332-.928-8.332-5.569v-8.567H64.91V9.112h3.304V4.318l3.879-1.143v5.937h4.453v3.713zM93.52 9.112h3.878v17.849h-3.878v-2.57c-1.365 1.891-3.484 3.034-6.285 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.285 2.999V9.112zm-5.674 14.636c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm16.016-17.313c-1.364 0-2.477-1.142-2.477-2.463a2.475 2.475 0 012.477-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.879v17.849h-3.879zm8.368 0V.9h3.878v26.06h-3.878zm29.053-17.849h4.094l-5.638 17.849h-3.807l-3.735-12.03-3.771 12.03h-3.806l-5.639-17.849h4.094l3.484 12.315 3.771-12.315h3.699l3.734 12.315 3.52-12.315zm8.906-2.677c-1.365 0-2.478-1.142-2.478-2.463a2.475 2.475 0 012.478-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.878v17.849h-3.878zm17.812-18.313c4.022 0 6.895 2.713 6.895 7.354V26.96h-3.878V16.394c0-2.713-1.58-4.14-4.022-4.14-2.55 0-4.561 1.499-4.561 5.14v9.567h-3.879V9.112h3.879v2.285c1.185-1.856 3.124-2.749 5.566-2.749zm25.282-6.675h3.879V26.96h-3.879v-2.57c-1.364 1.892-3.483 3.034-6.284 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.284 2.999V1.973zm-5.674 21.775c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm22.553 3.677c-5.423 0-9.481-4.105-9.481-9.389 0-5.318 4.058-9.388 9.481-9.388 3.519 0 6.572 1.82 8.008 4.605l-3.34 1.928c-.79-1.678-2.549-2.749-4.704-2.749-3.16 0-5.566 2.392-5.566 5.604 0 3.213 2.406 5.605 5.566 5.605 2.155 0 3.914-1.107 4.776-2.749l3.34 1.892c-1.508 2.82-4.561 4.64-8.08 4.64zm14.472-13.387c0 3.249 9.661 1.285 9.661 7.89 0 3.57-3.125 5.497-7.003 5.497-3.591 0-6.177-1.607-7.326-4.177l3.34-1.927c.574 1.606 2.011 2.57 3.986 2.57 1.724 0 3.052-.571 3.052-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.909-5.462 6.572-5.462 2.945 0 5.387 1.357 6.644 3.713l-3.268 1.82c-.647-1.392-1.904-2.035-3.376-2.035-1.401 0-2.622.607-2.622 1.892zm16.556 0c0 3.249 9.66 1.285 9.66 7.89 0 3.57-3.124 5.497-7.003 5.497-3.591 0-6.176-1.607-7.326-4.177l3.34-1.927c.575 1.606 2.011 2.57 3.986 2.57 1.724 0 3.053-.571 3.053-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.908-5.462 6.572-5.462 2.944 0 5.386 1.357 6.643 3.713l-3.268 1.82c-.646-1.392-1.903-2.035-3.375-2.035-1.401 0-2.622.607-2.622 1.892z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <svg
                    className="h-5 w-5"
                    viewBox="-16.5 0 289 289"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    preserveAspectRatio="xMidYMid"
                  >
                    <g>
                      <path
                        d="M87.333315,200.77659 C72.0274763,186.371095 63.0240418,166.563539 63.0240418,144.054953 C63.0240418,121.546366 72.0274763,101.73881 86.4329716,87.333315 C99.0377799,74.7285067 99.0377799,54.9209507 86.4329716,42.3161423 C73.8281632,29.711334 54.0206072,29.711334 41.4157989,42.3161423 C16.2061822,68.4261025 0,104.439841 0,144.054953 C0,183.670065 16.2061822,219.683803 42.3161423,245.793763 C54.9209507,258.398571 74.7285067,258.398571 87.333315,245.793763 C99.0377799,233.188955 99.0377799,213.381399 87.333315,200.77659 Z"
                        fill="#FAE501"
                      ></path>
                      <path
                        d="M87.333315,87.333315 C101.73881,72.0274763 121.546366,63.0240418 144.054953,63.0240418 C166.563539,63.0240418 186.371095,72.0274763 200.77659,86.4329716 C213.381399,99.0377799 233.188955,99.0377799 245.793763,86.4329716 C258.398571,73.8281632 258.398571,54.0206072 245.793763,41.4157989 C219.683803,16.2061822 183.670065,0 144.054953,0 C104.439841,0 68.4261025,16.2061822 42.3161423,42.3161423 C29.711334,54.9209507 29.711334,74.7285067 42.3161423,87.333315 C54.9209507,99.0377799 74.7285067,99.0377799 87.333315,87.333315 Z"
                        fill="#4FB5E1"
                      ></path>
                      <path
                        d="M200.77659,200.77659 C186.371095,216.082429 166.563539,225.085863 144.054953,225.085863 C121.546366,225.085863 101.73881,216.082429 87.333315,201.676934 C74.7285067,189.072125 54.9209507,189.072125 42.3161423,201.676934 C29.711334,214.281742 29.711334,234.089298 42.3161423,246.694106 C68.4261025,271.903723 104.439841,288.109905 144.054953,288.109905 C183.670065,288.109905 219.683803,271.903723 245.793763,245.793763 C258.398571,233.188955 258.398571,213.381399 245.793763,200.77659 C233.188955,189.072125 213.381399,189.072125 200.77659,200.77659 Z"
                        fill="#F05751"
                      ></path>
                      <ellipse
                        fill="#0681B6"
                        cx="64.8247287"
                        cy="64.8247287"
                        rx="31.5120209"
                        ry="31.5120209"
                      ></ellipse>
                      <ellipse
                        fill="#CD4739"
                        cx="64.8247287"
                        cy="223.285177"
                        rx="31.5120209"
                        ry="31.5120209"
                      ></ellipse>
                    </g>
                  </svg>
                  <span>Contentful</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <svg
                    className="-mb-2.5 w-8"
                    viewBox="0 -51.5 256 256"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    preserveAspectRatio="xMidYMid"
                  >
                    <g>
                      <path
                        d="M72.392053,55.4384106 C72.392053,58.5748344 72.7311258,61.1178808 73.3245033,62.9827815 C74.002649,64.8476821 74.8503311,66.8821192 76.0370861,69.0860927 C76.4609272,69.7642384 76.6304636,70.4423841 76.6304636,71.0357616 C76.6304636,71.8834437 76.1218543,72.7311258 75.0198675,73.5788079 L69.6794702,77.1390728 C68.9165563,77.6476821 68.1536424,77.9019868 67.4754967,77.9019868 C66.6278146,77.9019868 65.7801325,77.4781457 64.9324503,76.7152318 C63.7456954,75.4437086 62.7284768,74.0874172 61.8807947,72.7311258 C61.0331126,71.2900662 60.1854305,69.6794702 59.2529801,67.7298013 C52.6410596,75.5284768 44.3337748,79.4278146 34.3311258,79.4278146 C27.210596,79.4278146 21.5311258,77.3933775 17.3774834,73.3245033 C13.2238411,69.2556291 11.1046358,63.8304636 11.1046358,57.0490066 C11.1046358,49.8437086 13.6476821,43.994702 18.818543,39.586755 C23.989404,35.1788079 30.8556291,32.9748344 39.586755,32.9748344 C42.4688742,32.9748344 45.4357616,33.2291391 48.5721854,33.6529801 C51.7086093,34.0768212 54.9298013,34.7549669 58.3205298,35.5178808 L58.3205298,29.3298013 C58.3205298,22.8874172 56.9642384,18.394702 54.3364238,15.7668874 C51.6238411,13.1390728 47.0463576,11.8675497 40.5192053,11.8675497 C37.5523179,11.8675497 34.5006623,12.2066225 31.3642384,12.9695364 C28.2278146,13.7324503 25.1761589,14.6649007 22.2092715,15.8516556 C20.8529801,16.4450331 19.8357616,16.784106 19.2423841,16.9536424 C18.6490066,17.1231788 18.2251656,17.207947 17.8860927,17.207947 C16.6993377,17.207947 16.1059603,16.3602649 16.1059603,14.5801325 L16.1059603,10.4264901 C16.1059603,9.07019868 16.2754967,8.05298013 16.6993377,7.45960265 C17.1231788,6.86622517 17.8860927,6.27284768 19.0728477,5.6794702 C22.0397351,4.15364238 25.6,2.88211921 29.7536424,1.86490066 C33.9072848,0.762913907 38.3152318,0.254304636 42.9774834,0.254304636 C53.0649007,0.254304636 60.4397351,2.54304636 65.186755,7.1205298 C69.8490066,11.6980132 72.2225166,18.6490066 72.2225166,27.9735099 L72.2225166,55.4384106 L72.392053,55.4384106 Z M37.9761589,68.3231788 C40.7735099,68.3231788 43.6556291,67.8145695 46.7072848,66.797351 C49.7589404,65.7801325 52.4715232,63.9152318 54.7602649,61.3721854 C56.1165563,59.7615894 57.1337748,57.981457 57.6423841,55.9470199 C58.1509934,53.9125828 58.4900662,51.4543046 58.4900662,48.5721854 L58.4900662,45.0119205 C56.0317881,44.418543 53.4039735,43.9099338 50.6913907,43.5708609 C47.9788079,43.2317881 45.3509934,43.0622517 42.7231788,43.0622517 C37.0437086,43.0622517 32.8900662,44.1642384 30.0927152,46.4529801 C27.2953642,48.7417219 25.9390728,51.9629139 25.9390728,56.2013245 C25.9390728,60.1854305 26.9562914,63.1523179 29.0754967,65.186755 C31.1099338,67.3059603 34.0768212,68.3231788 37.9761589,68.3231788 Z M106.045033,77.4781457 C104.519205,77.4781457 103.501987,77.2238411 102.823841,76.6304636 C102.145695,76.1218543 101.552318,74.9350993 101.043709,73.3245033 L81.1231788,7.7986755 C80.6145695,6.10331126 80.3602649,5.0013245 80.3602649,4.40794702 C80.3602649,3.05165563 81.0384106,2.28874172 82.394702,2.28874172 L90.7019868,2.28874172 C92.3125828,2.28874172 93.4145695,2.54304636 94.007947,3.13642384 C94.6860927,3.64503311 95.194702,4.83178808 95.7033113,6.44238411 L109.944371,62.5589404 L123.168212,6.44238411 C123.592053,4.74701987 124.100662,3.64503311 124.778808,3.13642384 C125.456954,2.62781457 126.643709,2.28874172 128.169536,2.28874172 L134.950993,2.28874172 C136.561589,2.28874172 137.663576,2.54304636 138.341722,3.13642384 C139.019868,3.64503311 139.613245,4.83178808 139.952318,6.44238411 L153.345695,63.2370861 L168.010596,6.44238411 C168.519205,4.74701987 169.112583,3.64503311 169.70596,3.13642384 C170.384106,2.62781457 171.486093,2.28874172 173.011921,2.28874172 L180.895364,2.28874172 C182.251656,2.28874172 183.01457,2.96688742 183.01457,4.40794702 C183.01457,4.83178808 182.929801,5.25562914 182.845033,5.76423841 C182.760265,6.27284768 182.590728,6.95099338 182.251656,7.88344371 L161.822517,73.4092715 C161.313907,75.1046358 160.72053,76.2066225 160.042384,76.7152318 C159.364238,77.2238411 158.262252,77.5629139 156.821192,77.5629139 L149.531126,77.5629139 C147.92053,77.5629139 146.818543,77.3086093 146.140397,76.7152318 C145.462252,76.1218543 144.868874,75.0198675 144.529801,73.3245033 L131.390728,18.6490066 L118.336424,73.2397351 C117.912583,74.9350993 117.403974,76.0370861 116.725828,76.6304636 C116.047682,77.2238411 114.860927,77.4781457 113.335099,77.4781457 L106.045033,77.4781457 Z M214.972185,79.7668874 C210.564238,79.7668874 206.156291,79.2582781 201.917881,78.2410596 C197.67947,77.2238411 194.37351,76.1218543 192.169536,74.8503311 C190.813245,74.0874172 189.880795,73.2397351 189.541722,72.4768212 C189.202649,71.7139073 189.033113,70.8662252 189.033113,70.1033113 L189.033113,65.7801325 C189.033113,64 189.711258,63.1523179 190.982781,63.1523179 C191.491391,63.1523179 192,63.2370861 192.508609,63.4066225 C193.017219,63.5761589 193.780132,63.9152318 194.627815,64.2543046 C197.509934,65.5258278 200.646358,66.5430464 203.952318,67.2211921 C207.343046,67.8993377 210.649007,68.2384106 214.039735,68.2384106 C219.380132,68.2384106 223.533775,67.3059603 226.415894,65.4410596 C229.298013,63.5761589 230.823841,60.8635762 230.823841,57.3880795 C230.823841,55.0145695 230.060927,53.0649007 228.535099,51.4543046 C227.009272,49.8437086 224.127152,48.402649 219.97351,47.0463576 L207.682119,43.2317881 C201.49404,41.2821192 196.916556,38.4 194.119205,34.5854305 C191.321854,30.8556291 189.880795,26.7019868 189.880795,22.2940397 C189.880795,18.7337748 190.643709,15.597351 192.169536,12.8847682 C193.695364,10.1721854 195.729801,7.7986755 198.272848,5.93377483 C200.815894,3.98410596 203.698013,2.54304636 207.088742,1.52582781 C210.47947,0.508609272 214.039735,0.0847682119 217.769536,0.0847682119 C219.634437,0.0847682119 221.584106,0.169536424 223.449007,0.42384106 C225.398675,0.678145695 227.178808,1.01721854 228.95894,1.35629139 C230.654305,1.78013245 232.264901,2.20397351 233.790728,2.71258278 C235.316556,3.22119205 236.503311,3.72980132 237.350993,4.2384106 C238.537748,4.91655629 239.38543,5.59470199 239.89404,6.35761589 C240.402649,7.03576159 240.656954,7.96821192 240.656954,9.15496689 L240.656954,13.1390728 C240.656954,14.9192053 239.978808,15.8516556 238.707285,15.8516556 C238.029139,15.8516556 236.927152,15.5125828 235.486093,14.8344371 C230.654305,12.6304636 225.229139,11.5284768 219.210596,11.5284768 C214.378808,11.5284768 210.564238,12.2913907 207.936424,13.9019868 C205.308609,15.5125828 203.952318,17.9708609 203.952318,21.4463576 C203.952318,23.8198675 204.8,25.8543046 206.495364,27.4649007 C208.190728,29.0754967 211.327152,30.6860927 215.819868,32.1271523 L227.856954,35.9417219 C233.960265,37.8913907 238.368212,40.6039735 240.996026,44.0794702 C243.623841,47.5549669 244.895364,51.5390728 244.895364,55.9470199 C244.895364,59.592053 244.13245,62.8980132 242.691391,65.7801325 C241.165563,68.6622517 239.131126,71.205298 236.503311,73.2397351 C233.875497,75.3589404 230.739073,76.8847682 227.09404,77.986755 C223.27947,79.1735099 219.295364,79.7668874 214.972185,79.7668874 Z"
                        fill="currentColor"
                        fillRule="nonzero"
                      ></path>
                      <path
                        d="M230.993377,120.964238 C203.104636,141.562914 162.58543,152.498013 127.745695,152.498013 C78.9192053,152.498013 34.9245033,134.442384 1.69536424,104.434437 C-0.932450331,102.060927 1.4410596,98.8397351 4.57748344,100.704636 C40.5192053,121.557616 84.8529801,134.188079 130.712583,134.188079 C161.65298,134.188079 195.645033,127.745695 226.924503,114.521854 C231.586755,112.402649 235.570861,117.57351 230.993377,120.964238 Z M242.606623,107.740397 C239.046358,103.162914 219.04106,105.536424 209.970861,106.638411 C207.258278,106.977483 206.834437,104.603974 209.292715,102.823841 C225.229139,91.6344371 251.422517,94.8556291 254.474172,98.5854305 C257.525828,102.4 253.62649,128.593377 238.707285,141.139073 C236.418543,143.088742 234.21457,142.071523 235.231788,139.528477 C238.622517,131.136424 246.166887,112.233113 242.606623,107.740397 Z"
                        fill="#FF9900"
                      ></path>
                    </g>
                  </svg>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <svg
                    className="-mx-5 -mt-2 -mb-3 h-8 w-24"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 120 60"
                  >
                    <path
                      fill="currentColor"
                      d="M40 41.753V18.708h1.25v3.625a4.74 4.74 0 0 0 .408-.511c1.044-2.166 3.246-3.533 5.65-3.506 2.85-.085 5.166.97 6.527 3.506a11.27 11.27 0 0 1 .272 10.331c-1.268 2.842-4.4 4.255-7.753 3.736a6.27 6.27 0 0 1-5.004-3.302v9.165zm1.25-14.893l.28 2.706c.494 3.08 2.315 4.9 5.174 5.242a5.88 5.88 0 0 0 6.459-3.736c1.112-2.65 1.03-5.65-.22-8.238a5.76 5.76 0 0 0-6.068-3.353 5.61 5.61 0 0 0-5.012 4.144 28.62 28.62 0 0 0-.613 3.234zm39.498 3.132a6.74 6.74 0 0 1-6.587 5.957c-5.242.264-7.702-3.217-8.093-7.234a11.59 11.59 0 0 1 1.021-6.383 7.12 7.12 0 0 1 7.412-3.974 6.81 6.81 0 0 1 6.042 5.183 34.97 34.97 0 0 1 .587 3.83H67.363c-.255 3.642 1.702 6.57 4.476 7.276 3.455.85 6.408-.647 7.48-3.932.238-.843.672-.962 1.438-.723zm-13.395-3.787h12.314c-.077-3.88-2.493-6.7-5.77-6.732-3.7-.06-6.383 2.647-6.544 6.732zm15.94 3.872H84.5a4.84 4.84 0 0 0 2.842 4.17 7.43 7.43 0 0 0 6.451-.17 2.9 2.9 0 0 0 1.702-2.851 2.63 2.63 0 0 0-1.77-2.63c-1.328-.494-2.74-.766-4.093-1.2a30 30 0 0 1-4.119-1.506c-2.18-1.064-2.315-5.208.153-6.52a8.69 8.69 0 0 1 8.306-.128c1.594.88 2.475 2.657 2.213 4.46H95.15c0-.05-.094-.094-.094-.145-.128-3.3-2.902-4.332-5.88-4.042-.9.1-1.753.372-2.553.774a2.55 2.55 0 0 0-1.48 2.553 2.55 2.55 0 0 0 1.702 2.4c1.3.477 2.68.783 4.025 1.157l3.25.85a3.84 3.84 0 0 1 2.638 3.464c.26 1.745-.63 3.46-2.204 4.255-2.842 1.608-7.523 1.183-9.608-.85-1.067-1.073-1.662-2.53-1.65-4.042zm28.78-6.374h-1.132c0-.153-.06-.3-.077-.417a3.7 3.7 0 0 0-3.013-3.557 7.43 7.43 0 0 0-4.774.23 2.9 2.9 0 0 0-2.102 2.766 2.67 2.67 0 0 0 2.042 2.689l5.174 1.328a14.39 14.39 0 0 1 1.65.502c1.65.6 2.77 2.132 2.82 3.883a4.25 4.25 0 0 1-2.6 4.04 9.47 9.47 0 0 1-7.659.077 5.31 5.31 0 0 1-3.2-5.157h1.106c.416 2.005 1.793 3.675 3.682 4.465s4.046.596 5.764-.516a3.04 3.04 0 0 0 1.634-2.842 2.63 2.63 0 0 0-1.796-2.613c-1.328-.494-2.74-.757-4.093-1.2a30.15 30.15 0 0 1-4.144-1.489c-2.128-1.047-2.298-5.157.128-6.468a8.57 8.57 0 0 1 8.442-.094 4.45 4.45 0 0 1 2.136 4.366zm-74.13 11.83a1.95 1.95 0 0 1-2.417-.919l-4.4-6.085-.638-.85-5.106 6.944a1.87 1.87 0 0 1-2.298.902l6.578-8.825-6.12-7.974c.908-.328 1.92.028 2.425.85l4.56 6.16 4.587-6.136a1.83 1.83 0 0 1 2.281-.851L35.02 21.9l-3.217 4.187a.85.85 0 0 0 0 1.268l6.127 8.178zm27.93-16.892v1.2a6.17 6.17 0 0 0-6.57 6.374q0 4.204 0 8.408v.953h-1.217v-16.86h1.2v3.455c1.472-2.52 3.744-3.455 6.595-3.523zM7.333 26.59l.536-2.647c1.472-5.234 7.472-7.412 11.6-4.17 2.417 1.898 3.02 4.587 2.902 7.617H8.754c-.22 5.412 3.685 8.68 8.68 7.012 1.646-.6 2.885-1.968 3.293-3.668.264-.85.7-.996 1.498-.75a6.91 6.91 0 0 1-3.302 5.047 8 8 0 0 1-9.319-1.191c-1.216-1.367-1.95-3.095-2.093-4.92 0-.3-.1-.58-.17-.85q-.01-.757-.01-1.48zm1.438-.366h12.314c-.077-3.923-2.553-6.706-5.855-6.732-3.676-.05-6.306 2.672-6.468 6.715z"
                    />
                  </svg>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <svg
                    className="inline w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    fill="#e10098"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M50 6.90308L87.323 28.4515V71.5484L50 93.0968L12.677 71.5484V28.4515L50 6.90308ZM16.8647 30.8693V62.5251L44.2795 15.0414L16.8647 30.8693ZM50 13.5086L18.3975 68.2457H81.6025L50 13.5086ZM77.4148 72.4334H22.5852L50 88.2613L77.4148 72.4334ZM83.1353 62.5251L55.7205 15.0414L83.1353 30.8693V62.5251Z"
                    />
                    <circle cx="50" cy="9.3209" r="8.82" />
                    <circle cx="85.2292" cy="29.6605" r="8.82" />
                    <circle cx="85.2292" cy="70.3396" r="8.82" />
                    <circle cx="50" cy="90.6791" r="8.82" />
                    <circle cx="14.7659" cy="70.3396" r="8.82" />
                    <circle cx="14.7659" cy="29.6605" r="8.82" />
                  </svg>
                  <span>GraphQL</span>
                </li>
              </ol>
            </div>
            <div>
              <h4 className="text-2xl">Key Achievements</h4>
              <ol className="list-disc pt-2 pl-5">
                <li>
                  Integrated Xave's Balancer V2 based FX Pools to the platform allowing our users to
                  swap from PHT to USDT/USDC/XSGD with minimal slippage.
                </li>
                <li>
                  Combined all of the repos to a single mono-repo with Turbo which enabled to share
                  a lot of components and configuration, cutting down on a lot of duplication.
                </li>
                <li>
                  Opted for Dune.com instead of Subgraph which led to finishing our analytics and
                  transparency page in 2 weeks when the latter was already on track to taking a
                  month+.
                </li>
                <li>
                  Immediately pushed for linting and formatting with prettier before commit with
                  Husky leading to cleaner more maintainable code.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
