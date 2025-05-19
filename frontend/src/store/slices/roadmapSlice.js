import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roadmaps: [],
  currentRoadmap: null,
  skills: [],
  resources: [],
  loading: false,
  error: null,
};

const roadmapSlice = createSlice({
  name: 'roadmap',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRoadmapsSuccess: (state, action) => {
      state.loading = false;
      state.roadmaps = action.payload;
    },
    fetchSkillsSuccess: (state, action) => {
      state.loading = false;
      state.skills = action.payload;
    },
    fetchResourcesSuccess: (state, action) => {
      state.loading = false;
      state.resources = action.payload;
    },
    setCurrentRoadmap: (state, action) => {
      state.currentRoadmap = action.payload;
    },
    addRoadmapSuccess: (state, action) => {
      state.roadmaps.push(action.payload);
    },
    updateRoadmapSuccess: (state, action) => {
      const index = state.roadmaps.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.roadmaps[index] = action.payload;
      }
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchStart,
  fetchRoadmapsSuccess,
  fetchSkillsSuccess,
  fetchResourcesSuccess,
  setCurrentRoadmap,
  addRoadmapSuccess,
  updateRoadmapSuccess,
  fetchFailure,
} = roadmapSlice.actions;

export default roadmapSlice.reducer; 