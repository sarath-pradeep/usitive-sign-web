import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = 'https://usitive-sign-server.onrender.com/api';

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

export const verifyOtp = async (email, otp) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/verify-otp?type=setPassword`, {
            email,
            otp,
        });
        return response;
    } catch (error) {
        throw error.response.data.error || { message: error.response.data.error };
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

export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
        return response.data;
    } catch (error) {
        throw error.response.data.error || { message: error.response.data.error };
    }
}