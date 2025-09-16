# Portfolio v2

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

A modern, responsive portfolio website built with Next.js 15, React 19, TypeScript, and Tailwind CSS. Features include smooth scrolling navigation, image carousels, and optimized image preloading.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Image Optimization

This portfolio includes an automated image compression system to ensure optimal loading performance. All images are compressed using PNGQuant to reduce file sizes by 60-80% while maintaining visual quality.

### Available Scripts

- **`pnpm run compress-images`** - Compress all PNG images in `src/app/assets/` and show size comparison
- **`pnpm run compress-images:replace`** - Compress images and automatically replace the originals

### Adding New Images

When adding new images to your portfolio:

1. Place them in `src/app/assets/`
2. Run `pnpm run compress-images:replace` to optimize them
3. The compressed images will automatically replace the originals
4. Clean up any temporary files

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
