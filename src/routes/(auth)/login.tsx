import { createRoute } from '@tanstack/react-router';
import { Route as PublicLayoutRoute } from '../_layout';
import { LoginFormContent } from '@/features/auth/components/LoginFormContent';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ROUTES } from '@/config/constants';

export const Route = createRoute({
  getParentRoute: () => PublicLayoutRoute,
  path: '/login',
  component: LoginPage,
});

function LoginPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: ROUTES.DASHBOARD });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
      <LoginFormContent />
    </div>
  );
}
