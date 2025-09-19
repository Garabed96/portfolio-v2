'use client';

import { useMemo, useReducer } from 'react';
import MouseShadow from './components/MouseShadow';
import Navbar from './components/Navbar';
import ImageCarousel from './components/ImageCarousel';
import {
  ExpressIcon,
  HardhatIcon,
  GithubIcon,
  LinkedinIcon,
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
  BackendSystemsIcon,
  AwsIcon,
  VercelIcon,
  GraphQLIcon as _GraphQLIcon,
  DjangoIcon,
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

import { ExternalLink } from 'lucide-react';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import { JsIcon } from './components/icons/JsIcon';
import { ContentfulLogo } from './components/icons/ContentfulLogo';

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
    images: [tokenDashboardScreen1, tokenDashboardScreen2, tokenDashboardScreen3],
  },
  {
    name: 'token sale portals',
    repo: 'https://github.com/Burtonium/token-sale-portal',
    images: [tokenSaleScreen1, tokenSaleScreen2],
    url: 'https://sale.getrealtoken.io/',
  },
  {
    name: 'points applications',
    url: 'https://quest.talisman.xyz/',
    images: [pointsAppScreen1, pointsAppScreen2],
  },
  {
    name: 'web wallets',
    repo: 'https://github.com/xxfoundation/wallet.xx.network',
    url: 'https://wallet.xx.network/',
    images: [webWalletScreen1, webWalletScreen2, webWalletScreen3],
  },
  {
    name: 'web messengers',
    repo: 'https://github.com/xxfoundation/haven',
    url: 'https://haven.xx.network/',
    images: [webMessengerScreen1, webMessengerScreen2, webMessengerScreen3],
  },
  {
    name: 'node operator dashboards',
    repo: 'https://github.com/Burtonium/node-operator-dashboard',
    url: 'https://dashboard.xx.network/',
    images: [
      nodeOperatorDashboardScreen1,
      nodeOperatorDashboardScreen2,
      nodeOperatorDashboardScreen3,
    ],
  },
] as const;

const _projectNames = projects.map(project => project.name);
const projectImages = projects.flatMap(project =>
  project.images.map(img => [project.name, img.src] as const)
);

const allImages = projectImages.map(([, img]) => img);

type Action =
  | { type: 'nextProject' }
  | { type: 'previousProject' }
  | { type: 'nextImage' }
  | { type: 'previousImage' }
  | { type: 'setSelectedImageIndex'; index: number };

interface State {
  selectedImageIndex: number;
}

const initialState: State = {
  selectedImageIndex: 0,
};

function portfolioReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'nextProject': {
      for (let i = state.selectedImageIndex; i < projectImages.length; i++) {
        if (projectImages[i][0] !== projectImages[state.selectedImageIndex][0]) {
          return {
            ...state,
            selectedImageIndex: i,
          };
        }
      }

      return {
        ...state,
      };
    }
    case 'previousProject': {
      for (let i = state.selectedImageIndex - 1; i >= 0; i--) {
        if (projectImages[i][0] !== projectImages[state.selectedImageIndex][0]) {
          return {
            ...state,
            selectedImageIndex: i,
          };
        }
      }
      return {
        ...state,
      };
    }
    case 'nextImage': {
      const nextIndex =
        state.selectedImageIndex + 1 < projectImages.length ? state.selectedImageIndex + 1 : 0;

      return {
        ...state,
        selectedImageIndex: nextIndex,
      };
    }
    case 'previousImage': {
      const previousIndex =
        state.selectedImageIndex - 1 >= 0 ? state.selectedImageIndex - 1 : projectImages.length - 1;

      return {
        ...state,
        selectedImageIndex: previousIndex,
      };
    }
    case 'setSelectedImageIndex': {
      return {
        ...state,
        selectedImageIndex: action.index,
      };
    }
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);
  const selectedProject = useMemo(
    () => projects.find(project => project.name === projectImages[state.selectedImageIndex][0]),
    [state.selectedImageIndex]
  );

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
              <h1 className="text-4xl leading-none md:text-5xl xl:text-6xl">Garo Nazarian</h1>
              <div>
                <h2 className="text-primary-400 mb-8 text-4xl leading-none md:text-5xl xl:text-6xl">
                  Full Stack Developer
                </h2>
                <p className="font-title text-lg leading-6 md:text-xl lg:text-2xl">
                  with 7+ years of development experience and exactly 0 professional design
                  experience.
                </p>
              </div>
              <ol className="mt-5 space-y-2 lg:flex lg:space-y-0 lg:space-x-5 lg:text-lg">
                <li>
                  <a
                    rel="noopener"
                    className="hover:text-primary-400 flex cursor-pointer items-center space-x-1"
                    href="https://github.com/Garabed96"
                  >
                    <GithubIcon />
                    <span>Github</span>
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener"
                    className="hover:text-primary-400 flex cursor-pointer items-center space-x-1"
                    href="https://www.linkedin.com/in/garo-nazarian/"
                  >
                    <LinkedinIcon />
                    <span>LinkedIn</span>
                  </a>
                </li>
                {/*<li className="flex items-center space-x-1">*/}
                {/*  <form method="get" action="Resume.docx">*/}
                {/*    <button*/}
                {/*      className="hover:text-primary-400 flex cursor-pointer items-center space-x-1"*/}
                {/*      type="submit"*/}
                {/*    >*/}
                {/*      <DocxIcon />*/}
                {/*      <span>Docx Resume</span>*/}
                {/*    </button>*/}
                {/*  </form>*/}
                {/*</li>*/}
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
                    <DjangoIcon />
                    <span></span>
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
      <section
        className="main-section flex flex-col items-center justify-center py-16"
        id="projects"
      >
        <h2 className="mb-12 px-3 text-center text-3xl md:text-4xl lg:text-5xl">
          I&apos;ve made&nbsp;
          <span className="text-primary-400">{selectedProject?.name}</span>
        </h2>
        <div className="relative">
          <ImageCarousel
            images={allImages}
            selectedIndex={state.selectedImageIndex}
            onIndexChange={index => {
              dispatch({ type: 'setSelectedImageIndex', index });
            }}
            className="w-full max-w-5xl"
          />
          <div className="absolute right-6 bottom-12 flex gap-2">
            {selectedProject?.repo && (
              <a
                href={selectedProject.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-black/60 p-2 text-white transition-colors hover:bg-black/90"
                title="View on GitHub"
              >
                <GithubIcon className="text-primary-400 h-10 w-10 drop-shadow-lg lg:h-12 lg:w-12" />
              </a>
            )}
            {selectedProject?.url && (
              <a
                href={selectedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-black/60 p-2 text-white transition-colors hover:bg-black/90"
                title="Visit website"
              >
                <ExternalLink className="text-primary-400 h-10 w-10 drop-shadow-lg lg:h-12 lg:w-12" />
              </a>
            )}
          </div>
        </div>
        <p className="text-primary-400/75 mt-5 max-w-xl text-center text-sm">
          **Some of these project urls are <strong>not production deployments</strong> and may be
          moved, be partially broken, or completely down. Please notify me if you find any issues.**
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
                  <Image
                    className="inline"
                    width={22}
                    height={22}
                    src="https://cdn-icons-png.flaticon.com/512/919/919832.png"
                    alt="TypeScript logo"
                    unoptimized
                  />
                  <span>Typescript</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <HardhatIcon />
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <NextjsIcon />
                  <span>Nextjs</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <a href="https://www.postgresql.org/">
                    <Image
                      className="inline"
                      width={22}
                      height={22}
                      src="https://www.postgresql.org/media/img/about/press/elephant.png"
                      alt="PostgreSQL logo"
                      unoptimized
                    />
                  </a>
                  <span>Postgresql</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <TailwindcssIcon />
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <AwsIcon />
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <VercelIcon />
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <SolidityIcon />
                  <span>Solidity</span>
                </li>
              </ol>
            </div>
            <div>
              <h4 className="text-2xl">Key Achievements</h4>
              <ol className="list-disc pt-2 pl-5">
                <li>
                  Integrated Xave&apos;s Balancer V2 based FX Pools to the platform allowing our
                  users to swap from PHT to USDT/USDC/XSGD with minimal slippage.
                </li>
                <li>
                  Combined all of the repos to a single mono-repo with Turbo which enabled to share
                  a lot of components and configuration, cutting down on a lot of duplication and
                  dev time on maintenance.
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
                  <Image
                    className="inline"
                    width={22}
                    height={22}
                    src="https://cdn-icons-png.flaticon.com/512/919/919832.png"
                    alt="TypeScript logo"
                    unoptimized
                  />
                  <span>Typescript</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <HardhatIcon />
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
                    <Image
                      className="inline"
                      width={22}
                      height={22}
                      src="https://www.postgresql.org/media/img/about/press/elephant.png"
                      alt="PostgreSQL logo"
                      unoptimized
                    />
                  </a>
                  <span>Postgresql</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <TailwindcssIcon />
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <AwsIcon />
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <VercelIcon />
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <SolidityIcon />
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
                  <Image
                    className="inline"
                    width={22}
                    height={22}
                    src="https://cdn-icons-png.flaticon.com/512/919/919832.png"
                    alt="TypeScript logo"
                    unoptimized
                  />
                  <span>Typescript</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <JsIcon />
                  <span>Javascript</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <NextjsIcon />
                  <span>Nextjs</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <NuxtjsIcon />
                  <span>Nuxtjs</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <a href="https://www.postgresql.org/">
                    <Image
                      className="inline"
                      width={22}
                      height={22}
                      src="https://www.postgresql.org/media/img/about/press/elephant.png"
                      alt="PostgreSQL logo"
                      unoptimized
                    />
                  </a>
                  <span>Postgresql</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <TailwindcssIcon />
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <ContentfulLogo />
                  <span>Contentful</span>
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <AwsIcon />
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <ExpressIcon />
                </li>
                <li className="m-2 flex items-center space-x-1">
                  <svg
                    className="inline w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    fill="#e10098"
                  >
                    <title>GraphQL Logo</title>
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
              <h4 className="text-2xl">Responsibilities</h4>
              <ol className="list-disc pt-2 pl-5">
                <li>
                  Designed a website integrated with Contentful CMS in Nuxt.js (Vue.js), enabling
                  the marketing team to maintain consistent branding while posting promotional
                  content.
                </li>
                <li>
                  Engineered a dashboard using Nuxt.js (Vue.js), Express, and PostgreSQL to display
                  performance metrics based on a database of approximately 200 million rounds.
                </li>
                <li>
                  Provided 150+ node operators with essential support and comprehensive performance
                  insights:&nbsp;
                  <a href="https://dashboard.xx.network/">https://dashboard.xx.network/</a>
                </li>
                <li>
                  Developed software allowing 300+ end-users to interact with the product, enabling
                  them to utilize the company&apos;s financial services:&nbsp;
                  <a href="https://wallet.xx.network/">https://wallet.xx.network/</a>
                </li>
                <li>
                  Created a messenger application using Typescript/React and in-house library XXDK,
                  expanding access to private messaging and group chats for 500+ users:{' '}
                  <a href="https://github.com/xxfoundation/elixxir-speakeasy-web/tree/dev">
                    https://github.com/xxfoundation/elixxir-speakeasy-web/tree/dev
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
