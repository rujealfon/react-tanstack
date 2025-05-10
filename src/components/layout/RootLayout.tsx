import { Outlet } from '@tanstack/react-router';
import type { WithChildren } from '@/types';

/**
 * Root layout component for public pages
 * Includes basic structure with header and footer
 */
export function RootLayout({ children }: WithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-b-border bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2 font-semibold">
              <span className="text-xl font-bold">React Stack</span>
            </a>
          </div>
          <nav className="flex items-center gap-4">
            <a 
              href="/login" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Login
            </a>
            <a 
              href="/register" 
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Sign Up
            </a>
          </nav>
        </div>
      </header>
      
      <main className="flex-1">
        {children || <Outlet />}
      </main>
      
      <footer className="border-t border-t-border bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} React Stack. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="/privacy" 
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </a>
            <a 
              href="/terms" 
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default RootLayout;
