import { createRoute } from '@tanstack/react-router';
import { Route as DashboardRoute } from './route';
import { useAuth } from '@/features/auth/hooks/useAuth';

export const Route = createRoute({
  getParentRoute: () => DashboardRoute,
  path: '/',
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Welcome</h2>
          <p className="text-gray-600">
            Hello, {user ? `${user.firstName} ${user.lastName}` : 'User'}! Welcome to your dashboard.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Quick Stats</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Users:</span>
              <span className="font-medium">120</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Projects:</span>
              <span className="font-medium">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pending Tasks:</span>
              <span className="font-medium">12</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="text-gray-600">New user registered</span>
              <span className="text-sm text-gray-500">2h ago</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Project updated</span>
              <span className="text-sm text-gray-500">3h ago</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Task completed</span>
              <span className="text-sm text-gray-500">5h ago</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
