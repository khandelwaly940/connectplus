import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { store } from './store';
import { loginSuccess, logout } from './store/slices/authSlice';

jest.mock('./components/LandingPage', () => () => <div>landing-page</div>);
jest.mock('./components/Login', () => () => <div>login-page</div>);
jest.mock('./components/Register', () => () => <div>register-page</div>);
jest.mock('./components/Dashboard', () => () => <div>dashboard-page</div>);
jest.mock('./components/RoadmapCreator', () => () => <div>roadmap-creator-page</div>);
jest.mock('./components/RoadmapView', () => () => <div>roadmap-view-page</div>);
jest.mock('./components/Profile', () => () => <div>profile-page</div>);
jest.mock('./services/api', () => ({
  getCurrentUser: jest.fn(),
}));

import { getCurrentUser } from './services/api';

beforeEach(() => {
  localStorage.clear();
  store.dispatch(logout());
  getCurrentUser.mockResolvedValue({ username: 'alice' });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('shows landing page when there is no auth token', () => {
  render(<App />);
  expect(screen.getByText('landing-page')).toBeTruthy();
});

test('navigates authenticated user to dashboard on startup', async () => {
  store.dispatch(
    loginSuccess({
      token: 'test-token',
      user: { username: 'alice' },
    })
  );

  render(<App />);

  await waitFor(() => {
    expect(screen.getByText('dashboard-page')).toBeTruthy();
  });
});
