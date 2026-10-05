# Flora Explorer

A botanical field guide to useful plants, built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- Beautiful black & white editorial museum aesthetic with green as the single accent color
- Multilingual support (English, Hindi, Spanish)
- Interactive globe showing where plants grow
- Detailed plant pages with climate dials, composition charts, seasonality wheels, and more
- Compare two plants side by side
- Search plants by name in any language
- Responsive design that works on mobile and desktop
- Accessible UI with proper focus management, contrast, and screen reader support
- Smooth animations and page transitions
- SEO optimized with OpenGraph tags and sitemap

## Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
# or
npm install
```

### Development

Run the development server:

```bash
pnpm dev
# or
npm run dev
```

The site will be available at http://localhost:3000

### Building for Production

To create a production build:

```bash
pnpm build
# or
npm run build
```

To preview the production build:

```bash
pnpm start
# or
npm run start
```

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - Reusable React components
- `/data` - Plant data and utility functions
- `/lib` - Utility functions and helpers
- `/public` - Static assets

## Adding a New Plant

To add a new plant to the collection:

1. Add a new plant object to `data/plants.ts` following the existing format
2. Add the plant's image to the `public/images/` directory
3. The plant will automatically appear in the explore grid, search results, and related plants sections

## Adding a New Language

To add a new language:

1. Add the language to the `languages` array in `lib/i18n.ts`
2. Add a new dictionary object for the language with all translation keys
3. Update the `dictionaries` export to include the new language
4. Add the language to the `months` export
5. Update the `isLang` function in `components/providers/language-provider.tsx`

## Deployment

The site is optimized for deployment on Vercel. Simply push to a GitHub repository and connect it to Vercel for automatic deployments.

## Design System

- **Color Scheme**: 
  - Light: Off-white #F5F5F2 background, near-black #0A0A0A text, accent green #1F8A4C
  - Dark: #0A0A0A background, #F5F5F2 text, accent green #4ADE80 with soft glow
- **Typography**: 
  - Display: Fraunces (serif)
  - Body: Inter (sans-serif)
  - Labels/Scientific names: JetBrains Mono (monospace)
- **Icons**: Lucide icons (SVG)
- **Animations**: Framer Motion with GSAP-inspired effects

## Accessibility

- Proper color contrast (4.5:1 minimum)
- Keyboard navigable interface
- ARIA labels and roles
- Focus visible indicators
- Respects prefers-reduced-motion
- Text resizing support

## License

MIT
