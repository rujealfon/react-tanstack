import { Outlet } from '@tanstack/react-router';
import { Sidebar } from '@/components/shared/Sidebar';
import type { WithChildren } from '@/types';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';

interface DashboardLayoutProps extends WithChildren {
  className?: string;
}

/**
 * Dashboard layout component for authenticated areas
 * Includes sidebar and main content area
 */
export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      
      <div 
        className={cn(
          "flex flex-1 flex-col transition-all duration-300 ease-in-out",
          sidebarOpen ? "md:ml-64" : ""
        )}
      >
        {/* Dashboard header */}
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-b-border bg-background px-4 md:px-6">
          <h1 className="text-lg font-medium">Dashboard</h1>
          
          <div className="ml-auto flex items-center gap-4">
            <button className="rounded-full bg-accent p-2 text-accent-foreground">
              <span className="sr-only">Notifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </button>
          </div>
        </header>
        
        {/* Main content */}
        <main className={cn("flex-1 p-4 md:p-6", className)}>
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
