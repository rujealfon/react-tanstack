import { Outlet, createRootRoute, createRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import Header from './components/Header';

// Import route creation functions
import { createCoreRoutes } from './features/core/routes';
import { createAuthRoutes } from './features/auth/routes';
import { createUsersRoutes } from './features/users/routes';
import { createDashboardRoutes } from './features/dashboard/routes';

/**
 * Root route definition
 * This is the base route that all other routes will be children of
 */
export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

// Create the route tree by adding all feature routes to the root route
const routeTree = rootRoute.addChildren([
  ...createCoreRoutes(rootRoute),
  ...createAuthRoutes(rootRoute),
  ...createUsersRoutes(rootRoute),
  ...createDashboardRoutes(rootRoute),
]);

// Create and export the router instance
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;
