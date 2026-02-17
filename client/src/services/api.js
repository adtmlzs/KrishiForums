import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with password interceptor
const createAuthAPI = () => {
    const api = axios.create({ baseURL: API_URL });

    // Add password to headers for admin requests
    api.interceptors.request.use((config) => {
        const password = localStorage.getItem('admin_password');
        if (password && (
            config.url.includes('/admin/') ||
            config.url.includes('/analytics') ||
            config.method === 'post' ||
            config.method === 'put' ||
            config.method === 'delete'
        )) {
            config.headers['x-admin-password'] = password;
        }
        return config;
    });

    return api;
};

const api = createAuthAPI();

// Blog API
export const blogAPI = {
    getAll: () => api.get('/blogs'),
    getBySlug: (slug) => api.get(`/blogs/${slug}`),
    getAllAdmin: () => api.get('/admin/blogs'),
    create: (data) => api.post('/blogs', data),
    update: (id, data) => api.put(`/blogs/${id}`, data),
    delete: (id) => api.delete(`/blogs/${id}`)
};

// Forum API
export const forumAPI = {
    getAll: () => api.get('/forum'),
    getById: (id) => api.get(`/forum/${id}`),
    create: (data) => api.post('/forum', data),
    answer: (id, data) => api.post(`/forum/${id}/answer`, data),
    editAnswer: (questionId, answerId, data) => api.put(`/forum/${questionId}/answer/${answerId}`, data),
    deleteAnswer: (questionId, answerId) => api.delete(`/forum/${questionId}/answer/${answerId}`),
    delete: (id) => api.delete(`/forum/${id}`)
};

// Updates API
export const updatesAPI = {
    getAll: () => api.get('/updates'),
    create: (data) => api.post('/updates', data),
    update: (id, data) => api.put(`/updates/${id}`, data),
    delete: (id) => api.delete(`/updates/${id}`)
};

// Analytics API
export const analyticsAPI = {
    get: () => api.get('/analytics')
};
