import { useAuth } from '@/features/auth/hooks/useAuth';
import { ROUTES } from '@/config/constants';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className = '' }: SidebarProps) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={`w-64 bg-white shadow-md h-full ${className}`}>
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <p className="text-sm text-gray-600">Welcome, {user?.name || 'User'}</p>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to={ROUTES.DASHBOARD}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              activeProps={{ className: 'bg-blue-50 text-blue-700' }}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.USERS}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              activeProps={{ className: 'bg-blue-50 text-blue-700' }}
            >
              Users
            </Link>
          </li>
          <li>
            <Button 
              variant="ghost" 
              className="w-full justify-start px-4 py-2 h-auto font-normal"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
