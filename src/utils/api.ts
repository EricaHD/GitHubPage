const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

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
