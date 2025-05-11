import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Header from '../components/Header'
import { useRouter } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const router = useRouter()
  const pathname = router.state.location.pathname
  
  // Define routes that should not show the header
  const routesWithoutHeader = [
    '/dashboard',
    // Add any future routes that shouldn't show the header here
  ]
  
  // Check if current path matches any of the routes that shouldn't show header
  const showHeader = !routesWithoutHeader.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )
  
  return (
    <>
      {showHeader && <Header />}
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}
