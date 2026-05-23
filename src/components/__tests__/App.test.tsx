import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import * as api from '../../utils/api';

jest.mock('../../utils/api');

test('App component renders title and subtitle correctly', async () => {
  (api.fetchFromAPI as jest.Mock).mockResolvedValue({
    message: 'Test message from API',
  });

  render(<App />);

  const titleElement = await waitFor(() => screen.getByText('GitHub Page'));
  expect(titleElement).toBeInTheDocument();

  const subtitleElement = await waitFor(() => screen.getByText('This is a GitHub page.'));
  expect(subtitleElement).toBeInTheDocument();
});
