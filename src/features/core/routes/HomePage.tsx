import { Link } from '@tanstack/react-router';
import { RootLayout } from '@/components/layout';

/**
 * Home page component
 * Serves as the landing page for the application
 */
export function HomePage() {
  return (
    <RootLayout>
      <div className="container py-12">
        <section className="mx-auto max-w-4xl space-y-8 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            Welcome to <span className="text-primary">React Stack</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A modern React application built with a feature-based architecture,
            leveraging Vite, TypeScript, Tailwind CSS v4, shadcn/ui, TanStack Router,
            Zustand, and Zod.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/login"
              className="rounded-md bg-primary px-6 py-3 text-lg font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get Started
            </Link>
            <a
              href="https://github.com/your-username/react-stack"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-input bg-background px-6 py-3 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              View on GitHub
            </a>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="mt-24 space-y-8">
          <h2 className="text-center text-3xl font-bold">Core Features</h2>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1" />
                  <path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">TypeScript</h3>
              <p className="text-muted-foreground">
                Full type safety throughout the application for improved developer
                experience and code quality.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Feature-Based Architecture</h3>
              <p className="text-muted-foreground">
                Organized by business domain, improving scalability and maintainability
                by co-locating related logic.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Modern Stack</h3>
              <p className="text-muted-foreground">
                Built with Vite, Tailwind CSS v4, shadcn/ui, TanStack Router,
                Zustand, and Zod for a robust development experience.
              </p>
            </div>
          </div>
        </section>
      </div>
    </RootLayout>
  );
}

// Note: We'll define the route in the index.ts file
export default HomePage;
