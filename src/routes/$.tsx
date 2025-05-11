import { createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './__root';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { ROUTES } from '@/config/constants';

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '*',
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button asChild>
          <Link to={ROUTES.HOME}>Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
