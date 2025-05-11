import { ofetch } from 'ofetch';
import { API_BASE_URL } from '@/config/constants';

// Create a configured instance of ofetch with default options
export const apiClient = ofetch.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add default error handling
  onResponseError(context) {
    // Handle common error scenarios
    const { response } = context;
    console.error('API Error:', response?._data);
  },
});

// Helper function to add auth token to requests
export const createAuthenticatedClient = (token: string) => {
  return apiClient.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
