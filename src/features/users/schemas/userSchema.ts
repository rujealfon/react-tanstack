import { z } from 'zod';

/**
 * Zod schema for user data validation
 */
export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  role: z.enum(['admin', 'user', 'guest'], {
    errorMap: () => ({ message: 'Invalid role' }),
  }),
  avatar: z.string().url().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type UserData = z.infer<typeof userSchema>;

/**
 * Schema for creating a new user
 */
export const createUserSchema = userSchema
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
      .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

export type CreateUserData = z.infer<typeof createUserSchema>;

/**
 * Schema for updating an existing user
 */
export const updateUserSchema = userSchema
  .omit({ id: true, createdAt: true, updatedAt: true })
  .partial();

export type UpdateUserData = z.infer<typeof updateUserSchema>;

export default userSchema;
