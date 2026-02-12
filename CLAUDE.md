# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **14-Day Energy Reset Wellness Guide** - a React-based single-page application built for AI Studio. It's a wellness tracking app focused on helping users reset their energy levels through daily habit tracking, meal planning, and progress visualization. All data is stored locally in the browser via localStorage.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

### Core Components

**App.tsx** - Main application shell with 4 primary views:
- `guide` - Welcome letter and protocol overview
- `tracker` - Daily check-in form with progress tracking
- `meals` - Meal plans (breakfast, lunch, dinner)
- `shopping` - Shopping list by category

**DayTracker.tsx** - Interactive 14-day tracker component:
- Day selector (1-14) with completion state visualization
- 4 metrics tracked via sliders: sleep quality, morning energy, afternoon energy, digestion
- 7 protocol habits tracked via checkboxes (defined in `constants.tsx`)
- Notes field for daily reflections
- Saves to localStorage under key `energyReset_v2`

### Data Flow

**State Management:**
- All tracker data stored in `TrackerState` (Record<number, DayData>)
- Persisted to localStorage on every save
- Loaded on mount from localStorage

**Data Types** (types.ts):
- `DayData` - Single day's tracking data (metrics + habits + notes + completed flag)
- `TrackerState` - Map of day number to DayData
- `MealCategory` / `MealOption` - Meal planning structure
- `ShoppingCategory` - Shopping list structure

**Constants** (constants.tsx):
- `PROTOCOL_HABITS` - 7 daily foundational habits
- `MEAL_PLANS` - 3 meal categories with 4 options each
- `SHOPPING_LIST` - 3 shopping categories (Proteins, Produce, Fats & Pantry)

### Visualization

- Uses **recharts** for energy trend bar chart (Day 1-14)
- Stats dashboard calculates averages: sleep, energy (AM+PM avg), digestion
- Completed days shown in accent color (#c17a5c), incomplete in gray

## Tech Stack

- **React 19** with TypeScript
- **Vite** build tool
- **Recharts** for data visualization
- **Tailwind CSS** (via inline classes)
- Dev server runs on port 3000 with host 0.0.0.0

## Path Aliases

- `@/` maps to project root (configured in vite.config.ts and tsconfig.json)
- Import example: `import { DayTracker } from '@/components/DayTracker'`

## Design System

**Color Palette:**
- Primary accent: `#c17a5c` (coral/terracotta)
- Secondary accent: `#9fa894` (olive green)
- Base: stone palette (50-900)
- Background: `#fdfcfb` (warm off-white)

**Typography:**
- Heavy use of uppercase tracking-widest labels
- Serif italics for emphasis
- Font weights: medium, bold, black

## Key Features

1. **Daily Check-ins**: Track 4 health metrics + 7 habits per day
2. **Progress Visualization**: Bar chart showing energy trends over 14 days
3. **Meal Planning**: Mix-and-match meal options with protein focus
4. **Shopping Lists**: Categorized with interactive checkboxes
5. **Local Persistence**: All data saved to localStorage
6. **Responsive Design**: Mobile-first with sticky navigation

## Important Notes

- This app was built for AI Studio platform (see metadata.json)
- No testing framework currently configured
- No linting configuration present
- App is client-side only, no backend server required
- All data is stored locally in the browser - no database or external persistence
