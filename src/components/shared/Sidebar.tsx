import { Link } from '@tanstack/react-router';
import { Home, Users, ShoppingCart, Settings, Menu, X } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

/**
 * Sidebar component for the dashboard layout
 * Includes navigation links and toggle functionality
 */
export function Sidebar({ className }: SidebarProps) {
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-r-border bg-background transition-transform duration-300 ease-in-out md:static md:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className
        )}
      >
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between border-b border-b-border px-4">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold"
          >
            <span className="text-xl font-bold">React Stack</span>
          </Link>
          <button
            onClick={toggleSidebar}
            className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
          >
            <X size={18} />
            <span className="sr-only">Close sidebar</span>
          </button>
        </div>
        
        {/* Sidebar content */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            <SidebarLink to="/" icon={<Home size={18} />} label="Dashboard" />
            <SidebarLink to="/users" icon={<Users size={18} />} label="Users" />
            <SidebarLink to="/products" icon={<ShoppingCart size={18} />} label="Products" />
            <SidebarLink to="/settings" icon={<Settings size={18} />} label="Settings" />
          </ul>
        </nav>
        
        {/* Sidebar footer */}
        <div className="border-t border-t-border p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/10" />
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 right-4 z-40 rounded-full bg-primary p-3 text-primary-foreground shadow-lg md:hidden"
      >
        <Menu size={24} />
        <span className="sr-only">Toggle sidebar</span>
      </button>
    </>
  );
}

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

function SidebarLink({ to, icon, label }: SidebarLinkProps) {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        activeProps={{ className: "bg-accent text-accent-foreground" }}
      >
        {icon}
        <span>{label}</span>
      </Link>
    </li>
  );
}

export default Sidebar;
