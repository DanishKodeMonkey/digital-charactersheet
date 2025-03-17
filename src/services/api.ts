// API interaction layer.

import axios from "axios";

// Define API base URL
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("Please define API url in environment variables");
}

// Helper function for API errors
const handleAPIError = (error: any) => {
  if (axios.isAxiosError(error)) {
    // If axios error, return response message if any
    const status = error.response?.status || "Unknown";
    const message = error.response?.data?.message ||
      error.message ||
      "An unknown error has occurred";
    throw new Error(`API Error (${status}): ${message}`);
  } else {
    // Handle non-Axios errors (unexpected issue has occured)
    throw new Error("Unexpected error has occured");
  }
};

// Auth API function object
export const auth = {
  signIn: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signin`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      handleAPIError(error);
    }
  },
  signUp: async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      handleAPIError(error);
    }
  },
  refreshToken: async (refreshToken: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/refresh`, {
        token: refreshToken,
      });
      return response.data;
    } catch (error) {
      handleAPIError(error);
    }
  },
  signout: async () => {
    try {
      await axios.post(`${API_URL}/auth/signout`);
    } catch (error) {
      handleAPIError(error);
    }
  },
};
