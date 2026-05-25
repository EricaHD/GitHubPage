// process.env.NODE_ENV is set by Webpack's DefinePlugin at compile time
// The value is determined by the `mode` setting in webpack.dev.ts and webpack.prod.ts
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://pu5sgwc7n1.execute-api.us-east-1.amazonaws.com/v1'
  : 'http://localhost:8000';

export const fetchFromAPI = async (endpoint: string, options?: RequestInit) => {
  const url = `${API_BASE_URL}/api${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
};
