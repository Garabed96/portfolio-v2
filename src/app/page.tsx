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
  TanstackQueryIcon,
  GraphQLIcon as _GraphQLIcon,
  DjangoIcon,
} from './components/icons';
import webWalletScreen1 from './assets/web-wallet-screen-1.png';
import webWalletScreen2 from './assets/web-wallet-screen-2.png';
import webWalletScreen3 from './assets/web-wallet-screen-3.png';
import webMessengerScreen1 from './assets/web-messenger-screen-1.png';
import webMessengerScreen2 from './assets/web-messenger-screen-2.png';
import webMessengerScreen3 from './assets/web-messenger-screen-3.png';
import tokenDashboardScreen3 from './assets/token-dashboard-screen-3.png';
import vendorDashboardScreen1 from './assets/vendor-dashboard-screen-1.png';
import vendorDashboardScreen2 from './assets/vendor-dashboard-screen-2.png';
import hamzaWeb3StoreScreen1 from './assets/hamza-web3-store-screen-1.png';
import hamzaWeb3StoreScreen2 from './assets/hamza-web3-store-screen-2.png';
import hamzaWeb3StoreScreen3 from './assets/hamza-web3-store-screen-3.png';
import flexLivingScreen1 from './assets/flex-living-screen-1.png';
import flexLivingScreen2 from './assets/flex-living-screen-2.png';
import flexLivingScreen3 from './assets/flex-living-screen-3.png';
import sumPlusScreen1 from './assets/sum-plus-screen-1.png';
import sumPlusScreen2 from './assets/sum-plus-screen-1.png';
import sumPlusScreen3 from './assets/sum-plus-screen-3.png';
import sumPlusScreen4 from './assets/sum-plus-screen-4.png';

