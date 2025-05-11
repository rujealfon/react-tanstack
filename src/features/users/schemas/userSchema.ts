import { z } from 'zod';

// User schema
export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  role: z.enum(['user', 'admin', 'editor']),
  status: z.enum(['active', 'inactive']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type User = z.infer<typeof userSchema>;

// User list schema for API responses
export const userListSchema = z.array(userSchema);

export type UserList = z.infer<typeof userListSchema>;

// Create user request schema
export const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['user', 'admin', 'editor']),
  status: z.enum(['active', 'inactive']).default('active'),
});

export type CreateUserRequest = z.infer<typeof createUserSchema>;

// Update user request schema
export const updateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Please enter a valid email').optional(),
  role: z.enum(['user', 'admin', 'editor']).optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

export type UpdateUserRequest = z.infer<typeof updateUserSchema>;
