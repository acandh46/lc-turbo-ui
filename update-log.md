# Update Log - 2025-10-14

This log details the recent updates and improvements made to the Agent Dashboard application.

## Authentication Overhaul & UI Redesign

### 🚀 Code Refactoring

1.  **Collapsible `PageWrapper` Sub-menu**:
    -   Revised the `PageWrapper` component again based on new feedback. It is now headerless, and the main content area contains a toggle button to show or hide the left-hand sub-menu.
    -   This provides maximum screen real estate for content while keeping sub-navigation easily accessible.
    -   The `settings` layout was updated to remove its own header, fully adopting the new wrapper design.

1.  **Headless & Loadable `PageWrapper`**:
    -   Further refined the `PageWrapper` to be a "headless" component, removing the internal header to give parent pages full control over their titles and descriptions.
    -   Added a customizable loading state with `isLoading` and `loadingComponent` props, allowing pages to display a spinner (or a custom element) while fetching data.
    -   The `settings` layout was updated to adopt this new headless pattern.

1.  **Enhanced `PageWrapper` with Smooth Transitions & Customization**:
    -   Significantly upgraded the `PageWrapper` component with a smooth, animated sliding transition for the collapsible sub-menu.
    -   Added new customization props to control the page `title`, `description`, and to conditionally hide the sub-menu (`hideSubMenu`) or its toggle button (`hideToggle`).
    -   The default behavior is to show all elements, making the component highly flexible for different page layouts.

1.  **`PageWrapper` Component Overhaul**:
    -   Completely refactored the `PageWrapper` component based on user feedback to provide a responsive, two-column layout.
    -   The new wrapper (`src/components/layout/PageWrapper.tsx`) now accepts `navItems` to generate a sub-menu on the left, with the main content on the right.
    -   Created a new `/settings` section with a shared layout to demonstrate the new wrapper's functionality for pages requiring sub-navigation.

1.  **Sidebar Popover Componentization**:
    -   Refactored the `Sidebar` component to improve modularity and readability.
    -   The "Switch Agent" and "User Menu" popover functionalities were extracted into their own dedicated components: `SwitchAgent.tsx` and `UserMenu.tsx`.
    -   This change significantly cleans up the main sidebar component, making the code easier to maintain.

1.  **Layout Reversion to Sidebar-Only**:
    -   Based on user feedback, the main dashboard layout has been reverted from the two-tiered `Header` + `Sidebar` design back to the original, simpler `Sidebar`-only layout.
    -   The `Header.tsx` component has been deleted, and its functionalities (like `ThemeToggle` and user profile) have been moved back into the `Sidebar.tsx` component.
    -   The main layout file `(main)/layout.tsx` was updated to reflect this simpler structure.

1.  **Dashboard Componentization**:
    -   Refactored the monolithic dashboard page into smaller, reusable components located in `src/components/dashboard`.
    -   The new components are `ConversationList.tsx`, `ChatPanel.tsx`, and `ContactDetails.tsx`.
    -   Moved the primary chat interface from the main dashboard page to a new, dedicated route at `/dashboard/conversations` to improve modularity and code organization.
    -   The main `/dashboard` page now serves as a simple welcome screen.

### 🐛 Bug Fixes

1.  **`PageWrapper` Sub-menu Toggle**:
    -   Fixed a bug where the toggle button in the `PageWrapper` component failed to hide the sub-menu on larger screens.
    -   The issue was caused by incorrect responsive CSS class logic (`hidden lg:block`).
    -   This has been corrected to ensure the hide/show functionality works reliably across all screen sizes.

1.  **Sidebar Navigation Links**:
    -   Corrected the navigation links in the `Sidebar` component to match the actual file-based routing structure under the `(main)` layout group.
    -   Paths were updated from `/dashboard/conversations` to `/conversations`, ensuring navigation works as intended.

1.  **Header/Sidebar Layout Overlap**:
    -   Fixed a critical layout bug where the main header and the sidebar would overlap.
    -   Reduced the header height to a more standard `56px` (`h-14`).
    -   Corrected the flexbox implementation in the main layout and sidebar components to ensure the sidebar now correctly fills the remaining vertical space below the header without overlapping.

1.  **Responsive Dashboard Layout**:
    -   Fixed a major layout issue where the dashboard's three-panel view was not responsive and would break on smaller screens.
    -   Refactored the page at `src/app/(main)/dashboard/page.tsx` from a rigid grid to a flexible, mobile-first layout using responsive Tailwind CSS classes (`md:flex`, `xl:grid`, etc.).
    -   Added client-side state to manage the visibility of panels on mobile, ensuring a smooth user experience across all device sizes.

1.  **Login Success Error**:
    -   Fixed a critical bug where a successful login would result in a crash (`Cannot read properties of undefined (reading 'access_token')`).
    -   The issue was caused by an incorrect assumption about the API response structure.
    -   The `onSubmit` function in `src/app/(auth)/auth/login/page.tsx` has been corrected to pass the appropriate data object to the `useAuthStore`, ensuring the session is stored correctly.

### ✨ New Features & Enhancements

1.  **Reusable Page Wrapper Component**:
    -   Created a new reusable `PageWrapper` component (`src/components/layout/PageWrapper.tsx`) to ensure a consistent UI for standard pages.
    -   The component includes a standardized header with a `title`, `description`, and an optional `actionButton`, mirroring the design seen in professional chat applications.
    -   A new `/contacts` page was created to demonstrate its usage.

