# 3D Galaxy Viewer

An interactive, real-time 3D galaxy visualization built with Next.js, React Three Fiber, and Three.js. Explore a procedurally generated spiral galaxy with configurable parameters, constellation overlays, star labels, and an immersive full-screen experience.

## Live Demo

[View Live on Vercel](https://vercel.com/gileb64375-5584s-projects/v0-3-d-galaxy-page)

---

## Features

### Core Visualization
- **Procedural Galaxy Generation** — Up to 200,000 stars rendered in real-time with configurable spiral arms, spin, randomness, and color gradients
- **Additive Blending** — Stars use `THREE.AdditiveBlending` for realistic glow and luminosity
- **Color Gradients** — Smooth color interpolation from core to edge (default: warm orange core to deep blue edges)
- **Slow Auto-Rotation** — Galaxy rotates naturally at 0.02 rad/s for a cinematic feel

### Interactive Controls
- **Orbit Controls** — Left-click drag to rotate, scroll to zoom, right-click drag to pan
- **Auto-Rotate Toggle** — Enable/disable automatic camera rotation around the galaxy
- **Reset View** — Snap camera back to the default position
- **Fullscreen Mode** — Immersive browser fullscreen experience
- **Screenshot Export** — Capture the current canvas view as a PNG file

### Overlays & HUD
- **Constellation Overlay** — Toggle visibility of constellation patterns (Orion, Big Dipper) with connecting lines
- **Star Labels** — Display named stars with their spectral type and magnitude (Sirius, Betelgeuse, Rigel, Vega, Altair)
- **Distance Indicator** — Real-time display of camera distance from the galactic center in light years
- **Minimap** — Overview panel showing camera position and viewport direction within the galaxy
- **Keyboard Shortcuts Modal** — Quick reference for all available shortcuts

### Performance
- **Quality Modes** — Switch between High (100K), Medium (60K), and Low (30K) star counts
- **Efficient Buffer Geometry** — Stars are rendered as a single `THREE.Points` object using `Float32Array` buffers
- **Depth Write Disabled** — Prevents z-fighting and ensures correct blending of overlapping stars

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `R` | Reset camera view |
| `S` | Take a screenshot |
| `F` | Toggle fullscreen |
| `A` | Toggle auto-rotate |
| `C` | Toggle constellation overlay |
| `L` | Toggle star labels |
| `M` | Toggle minimap |
| `?` | Show keyboard shortcuts help |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **3D Engine** | [Three.js](https://threejs.org/) via [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) |
| **3D Helpers** | [Drei](https://github.com/pmndrs/drei) (OrbitControls, Stars, Environment, Html) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) components |
| **Fonts** | [Geist Sans](https://vercel.com/font) / [Geist Mono](https://vercel.com/font) |
| **Language** | TypeScript 5 |
| **Package Manager** | pnpm |
| **Analytics** | [Vercel Analytics](https://vercel.com/analytics) |

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/girishlade111/3-d-galaxy-page.git

# Navigate to the project directory
cd 3-d-galaxy-page

# Install dependencies
pnpm install
```

### Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the galaxy viewer.

### Production Build

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

---

## Project Structure

```
3-d-galaxy-page/
├── app/
│   ├── globals.css          # Global styles and CSS custom properties
│   ├── layout.tsx           # Root layout with Geist fonts and Vercel Analytics
│   └── page.tsx             # Main galaxy viewer page (client component)
├── components/
│   ├── galaxy.tsx           # Core galaxy particle system (procedural generation)
│   ├── galaxy-controls.tsx  # Settings panel for galaxy parameters
│   ├── camera-controls.tsx  # Orbit controls with auto-rotate and damping
│   ├── constellation-overlay.tsx  # Constellation lines and star markers
│   ├── star-labels.tsx      # Named star labels with spectral data
│   ├── ui-overlay.tsx       # HUD with info panel, search, minimap, shortcuts
│   ├── loading-screen.tsx   # Loading spinner shown during Suspense
│   ├── theme-provider.tsx   # Theme provider for dark/light mode
│   └── ui/                  # shadcn/ui primitives
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── slider.tsx
├── lib/
│   └── utils.ts             # Utility functions (cn helper)
├── public/                  # Static assets
├── styles/
│   └── globals.css          # Additional global styles
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── next.config.mjs          # Next.js configuration
├── postcss.config.mjs       # PostCSS configuration
├── components.json          # shadcn/ui configuration
└── package.json             # Dependencies and scripts
```

---

## Galaxy Parameters

The galaxy is fully customizable through the settings panel. Here are the available parameters and their ranges:

| Parameter | Default | Min | Max | Step | Description |
|-----------|---------|-----|-----|------|-------------|
| **Stars Count** | 100,000 | 10,000 | 200,000 | 10,000 | Number of star particles in the galaxy |
| **Star Size** | 0.01 | 0.001 | 0.1 | 0.001 | Size of each star particle |
| **Galaxy Radius** | 5 | 1 | 20 | 0.1 | Overall radius of the galaxy disc |
| **Spiral Arms** | 4 | 2 | 8 | 1 | Number of spiral arms branching from the core |
| **Spiral Intensity** | 1.0 | -5.0 | 5.0 | 0.1 | How tightly the arms spin (negative reverses) |
| **Randomness** | 0.2 | 0 | 2 | 0.01 | Spread of stars away from spiral arms |
| **Randomness Power** | 3.0 | 1 | 10 | 0.1 | Exponent controlling randomness distribution |
| **Core Color** | `#ff6030` | — | — | — | Color of the galactic core |
| **Edge Color** | `#1b3984` | — | — | — | Color at the galaxy's outer edge |

---

## Constellation Data

The constellation overlay displays two pre-defined constellations:

- **Orion** — 5 connected stars positioned in 3D space
- **Big Dipper** — 7 connected stars forming the familiar ladle shape

Stars are rendered as white spheres (`0.05` radius) with semi-transparent blue connecting lines.

---

## Named Stars

The star label overlay displays the following stars with their astronomical data:

| Star | Spectral Type | Visual Magnitude |
|------|---------------|-----------------|
| Sirius | A1V | -1.46 |
| Betelgeuse | M1-2 Ia-ab | 0.42 |
| Rigel | B8 Ia | 0.13 |
| Vega | A0 Va | 0.03 |
| Altair | A7 V | 0.77 |

---

## Configuration

### Next.js (`next.config.mjs`)

- ESLint errors are ignored during builds
- TypeScript errors are ignored during builds
- Images are unoptimized (no Next.js image optimization)

### Tailwind CSS (`tailwind.config.ts`)

- Dark mode enabled via `class` strategy
- Custom color tokens defined via CSS custom properties
- `tailwindcss-animate` plugin for accordion animations
- shadcn/ui-compatible theme configuration

### Camera Defaults

```typescript
{
  position: [6, 3, 6],   // Initial camera position
  fov: 75,               // Field of view
  near: 0.1,             // Near clipping plane
  far: 1000,             // Far clipping plane
  minDistance: 2,         // Minimum zoom distance
  maxDistance: 50,        // Maximum zoom distance
  dampingFactor: 0.05,   // Orbit controls damping
}
```

---

## Deployment

### Vercel (Recommended)

This project is optimized for deployment on [Vercel](https://vercel.com):

1. Push your code to a GitHub repository
2. Import the repository on [vercel.com/new](https://vercel.com/new)
3. Vercel will auto-detect Next.js and configure the build
4. Deploy

### Other Platforms

The project can be deployed on any platform that supports Next.js:

```bash
# Build for production
pnpm build

# The output is in the .next/ directory
# Follow your platform's Next.js deployment guide
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Create an optimized production build |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint to check for code issues |

---

## Environment Variables

No environment variables are required for basic functionality. The project uses:

- **Vercel Analytics** — Automatically enabled in production via `@vercel/analytics`

---

## License

This project is private and not currently licensed for public use.

---

## Acknowledgments

- Built with [v0.app](https://v0.app)
- 3D rendering powered by [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) and [Three.js](https://threejs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Deployed on [Vercel](https://vercel.com)
