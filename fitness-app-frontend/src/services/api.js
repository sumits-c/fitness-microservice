import axios from "axios";
const API_URL = 'http://localhost:8080/api';

const api= axios.create({
    baseURL:API_URL
}
);

// api.interceptors.request.use((config)=>{

// });

export const getActivities = ()=>api.get('/activities');
export const addActivity = (activity) => api.post('/activity', activity);
export const getActivityDetail = (id) => api.get(`/recommendations/activity/${id}`);