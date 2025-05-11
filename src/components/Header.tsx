import { Link } from '@tanstack/react-router'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { ROUTES } from '@/config/constants'

export default function Header() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="py-4 px-6 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">Modern React App</Link>
        </div>
        
        <nav className="flex items-center space-x-6">
          <Link 
            to="/" 
            activeProps={{ className: 'text-blue-600 font-medium' }}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link 
                to={ROUTES.DASHBOARD} 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Dashboard
              </Link>
              <button 
                onClick={() => logout()} 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to={ROUTES.LOGIN} 
                activeProps={{ className: 'text-blue-600 font-medium' }}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to={ROUTES.REGISTER} 
                activeProps={{ className: 'text-blue-600 font-medium' }}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