1.  **Global Socket.IO and Chat Providers**:
    -   Implemented a global real-time communication layer using Socket.IO.
    -   Created a `SocketProvider` (`src/components/providers/SocketProvider.tsx`) to manage the core socket connection and expose the connection status.
    -   Added a `ChatProvider` (`src/components/providers/ChatProvider.tsx`) to handle chat-specific events.
    -   Integrated a visual indicator in the `UserMenu` component: a green dot appears on the user's avatar when the socket connection is active.

1.  **Interactive Sidebar Popovers**:
    -   Enhanced the sidebar by implementing popover menus for the "Switch Agent" button and the user avatar.
    -   Clicking the "Switch Agent" button now opens a popover with a list of different user views (e.g., Agent, Supervisor).
    -   Clicking the user avatar now opens a popover displaying the user's name, email, and provides access to profile settings and a logout button.
    -   This was achieved using the `Popover` component from `shadcn/ui`, improving UI interactivity.

1.  **Role-Based "Switch Agent" Button**:
    -   Added a "Switch Agent" button to the top of the `Sidebar` component.
    -   This button is conditionally rendered and only appears for users whose role is not 'agent', providing a clear example of a role-based UI feature.
    -   The user's role is accessed via the `useAuth` hook, which gets data from the `AuthProvider`.

1.  **Theme Toggle (Dark/Light Mode)**:
    -   Implemented a theme-switching capability using the `next-themes` library.
    -   Added a `ThemeProvider` (`src/components/providers/ThemeProvider.tsx`) to the root layout, configured with "light" as the default theme.
    -   Created a `ThemeToggle` component (`src/components/CustomUi/ThemeToggle.tsx`) allowing users to switch between light, dark, and system themes.
    -   Updated the Tailwind CSS configuration to support class-based dark mode and integrated the toggle button into the dashboard sidebar.

1.  **Centralized Modal Provider**:
    -   Implemented a global modal provider system for handling modals throughout the application.
    -   Created a `useModalStore` (`src/store/useModalStore.ts`) with Zustand to manage modal state (type, data, isOpen).
    -   Built a reusable `Modal` component (`src/components/CustomUi/Modal.tsx`) using Radix UI.
    -   Added a `ModalProvider` (`src/components/providers/ModalProvider.tsx`) to the root layout, which dynamically renders modals based on the store's state.

1.  **Dashboard UI & Auth Provider**:
    -   Created a new, professional dashboard layout inspired by LiveChat.com at `src/app/dashboard/page.tsx`. The UI features a three-panel design for conversations, live chat, and contact details.
    -   Implemented an `AuthProvider` at `src/components/providers/AuthProvider.tsx` to provide user data via React Context, enabling future role-based UI features.
    -   Added a dedicated dashboard layout (`src/app/dashboard/layout.tsx`) that includes a new sidebar navigation component (`src/components/layout/Sidebar.tsx`).

1.  **Route Protection Middleware**:
    -   Created a new middleware at `src/middleware.ts` to protect application routes.
    -   The middleware ensures that only authenticated users can access routes under `/dashboard`.
    -   It redirects logged-in users away from authentication pages (e.g., `/auth/login`) to the dashboard.
    -   The `useAuthStore` was updated to set and remove an `access_token` cookie to make the session accessible to the server-side middleware.

1.  **Automatic Bearer Token**:
    -   Implemented an Axios request interceptor in `src/lib/api.ts`.
    -   This interceptor automatically attaches the `accessToken` from the `useAuthStore` to the `Authorization` header of all outgoing API requests.
    -   The response interceptor was also updated to use the store's `logout` function on a 401 error.

1.  **Custom Toaster Component**:
    -   A new custom toaster component has been created at `src/components/CustomUi/CustomToaster.tsx`.
    -   It provides styled variants for `default`, `success`, and `error` notifications, ensuring a consistent look and feel across the application.
    -   The main layout file (`src/app/layout.tsx`) has been updated to use this new toaster globally.

1.  **Professional Login Page Redesign**:
    -   The login page at `src/app/(auth)/auth/login/page.tsx` has been completely redesigned with a modern, professional aesthetic.
    -   It now features a dark theme with a "glassmorphism" style card for the form, improving the overall user experience.
    -   Branding and layout have been updated for better visual hierarchy.

2.  **Zustand Auth Store**:
    -   A new global state management solution for authentication has been implemented using Zustand.
    -   The store is located at `src/store/useAuthStore.ts` and manages `accessToken`, `refreshToken`, and the `user` object.
    -   Session data is persisted in `localStorage` to keep users logged in across browser sessions.

3.  **API-Driven Authentication Flow**:
    -   The auth store is now integrated with the backend API.
    -   **Login**: Upon successful login, user data and tokens are stored in the Zustand store.
    -   **Logout**: The `logout` action now sends a `POST` request to the `/auth/logout` endpoint to properly invalidate the session on the server.
    -   **Token Refresh**: A `refreshAccessToken` function has been added to handle token expiration by calling the `/api/refresh` endpoint.

### 📂 New Files Created

-   `src/store/useAuthStore.ts`: The central store for managing authentication state.
-   `src/types/user.type.ts`: Contains the TypeScript type definition for the `User` object.
-   `update-log.md`: This file, to track project updates.

### 🔄 Files Modified

-   `src/app/(auth)/auth/login/page.tsx`: Overhauled the UI and integrated the new auth store for handling login logic.
