import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

//Devs
export const getDevs = (search) => api.get('/desenvolvedores', { params: { nome: search } });
export const createDev = (dev) => api.post('/desenvolvedores', dev);
export const updateDev = (id, dev) => api.put(`/desenvolvedores/${id}`, dev);
export const deleteDev = (id) => api.delete(`/desenvolvedores/${id}`);

//Niveis
export const getLevels = (search) => api.get(`/niveis${search ? `?nome=${encodeURIComponent(search)}` : ''}`);
export const createLevel = (level) => api.post('/niveis', level);
export const updateLevel = (id, level) => api.put(`/niveis/${id}`, level);
export const deleteLevel = (id) => api.delete(`/niveis/${id}`);