import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RoadmapView from './RoadmapView';
import { api, getRoadmaps } from '../services/api';

jest.mock('./Navbar', () => () => <div>navbar</div>);
jest.mock('../services/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
  getRoadmaps: jest.fn(),
}));

const roadmapResponse = {
  id: 1,
  title: 'Sample Roadmap',
  description: 'Roadmap description',
  timeline: 4,
  hours_per_week: 5,
  current_level: 'beginner',
  target_level: 'intermediate',
  created_at: '2026-01-01T00:00:00Z',
  target_unreachable: false,
  skills: [
    {
      id: 101,
      order: 1,
      completed: false,
      notes: [],
      start_date: '2026-01-01',
      end_date: '2026-01-07',
      skill: {
        id: 501,
        name: 'HTML Basics',
        description: 'Learn the basics',
        estimated_time: 2,
        difficulty_level: 1,
        learning_resources: [],
      },
    },
  ],
};

describe('RoadmapView', () => {
  beforeEach(() => {
    api.get.mockResolvedValue({ data: roadmapResponse });
    getRoadmaps.mockResolvedValue([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('opens note dialog from Add Note action', async () => {
    render(
      <MemoryRouter initialEntries={['/roadmap/1']}>
        <Routes>
          <Route path="/roadmap/:id" element={<RoadmapView />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Sample Roadmap')).toBeTruthy();
    });

    fireEvent.click(screen.getByRole('button', { name: /add note/i }));

    expect(screen.getByText(/Add Note for HTML Basics/i)).toBeTruthy();
  });
});
