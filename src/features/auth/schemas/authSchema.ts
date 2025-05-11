import { z } from 'zod';

// User schema for DummyJSON API
export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  image: z.string().url().optional(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

// Login request schema for DummyJSON API
export const loginRequestSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  expiresInMins: z.number().optional(),
  rememberMe: z.boolean().optional(), // Not used by API but useful for UI
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;

// Login response schema for DummyJSON API
export const loginResponseSchema = userSchema;

export type LoginResponse = z.infer<typeof loginResponseSchema>;

// Register request schema
export const registerRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type RegisterRequest = z.infer<typeof registerRequestSchema>;

// Register response schema for DummyJSON API (same as login response)
export const registerResponseSchema = userSchema;

export type RegisterResponse = z.infer<typeof registerResponseSchema>;
