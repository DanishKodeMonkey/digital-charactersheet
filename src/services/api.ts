// API interaction layer.

import axios from 'axios';

// Define API base URL
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
    throw new Error('Please define API url in environment variables');
}

// Auth API function object
export const auth = {
    signIn: async (email: string, password: string) => {
        const response = await axios.post(`${API_URL}/auth/signin`, {
            email,
            password,
        });
        if (response.status != 200) {
            throw new Error(
                `An error occured while signing in ${response.status} - ${response.statusText}`
            );
        } else {
            return response.data;
        }
    },
    signUp: async (username: string, email: string, password: string) => {
        const response = await axios.post(`${API_URL}/auth/signup`, {
            username,
            email,
            password,
        });
        return response.data;
    },
    refreshToken: async (refreshToken: string) => {
        const response = await axios.post(`${API_URL}/auth/refresh`, {
            token: refreshToken,
        });
        return response.data;
    },
    signout: async () => {
        await axios.post(`${API_URL}/auth/signout`);
    },
};
