# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Keycloakify v11 starter project for creating custom Keycloak authentication themes. It uses React with TypeScript, Vite as the build tool, and includes shadcn/ui components with Tailwind CSS for styling.

## Essential Commands

### Development
- `npm run dev` - Start Vite development server
- `npm run storybook` - Start Storybook development server on port 6006

### Building
- `npm run build` - Build the React application (TypeScript compilation + Vite build)
- `npm run build-keycloak-theme` - Build both the React app and Keycloak theme JAR files

### Code Quality
- `npm run format` - Format code with Prettier

### Keycloakify Commands
- `npx keycloakify initialize-account-theme` - Initialize account theme functionality
- `npx keycloakify initialize-email-theme` - Initialize email theme functionality

## Architecture

### Core Structure
- **src/login/**: Keycloak-specific authentication pages and components
  - `Template.tsx`: Main layout wrapper using shadcn/ui Card, Alert components
  - `pages/`: Individual auth pages (Login, Register, Error, etc.)
  - `KcContext.ts`: TypeScript context extensions for Keycloak
  - `i18n.ts`: Internationalization setup
  - `messages/`: Translation files (English, Chinese)

- **src/components/ui/**: shadcn/ui component library with Tailwind CSS styling
- **src/lib/**: Utility functions (cn function for class merging)

### Key Technologies
- **Keycloakify**: Generates Keycloak themes from React components
- **shadcn/ui**: Modern React component library built on Radix UI
- **Tailwind CSS**: Utility-first CSS framework
- **React Hook Form**: Form handling with Zod validation
- **Storybook**: Component development and testing

### Build Process
The project uses a two-step build process:
1. Vite builds the React application (`npm run build`)
2. Keycloakify generates theme JAR files for different Keycloak versions

Maven is required for the Keycloak theme generation (Maven >= 3.1.1, Java >= 7).

### Theme Configuration
- Vite config includes Keycloakify plugin with `accountThemeImplementation: "none"`
- Theme pages are Storybook-enabled with `.stories.tsx` files
- Language switching has been disabled (see commented code in Template.tsx:40)

### Component Patterns
- All Keycloak pages extend the base Template component
- Uses modern React patterns with hooks
- Consistent error handling with Alert components
- Form validation with React Hook Form + Zod schemas

## Development Notes

### Testing Changes
When modifying authentication pages, test with:
1. `npm run storybook` to see individual components
2. `npm run build-keycloak-theme` to generate theme files
3. Deploy JAR files to Keycloak for full integration testing

### Styling Approach
- Uses Tailwind CSS with shadcn/ui components
- Custom theme styles in `src/login/theme.css`
- Responsive design with mobile-first approach
- Modern UI with cards, alerts, and proper form controls

### Internationalization
- Supports multiple languages with properties files
- Current languages: English (default), Chinese (Simplified)
- Language switching UI is currently disabled