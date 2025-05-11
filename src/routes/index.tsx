import { createRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { Route as PublicLayoutRoute } from './_layout';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/config/constants';
import { useAuth } from '@/features/auth/hooks/useAuth';

export const Route = createRoute({
  getParentRoute: () => PublicLayoutRoute,
  path: '/',
  component: HomePage,
});

function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Modern React Application</h1>
        <p className="text-xl text-gray-600 mb-8">
          Built with React 18, TypeScript, TanStack Router, Zustand, and Tailwind CSS
        </p>
        
        <div className="flex gap-4 justify-center">
          {isAuthenticated ? (
            <Button asChild>
              <Link to={ROUTES.DASHBOARD}>Go to Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild>
                <Link to={ROUTES.LOGIN}>Sign In</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to={ROUTES.REGISTER}>Create Account</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Type-Safe Routing</h2>
          <p className="text-gray-600 mb-4">
            TanStack Router provides fully type-safe routing with file-based route organization.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">State Management</h2>
          <p className="text-gray-600 mb-4">
            Zustand offers a simple yet powerful state management solution with minimal boilerplate.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Beautiful UI</h2>
          <p className="text-gray-600 mb-4">
            Tailwind CSS and shadcn/ui provide a modern, responsive design system.
          </p>
        </div>
      </div>
    </div>
  );
}
