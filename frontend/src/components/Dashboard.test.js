import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import { store } from '../store';

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
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('No active roadmaps')).toBeTruthy();
    });
  });
});
