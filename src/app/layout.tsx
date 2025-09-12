import type { Metadata } from 'next';
import { Raleway, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap'
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: 'Mathieu Bertin - Full Stack Developer | Web3 & Blockchain Expert',
    template: '%s | Mathieu Bertin - Full Stack Developer'
  },
  description:
    'Full Stack Developer with 10+ years of experience specializing in web3 and blockchain applications. Expert in React, Node.js, TypeScript, and blockchain technologies. Available for consulting and development projects.',
  keywords: [
    'Mathieu Bertin',
    'Full Stack Developer',
    'Web3 Developer',
    'Blockchain Developer',
    'React Developer',
    'TypeScript',
    'Node.js',
    'Smart Contracts',
    'DApp Development',
    'Frontend Developer',
    'Backend Developer',
    'Software Engineer',
    'Portfolio',
    'Balthazar DAO',
    'xx network'
  ],
  authors: [{ name: 'Mathieu Bertin', url: 'https://github.com/burtonium' }],
  creator: 'Mathieu Bertin',
  publisher: 'Mathieu Bertin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  metadataBase: new URL('https://portfolio.nephelo.io'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio.nephelo.io',
    siteName: 'Mathieu Bertin - Full Stack Developer',
    title: 'Mathieu Bertin - Full Stack Developer | Web3 & Blockchain Expert',
    description:
      'Full Stack Developer with 10+ years of experience specializing in web3 and blockchain applications. Expert in React, Node.js, TypeScript, and blockchain technologies.'
    // images: [
    //   {
    //     url: '/profile.jpg',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Mathieu Bertin - Full Stack Developer',
    //     type: 'image/jpeg'
    //   }
    // ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@matt_burton',
    creator: '@matt_burton',
    title: 'Mathieu Bertin - Full Stack Developer | Web3 & Blockchain Expert',
    description:
      'Full Stack Developer with 10+ years of experience specializing in web3 and blockchain applications. Expert in React, Node.js, TypeScript, and blockchain technologies.'
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
      'max-snippet': -1
    }
  }
};

export default function RootLayout({
  children
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Mathieu Bertin',
              jobTitle: 'Full Stack Developer',
              description:
                'Full Stack Developer with 10+ years of experience specializing in web3 and blockchain applications',
              url: 'https://portfolio.nephelo.io',
              sameAs: [
                'https://github.com/burtonium',
                'https://www.linkedin.com/in/mathieu-bertin'
              ],
              knowsAbout: [
                'Web3 Development',
                'Blockchain Development',
                'React',
                'TypeScript',
                'Node.js',
                'Smart Contracts',
                'DApp Development'
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Balthazar DAO'
              },
              alumniOf: {
                '@type': 'Organization',
                name: 'xx network'
              }
            })
          }}
        />
      </head>
      <body className={`${raleway.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
