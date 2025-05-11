import { ofetch } from 'ofetch';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from '../schemas/authSchema';

// DummyJSON API base URL
const DUMMY_JSON_API = 'https://dummyjson.com';

/**
 * Login a user with username and password using DummyJSON API
 * @see https://dummyjson.com/docs/auth#auth-login
 */
export async function login(data: LoginRequest): Promise<LoginResponse> {
  return await ofetch(`${DUMMY_JSON_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      username: data.username,
      password: data.password,
      expiresInMins: data.expiresInMins || 60,
    },
  });
}

/**
 * Register a new user using DummyJSON API
 * Note: DummyJSON doesn't actually support registration, this is a mock
 */
export async function register(_data: RegisterRequest): Promise<RegisterResponse> {
  // Since DummyJSON doesn't have a real registration endpoint, we'll mock it
  // In a real app, you would use the actual API endpoint
  return await ofetch(`${DUMMY_JSON_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      // Use default credentials since we can't actually register
      username: 'kminchelle',
      password: '0lelplR',
    },
  });
}

/**
 * Get the current user profile using DummyJSON API
 * @see https://dummyjson.com/docs/auth#auth-me
 */
export async function getCurrentUser(token: string): Promise<User> {
  return await ofetch(`${DUMMY_JSON_API}/auth/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}

/**
 * Logout the current user
 * Note: DummyJSON doesn't have a logout endpoint, this is a mock
 */
export async function logout(): Promise<void> {
  // Since DummyJSON doesn't have a real logout endpoint, we'll just return
  // In a real app, you would use the actual API endpoint
  return Promise.resolve();
}
