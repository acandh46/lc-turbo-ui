# Project Overview

This is a Next.js web application that serves as a dashboard for an AI agent or chat engine. It provides a user interface for managing and interacting with the AI.

## Main Technologies

*   **Framework:** Next.js (with Turbopack)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS with `tailwindcss-animate` and `@tailwindcss/typography`.
*   **UI Components:** Radix UI, shadcn/ui
*   **State Management:** Zustand
*   **Forms:** React Hook Form with Zod for validation
*   **API Communication:** Axios
*   **Real-time Communication:** `socket.io-client`

## Architecture

*   **Routing:** Next.js App Router (`src/app`)
*   **Authentication:** Middleware-based authentication for protected routes.
*   **UI:** Component-based architecture (`src/components`).
*   **State Management:** Zustand for centralized state management.
*   **Imports:** Path aliases (`@/*`) for simplified imports.

# Building and Running

*   **Development:** `npm run dev`
*   **Build:** `npm run build`
*   **Start:** `npm run start`
*   **Lint:** `npm run lint`

# Development Conventions

*   **Styling:** Utilize Tailwind CSS for styling, adhering to the custom theme in `tailwind.config.ts`.
*   **Components:** Build UI with a mix of custom components and components from Radix UI and shadcn/ui.
*   **State Management:** Use Zustand for state management, creating separate stores for distinct features.
*   **API:** Use Axios for all API requests.
*   **Real-time:** Implement real-time features using `socket.io-client`.
*   **Linting:** Follow the rules defined in the ESLint configuration.
