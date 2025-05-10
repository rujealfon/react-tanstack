/**
 * Application-wide configuration
 */

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.example.com";

// Feature Flags
export const ENABLE_ANALYTICS = import.meta.env.VITE_ENABLE_ANALYTICS === "true";

// Theme Configuration
export const DEFAULT_THEME = "light";

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_SIZES = [5, 10, 25, 50];

// Date format
export const DEFAULT_DATE_FORMAT = "MMMM dd, yyyy";

// Application info
export const APP_NAME = "React Stack";
export const APP_VERSION = "1.0.0";
