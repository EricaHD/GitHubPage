import { render, screen } from '@testing-library/react';
import App from '../App';

test('App component renders title and subtitle correctly', () => {
  render(<App />);

  const titleElement = screen.getByText('GitHub Page');
  expect(titleElement).toBeInTheDocument();

  const subtitleElement = screen.getByText('This is a GitHub page.');
  expect(subtitleElement).toBeInTheDocument();
});
