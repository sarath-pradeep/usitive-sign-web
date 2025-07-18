import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || { message: error.response.data.error };
  }
};

export const addUser = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/add-user`, userData);
      return response.data;
    } catch (error) {
      // Optional: more robust error handling
      throw error.response?.data || { error: 'Signup failed' };
    }
};

export const setUserPassword = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/set-password`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error.response.data.error || { message: error.response.data.error };
    }
}