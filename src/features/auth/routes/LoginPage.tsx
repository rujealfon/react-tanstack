import { RootLayout } from '@/components/layout';
import { LoginForm } from '../components/LoginForm';

/**
 * Login page component
 */
export const LoginPage = () => (
  <RootLayout>
    <div className="container flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center py-12">
      <LoginForm />
    </div>
  </RootLayout>
);

export default LoginPage;
