import { Link } from '@tanstack/react-router';
import { cn } from '../../lib/utils';

interface SidebarLinkProps {
  to: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  isActive?: boolean;
}

/**
 * Component for individual links in the Sidebar
 */
export function SidebarLink({ to, icon, children, isActive = false }: SidebarLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
          : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
      )}
    >
      {icon && <span className="h-4 w-4">{icon}</span>}
      <span>{children}</span>
    </Link>
  );
}

export default SidebarLink;
