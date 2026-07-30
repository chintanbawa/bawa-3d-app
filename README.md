# Bawa 3D App

An interactive 3D car color configurator built with React, Vite, and Three.js. Load a GLB car model into the scene, orbit around it, and re-color individual parts (exterior, rims, interior, grills, and more) in real time using preset color schemes or a fully custom per-part color picker.

## Features

- **3D scene** rendered with [react-three-fiber](https://github.com/pmndrs/react-three-fiber) and [drei](https://github.com/pmndrs/drei), including environment lighting (`apartment` preset) and orbit controls.
- **GLTF model loading** from `public/models/car.glb`, with a wireframe placeholder shown while the model loads.
- **Preset color themes** (black, red, green, blue) that recolor the whole car — exterior, trim, wheels, and interior — in one click.
- **Custom color panel** for selecting a specific car part (exterior, grills, rims, engine pipes, fan, interior, gear lever, etc.) and applying any swatch color to just that part.
- **State management** via [Zustand](https://github.com/pmndrs/zustand), keeping the currently selected color scheme and per-part color overrides in a single store.

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Three.js](https://threejs.org/) via `@react-three/fiber` and `@react-three/drei`
- [Zustand](https://github.com/pmndrs/zustand) for state management
- [ESLint](https://eslint.org/) for linting

## Getting Started

### Prerequisites

- Node.js (a recent LTS version)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

This starts the Vite dev server with hot module reloading. Open the printed local URL in your browser.

### Build

```bash
npm run build
```

Builds the app for production into the `dist/` folder.

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```text
src/
├── App.jsx                     # Root component: sets up the 3D canvas and color panel
├── main.jsx                    # App entry point
├── store.js                    # Zustand store for car color state
├── compnents/
│   ├── Model.jsx                # Loads the car GLTF model and applies per-part colors
│   ├── ColorPanel.jsx           # Preset color swatches + toggles the custom panel
│   ├── CustomColorPanel.jsx     # Per-part color picker UI
│   └── ColorDot.jsx             # Reusable circular color swatch button
└── utils/
    ├── carColors.js              # Preset color scheme definitions
    ├── colorPanelParts.js        # Car parts exposed in the custom color panel
    ├── meshToPart.js             # Maps GLTF mesh names to logical car part names
    └── slugToLabel.js            # Formats part slugs into readable labels

public/
└── models/
    └── car.glb                   # 3D car model used in the scene
```

## How It Works

1. `Model.jsx` loads `car.glb` and traverses its meshes, mapping each mesh name to a logical part name (e.g. `mesh1643766101` → `exterior`) via `meshToPart.js`.
2. Each mesh's material is cloned so parts can be recolored independently without mutating shared materials.
3. `ColorPanel.jsx` lets the user pick a preset color scheme (from `carColors.js`), which updates every part at once via the Zustand store.
4. Selecting the "custom" swatch reveals `CustomColorPanel.jsx`, where the user picks a specific part and applies any color to it individually, persisted in the store's `partsColor` map.
