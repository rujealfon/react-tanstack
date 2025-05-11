# Route Structure

## Current Routes
- `/` - Root route (should redirect to /home)
- `/home` - Home page
- `/login` - Login page
- `/register` - Register page
- `/dashboard` - Dashboard layout
- `/dashboard/` - Dashboard index page
- `/dashboard/users` - Users page

## Conflicts
- The root path `/` is being used by multiple routes
- Need to ensure each route has a unique path

## Fix Strategy
1. Root route (`__root.tsx`) - Keep as is, with redirect from `/` to `/home`
2. Layout route (`_layout.tsx`) - Keep as is
3. Home route (`index.tsx`) - Path: `/home`
4. Dashboard layout (`(dashboard)/_layout.tsx`) - Path: `dashboard`
5. Dashboard index (`(dashboard)/index.tsx`) - Path: `''` (empty string, will inherit from parent)
6. Dashboard users (`(dashboard)/users/index.tsx`) - Path: `users`
