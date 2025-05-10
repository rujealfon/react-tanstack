import { Route, RootRoute } from '@tanstack/react-router';
import { DashboardLayout } from '../../../components/layout';
import DashboardPage from './DashboardPage';

/**
 * Creates and returns the dashboard routes
 * @param rootRoute - The root route to attach these routes to
 * @returns Array of dashboard routes
 */
export function createDashboardRoutes(rootRoute: RootRoute) {
  // Create a layout route for the dashboard
  const dashboardLayoutRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'dashboard',
    component: DashboardLayout,
  });

  // Create the dashboard index route
  const dashboardIndexRoute = new Route({
    getParentRoute: () => dashboardLayoutRoute,
    path: '/',
    component: DashboardPage,
  });

  return [dashboardLayoutRoute, dashboardIndexRoute];
}
