import { createRoute, Outlet } from '@tanstack/react-router';
import { Route as RootRoute } from '../__root';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { redirect } from '@tanstack/react-router';
import { ROUTES } from '@/config/constants';
import { Link } from '@tanstack/react-router';

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: 'dashboard',
  beforeLoad: ({ context }) => {
    // Check the auth state from the context
    // Using type assertion to fix TypeScript error
    const ctx = context as { auth?: { isAuthenticated?: boolean } };
    const isAuthenticated = !!ctx?.auth?.isAuthenticated;
    
    if (!isAuthenticated) {
      throw redirect({
        to: ROUTES.LOGIN,
        search: {
          redirect: window.location.pathname,
        },
      });
    }
  },
  component: DashboardLayout,
});

function DashboardLayout() {
  const { logout, user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md fixed inset-y-0 left-0 overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          {user && (
            <p className="text-sm text-gray-600 mt-1">
              Welcome, {user.firstName} {user.lastName}
            </p>
          )}
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/dashboard" 
                activeProps={{ className: 'bg-blue-50 text-blue-600' }}
                className="block p-2 rounded hover:bg-gray-100"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/users" 
                activeProps={{ className: 'bg-blue-50 text-blue-600' }}
                className="block p-2 rounded hover:bg-gray-100"
              >
                Users
              </Link>
            </li>
            <li>
              <button 
                onClick={() => logout()} 
                className="block w-full text-left p-2 rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="ml-64 flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}
