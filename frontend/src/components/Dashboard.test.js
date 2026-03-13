import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from './Dashboard';

jest.mock('./Navbar', () => () => <div>navbar</div>);
jest.mock('../services/api', () => ({
  getRoadmaps: jest.fn(),
}));

import { getRoadmaps } from '../services/api';

describe('Dashboard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders empty active-roadmaps state', async () => {
    getRoadmaps.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No active roadmaps')).toBeTruthy();
    });
  });
});
