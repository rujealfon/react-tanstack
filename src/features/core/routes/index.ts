/**
 * Core routes barrel file
 * Exports all route definitions for the core feature
 */

import { createRoute } from '@tanstack/react-router';
import type { RootRoute } from '@tanstack/react-router';
import HomePage from './HomePage';

// Function to create routes with a given root route
export const createCoreRoutes = (rootRoute: RootRoute) => {
  // Create the home route
  const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage,
  });

  // Return all core routes as an array
  return [homeRoute];
};
