/**
 * Users routes barrel file
 * Exports all route definitions for the users feature
 */

import { createRoute } from '@tanstack/react-router';
import type { RootRoute } from '@tanstack/react-router';
import { UsersPage } from './UsersPage';

// Function to create routes with a given root route
export const createUsersRoutes = (rootRoute: RootRoute) => {
  // Create the users route
  const usersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/users',
    component: UsersPage,
  });

  // Return all users routes as an array
  return [usersRoute];
};
