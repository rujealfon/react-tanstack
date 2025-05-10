/**
 * Users feature barrel file
 * Exports public parts of the users feature
 */

// Export components
export { default as UserTable } from './components/UserTable';

// Export routes
export { default as usersRoutes } from './routes';

// Export store
export { default as useUsersStore } from './store/userStore';

// Export API
export { default as usersApi } from './api/usersApi';

// Export schemas
export { default as userSchema } from './schemas/userSchema';
export type { UserData, CreateUserData, UpdateUserData } from './schemas/userSchema';
