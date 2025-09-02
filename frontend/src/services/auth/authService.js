import api from '../api/axiosConfig';

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login/', { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const refreshToken = async () => {
  try {
    const response = await api.post('/auth/refresh/');
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      return response.data.token;
    }
  } catch (error) {
    logout();
    throw error;
  }
};
