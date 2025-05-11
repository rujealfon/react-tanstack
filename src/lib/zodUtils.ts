import { z } from 'zod';

/**
 * Utility function to parse data with a Zod schema and handle errors
 * @param schema The Zod schema to validate against
 * @param data The data to validate
 * @returns The validated data or throws an error
 */
export function parseData<T extends z.ZodType>(schema: T, data: unknown): z.infer<T> {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
    }
    throw error;
  }
}

/**
 * Utility function to safely parse data with a Zod schema without throwing
 * @param schema The Zod schema to validate against
 * @param data The data to validate
 * @returns An object with success status and either data or error
 */
export function safeParseData<T extends z.ZodType>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error('Validation error:', result.error.errors);
  }
  return result;
}
