const API_BASE_URL = 'https://vsqpljo4qk.execute-api.us-east-1.amazonaws.com/v1';

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
