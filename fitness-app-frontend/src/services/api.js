import axios from "axios";

const API_URL = "http://localhost:9090";

const api = axios.create({
  baseURL: API_URL
});

export const getActivities = () => api.get('/api/activities');
export const addActivity = (activity) => api.post('/api/activities', activity);
export const getActivityDetail = (id) =>
  api.get(`/api/recommendations/activity/${id}`);