// Dashboard page component

/**
 * Dashboard page component
 */
export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Quick Stats</h2>
          <p>Welcome to your dashboard!</p>
        </div>
        <div className="bg-card p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Recent Activity</h2>
          <p>No recent activity to display.</p>
        </div>
        <div className="bg-card p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Notifications</h2>
          <p>You have no new notifications.</p>
        </div>
      </div>
    </div>
  );
}
