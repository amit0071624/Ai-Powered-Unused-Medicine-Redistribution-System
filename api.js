import axios from "axios";

export const API_BASE_URL = "http://localhost:8080/api";

// Local storage keys
const STORAGE_KEYS = {
  USER_DATA: 'userData',
  MEDICINES: 'medicines',
  AUTH_TOKEN: 'authToken',
  REGISTRATION_DATA: 'registrationData',
  USER_PREFERENCES: 'userPreferences',
  LAST_UPDATE: 'lastUpdate'
};

// Helper functions for localStorage
const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const getLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

const clearLocalStorage = (key) => {
  try {
    if (key) {
      localStorage.removeItem(key);
    } else {
      localStorage.clear();
    }
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

// Create axios instance with custom config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({ message: 'Request timed out. Please check your internet connection.' });
    }
    if (!error.response) {
      return Promise.reject({ message: 'Network error. Please check your internet connection.' });
    }
    if (error.response.status === 403) {
      return Promise.reject({ message: 'Access denied. Please check your credentials or try again later.' });
    }
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject({ message: errorMessage });
  }
);

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const userData = response.data;
    setLocalStorage(STORAGE_KEYS.USER_DATA, userData);
    if (userData.token) {
      setLocalStorage(STORAGE_KEYS.AUTH_TOKEN, userData.token);
    }
    return userData;
  } catch (error) {
    console.error('Login failed:', error.message);
    throw error;
  }
};
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    const registrationData = response.data;
    setLocalStorage(STORAGE_KEYS.REGISTRATION_DATA, registrationData);
    return registrationData;
  } catch (error) {
    console.error('Registration failed:', error.message);
    throw error;
  }
};

export const fetchMedicines = async () => {
  try {
    const response = await api.get('/medicines');
    const medicines = response.data;
    setLocalStorage(STORAGE_KEYS.MEDICINES, medicines);
    return medicines;
  } catch (error) {
    console.error('Failed to fetch medicines:', error.message);
    // Try to return cached data if available
    const cachedMedicines = getLocalStorage(STORAGE_KEYS.MEDICINES);
    if (cachedMedicines) {
      return cachedMedicines;
    }
    throw error;
  }
};

export const updateUser = async (userId, updatedData) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const response = await api.put(`/user/${userId}`, updatedData);
    const userData = response.data;
    setLocalStorage(STORAGE_KEYS.USER_DATA, userData);
    setLocalStorage(STORAGE_KEYS.LAST_UPDATE, new Date().toISOString());
    return userData;
  } catch (error) {
    console.error('Failed to update user:', error.message);
    const cachedUserData = getLocalStorage(STORAGE_KEYS.USER_DATA);
    if (cachedUserData) {
      return cachedUserData;
    }
    throw error;
  }
};

// Additional utility functions for data management
export const getCurrentUser = () => {
  return getLocalStorage(STORAGE_KEYS.USER_DATA);
};

export const getAuthToken = () => {
  return getLocalStorage(STORAGE_KEYS.AUTH_TOKEN);
};

export const getCachedMedicines = () => {
  return getLocalStorage(STORAGE_KEYS.MEDICINES);
};

export const getRegistrationData = () => {
  return getLocalStorage(STORAGE_KEYS.REGISTRATION_DATA);
};

export const getLastUpdate = () => {
  return getLocalStorage(STORAGE_KEYS.LAST_UPDATE);
};

export const setUserPreferences = (preferences) => {
  setLocalStorage(STORAGE_KEYS.USER_PREFERENCES, preferences);
};

export const getUserPreferences = () => {
  return getLocalStorage(STORAGE_KEYS.USER_PREFERENCES) || {};
};

export const logout = () => {
  clearLocalStorage();
};
