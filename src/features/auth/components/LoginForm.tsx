import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { z } from 'zod';
import { loginSchema } from '../schemas/loginSchema';
import type { LoginFormValues } from '../schemas/loginSchema';
import useAuth from '../hooks/useAuth';

/**
 * Login form component
 * Handles user authentication with email and password
 */
export function LoginForm() {
  const { loginWithRedirect, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState<LoginFormValues>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof LoginFormValues, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    
    // Clear error when field is edited
    if (formErrors[name as keyof LoginFormValues]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
    
    // Clear API error when form is edited
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Validate form data
      loginSchema.parse(formData);
      
      // Clear any previous errors
      setFormErrors({});
      
      // Submit form
      await loginWithRedirect(formData);
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        const errors: Partial<Record<keyof LoginFormValues, string>> = {};
        
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            const fieldName = err.path[0] as keyof LoginFormValues;
            errors[fieldName] = err.message;
          }
        });
        
        setFormErrors(errors);
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>
      
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            placeholder="name@example.com"
            required
          />
          {formErrors.email && (
            <p className="text-xs text-destructive">{formErrors.email}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none"
            >
              Password
            </label>
            <Link
              to="/"
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            required
          />
          {formErrors.password && (
            <p className="text-xs text-destructive">{formErrors.password}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          <label
            htmlFor="rememberMe"
            className="text-sm font-medium leading-none"
          >
            Remember me
          </label>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div className="text-center text-sm">
        Don't have an account?{' '}
        <Link to="/" className="text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
