import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { useAuthStore } from './features/auth/store/authStore';

// Get initial auth state
const authState = useAuthStore.getState();

// Create a new router instance
export const router = createRouter({
  routeTree,
  // Provide auth context to routes
  context: {
    auth: {
      isAuthenticated: authState.isAuthenticated,
      user: authState.user,
    },
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
