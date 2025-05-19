import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export { api };  // Export the api instance

export const login = async (username, password) => {
  const response = await api.post('/token-auth/', { username, password });
  return response.data;
};

export const getRoadmaps = async () => {
  const response = await api.get('/roadmaps/');
  return response.data;
};

export const getSkills = async () => {
  const response = await api.get('/skills/');
  return response.data;
};

export const getResources = async (skillId) => {
  const response = await api.get(`/resources/${skillId ? `?skill_id=${skillId}` : ''}`);
  return response.data;
};

export const generateRoadmap = async (roadmapData) => {
  const response = await api.post('/roadmaps/generate/', roadmapData);
  return response.data;
};

export const createRoadmap = async (roadmapData) => {
  const response = await api.post('/roadmaps/', roadmapData);
  return response.data;
};

export const updateRoadmap = async (id, roadmapData) => {
  const response = await api.put(`/roadmaps/${id}/`, roadmapData);
  return response.data;
};

export const addSkillToRoadmap = async (roadmapId, skillData) => {
  const response = await api.post(`/roadmaps/${roadmapId}/add_skill/`, skillData);
  return response.data;
};

export const updateProgress = async (progressId, resourceId, timeSpent) => {
  const response = await api.post(`/progress/${progressId}/add_completed_resource/`, {
    resource_id: resourceId,
    time_spent: timeSpent
  });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/register/', userData);
  return response.data;
}; 