import { ExternalLink, TrendingUp } from 'lucide-react';
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
    name: 'web3 multi-vendor dashboards',
    // repo: 'https://github.com/Burtonium/token-dashboard',
    url: 'https://admin.hamza.market/onboarding',
    images: [vendorDashboardScreen1, vendorDashboardScreen2, tokenDashboardScreen3],
  },
  {
    name: 'web3 ecommerce store',
    repo: 'https://github.com/LoadPipe/Hamza-medusa',
    images: [hamzaWeb3StoreScreen1, hamzaWeb3StoreScreen2, hamzaWeb3StoreScreen3],
    url: 'https://hamza.market/en',
  },
  {
    name: 'Flex Living Weekend Project',
    repo: 'https://github.com/Garabed96/FlexLivingDevAssessment',
    url: 'https://flex-living-dev-assessment.vercel.app/properties',
    images: [flexLivingScreen3, flexLivingScreen2, flexLivingScreen1],
  },
  {
    name: 'web wallets',
    repo: 'https://github.com/xxfoundation/wallet.xx.network',
    url: 'https://wallet.xx.network/',
    images: [webWalletScreen1, webWalletScreen2, webWalletScreen3],
  },
  {
    name: 'React Native Health App',
    repo: 'https://github.com/xxfoundation/haven',
    images: [sumPlusScreen1, sumPlusScreen2, sumPlusScreen3, sumPlusScreen4],
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
                  Full-Stack Developer | Cloud Architecture & AWS
                </h2>
                <p className="font-title text-lg leading-6 md:text-xl lg:text-2xl">
                  6+ years of developing scalable systems from the ground up, with absolutely no
                  interest in UI/UX design.
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
                  <li className="flex items-center space-x-1">
                    <TanstackQueryIcon />
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
                    <span>Django</span>
                  </li>

                  <li className="flex items-center space-x-1">
                    <AwsIcon />
                    <span>AWS</span>
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl">I build scalable</h2>
          <h2 className="text-primary-400 text-5xl md:text-6xl lg:text-7xl">software</h2>
          <h2 className="text-3xl md:text-4xl lg:text-5xl">from the ground up.</h2>
        </div>
        <p className="text-base md:text-lg lg:text-xl">
          Meaning I can provide value at <strong>every level</strong> of developing robust and efficient applications for your business.
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
              <AwsIcon />
            </div>
            <p>Cloud Architecture and Development on AWS.</p>
          </li>
          <li className="frosted-glass-dark flex items-center space-x-4 rounded-xl p-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg">
              <BackendSystemsIcon />
            </div>
            <p>Developing resilient backend services and designing intuitive RESTful APIs.</p>
          </li>
          <li className="frosted-glass-dark flex items-center space-x-4 rounded-xl p-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg">
              <TrendingUp className="h-12 w-12" />
            </div>
            <p>Optimizing application performance and scalability.</p>
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
                <span className="font-bold text-white">HAMZA · Remote</span>&nbsp;
                <span className="mb-4 text-gray-300">[January 2024 – Current]</span>
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
                  <TanstackQueryIcon />
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
                  MedusaJS
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
                  Contributed to the accelerated launch of an e-commerce platform using MedusaJS, which secured over 1000
                  customers in its initial three months of operation.
                </li>
                <li>
                  Architected and led the development of a feature-rich Admin Portal using the full Tanstack Suite (Router, Query,
                  Form, Table) with Zod for type-safe form validation, establishing a team-wide SOP that accelerated future
                  development.
                </li>
                <li>
                  Collaborated closely with vendor owners to understand business requirements, and development sprint roadmaps,
                  ensuring alignment between stakeholder expectations and technical delivery.
                </li>
                <li>
                  Implemented Chainlink Price feeds to display product prices in cryptocurrencies (USDT, ETH, USDC), enabling
                  real-time decentralized price conversions in the marketplace, utilized in currency changers, and developed customer
                  settings to enhance personalization.
                </li>
              </ol>
            </div>
          </div>
          <div className="frosted-glass-dark space-y-4 p-5">
            <div>
              <h3 className="mb-2 text-2xl leading-tight md:text-3xl lg:text-4xl">
                Senior Full Stack Developer
              </h3>
              <p>
                <span className="font-bold text-white">Contract Developer · Full-time</span>&nbsp;
                <span className="mb-4 text-gray-300">Sep 2022 - Dec 2023]</span>
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
                  <DjangoIcon />
                  <span>Django</span>
                </li>
              </ol>
            </div>
            <div>
              <h4 className="mb-0 text-lg md:text-xl">Responsibilities</h4>
              <ol className="list-disc pt-2 pl-5">
                <li>
                  Developed and maintained a Nextjs support website for a Web3 company OrdKit, enabling customers to submit
                  tickets and employees to efficiently approve refunds for incorrect payments, saving the customer support team time
                  and increasing customer satisfaction. Utilizing Next13 SSR and Supabase for role based authentication.
                </li>
                <li>
                  Developed a Vite PWA for improved performance and 90 and above grading on all lighthouse metrics for
                  TuffDAO. The simple application boasted seamless animations and was built using React hooks, Framer,
                  Blurhash, and Node.js (SMTP for contact).
                </li>
                <li>
                  Prototyped a cross-platform Health Food Logging and Meditation App SumPlus in React Native, collaborating
                  with UI/UX designers and developers; integrated USDA FoodData API for nutrition data, and implemented
                  features including fasting timer, calendar, and meditation timer, with state management via Redux Toolkit and
                  RTK Query for caching.
                </li>
                <li>
                  Configured and automated CI pipeline with GitHub Actions for SumPlus to enforce code quality through
                  linting, unit testing (Jest), and build verification.
                </li>
                <li>
                  Stabilized the production AWS EC2 environment for an AQI monitoring client, AirDeveloppa, by architecting a
                  monitoring solution with AWS CloudWatch. Diagnosed and resolved critical Nginx configuration errors and
                  persistent CPU throttling to ensure high uptime.
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
                <span className="font-bold text-white">Inclusive Media Design Centre · Full-time</span>
                &nbsp;
                <span className="mb-4 text-gray-300">[Sep 2018 - Sep 2022]</span>
              </p>
              {/*<p>The first and only quantum-resistant and privacy-focused blockchain ecosystem.</p>*/}
            </div>
            <div>
              <h4 className="text-lg md:text-xl">Urls</h4>
              <ul>
                <li>
                  Website: <a href="https://www.torontomu.ca/inclusive-media/">https://www.torontomu.ca/inclusive-media/</a>
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
                  <DjangoIcon />
                  <span>Django</span>
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
                  <ExpressIcon />
                </li>

              </ol>
            </div>
            <div>
              <h4 className="text-2xl">Responsibilities</h4>
              <ol className="list-disc pt-2 pl-5">
                <li>
                  Co-authored the successful grant proposal and technical specifications that secured $250,000 CAD in government
                  funding for the project prototype.
                </li>
                <li>
                  Led a team of 3 developers, managing the project roadmap on Jira and serving as the primary technical liaison for
                  the project owner. My leadership on the backend and collaboration with the frontend developer ensured timely
                  delivery of features.
                </li>
                <li>
                  Architected and developed the Django backend for a data collection platform used in a PhD user study, capturing
                  subjective assessments from D/HoH viewers on closed captioning quality factors (delay, speed, missing words)
                </li>
                <li>
                  Wrote a WebRTC application using Vidyo.IO’s API in .NET which sets up a WebRTC video stream.
                  Software was used in conjunction with a robot allowing a student with autism to stay at home and continue to
                  participate in class
                </li>
                <li>
                  Prioritized streaming traffic using Quality of Service techniques to ensure minimal latency and high performance
                  for 1080p 60fps video across varying network conditions.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
