import { Outlet, createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';

// This layout is used for public pages (home, login, register, etc.)
export const Route = createRoute({
  getParentRoute: () => RootRoute,
  id: 'public-layout',
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
}
