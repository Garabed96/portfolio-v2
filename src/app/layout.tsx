import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Garo Nazarian - Full Stack Developer | Web3 & Cloud Expert',
    template: '%s | Garo Nazarian - Full Stack Developer',
  },
  description:
    'Full Stack Developer with 6+ years of experience specializing in web and blockchain applications. Expert in React, Node.js, TypeScript, and cloud architecture. Available for consulting and development projects.',
  keywords: [
    'Garo Nazarian',
    'Full Stack Developer',
    'Web3 Developer',
    'Blockchain Developer',
    'React Developer',
    'TypeScript',
    'Node.js',
    'Smart Contracts',
    'DApp Development',
    'Cloud Architecture',
    'Frontend Developer',
    'Backend Developer',
    'Software Engineer',
    'Portfolio',
  ],
  authors: [{ name: 'Garo Nazarian', url: 'https://github.com/burtonium' }],
  creator: 'Garo Nazarian',
  publisher: 'Garo Nazarian',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://portfolio.nephelo.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio.nephelo.io',
    siteName: 'Garo Nazarian - Full Stack Developer',
    title: 'Garo Nazarian - Full Stack Developer | Web3 & Blockchain Expert',
    description:
      'Full Stack Developer with 7+ years of experience specializing in web3 and blockchain applications. Expert in React, Node.js, TypeScript, and blockchain technologies.',
    // images: [
    //   {
    //     url: '/profile.jpg',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Garo Nazarian - Full Stack Developer',
    //     type: 'image/jpeg'
    //   }
    // ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@matt_burton',
    creator: '@matt_burton',
    title: 'Garo Nazarian - Full Stack Developer | Web3 & Blockchain Expert',
    description:
      'Full Stack Developer with 7+ years of experience specializing in web3 and blockchain applications. Expert in React, Node.js, TypeScript, and blockchain technologies.',
    // images: ['/profile.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ff6b6b" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        {/* Preload critical project images - these will be handled by Next.js Image optimization */}
        <link
          rel="preload"
          as="image"
          href="https://cdn-icons-png.flaticon.com/512/919/919832.png"
        />
        <link
          rel="preload"
          as="image"
          href="https://www.postgresql.org/media/img/about/press/elephant.png"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Garo Nazarian',
              jobTitle: 'Full Stack Developer',
              description:
                'Full Stack Developer with 7+ years of experience specializing in web3 and blockchain applications',
              url: 'https://portfolio.nephelo.io',
              sameAs: [
                'https://github.com/Garabed96',
                'https://www.linkedin.com/in/garo-nazarian/',
              ],
              knowsAbout: [
                'Web3 Development',
                'Blockchain Development',
                'React',
                'TypeScript',
                'Node.js',
                'Smart Contracts',
                'DApp Development',
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Balthazar DAO',
              },
              alumniOf: {
                '@type': 'Organization',
                name: 'xx network',
              },
            }),
          }}
        />
      </head>
      <body className={`${raleway.variable} antialiased`}>{children}</body>
    </html>
  );
}
