import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import { store } from '../store';
import { getRoadmaps } from '../services/api';
import { loginSuccess } from '../store/slices/authSlice';

jest.mock('./Navbar', () => () => <div>navbar</div>);
jest.mock('../services/api', () => ({
  getRoadmaps: jest.fn(),
}));

const setMobileViewport = () => {
  window.innerWidth = 390;
  window.innerHeight = 844;
  window.dispatchEvent(new Event('resize'));
};

describe('Mobile responsiveness smoke', () => {
  beforeEach(() => {
    setMobileViewport();
    getRoadmaps.mockResolvedValue([]);
    store.dispatch(
      loginSuccess({
        token: 'test-token',
        user: { username: 'tester' },
      })
    );
  });

  test('renders landing page in mobile viewport', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText('Get Started').length).toBeGreaterThan(0);
  });

  test('renders dashboard in mobile viewport', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Create New Roadmap')).toBeTruthy();
    });
  });
});
