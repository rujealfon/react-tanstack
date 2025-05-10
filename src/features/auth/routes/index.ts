/**
 * Auth routes barrel file
 * Exports all route definitions for the auth feature
 */

import { createRoute } from '@tanstack/react-router';
import type { RootRoute } from '@tanstack/react-router';
import { LoginPage } from './LoginPage';

// Function to create routes with a given root route
export const createAuthRoutes = (rootRoute: RootRoute) => {
  // Create the login route
  const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: LoginPage,
  });

  // Return all auth routes as an array
  return [loginRoute];
};
