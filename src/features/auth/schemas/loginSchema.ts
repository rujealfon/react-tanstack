import { z } from 'zod';

/**
 * Zod schema for login form validation
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters' }),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export default loginSchema;
