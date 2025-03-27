// API interaction layer.

import axios from 'axios';

// Define API base URL
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
    throw new Error('Please define API url in environment variables');
}

const api = axios.create({
    baseURL: API_URL,
});

type ApiError = {
    status: number | 'Unknown';
    message: string;
};

// Helper function for API errors
const handleAPIError = (error: unknown): ApiError => {
    if (axios.isAxiosError(error)) {
        // If axios error, return response message if any
        const status = error.response?.status || 'Unknown';
        const message =
            error.response?.data?.message ||
            error.message ||
            'An unknown error has occurred';
        throw new Error(`API Error (${status}): ${message}`);
    } else {
        // Handle non-Axios errors (unexpected issue has occured)
        throw new Error('Unexpected error has occured');
    }
};

// Auth API function object
export const auth = {
    signIn: async (
        email: string,
        password: string,
        login: (access_token: string, username: string) => void
    ) => {
        try {
            const response = await axios.post(
                `${API_URL}/auth/signin`,
                {
                    email,
                    password,
                },
                { withCredentials: true }
            );
            console.log(response);

            const { access_token, username } = response.data;
            login(access_token, username);

            return response.data;
        } catch (error) {
            handleAPIError(error);
            return null;
        }
    },
    signUp: async (username: string, email: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/users/signup`, {
                username,
                email,
                password,
            });
            return response.data;
        } catch (error) {
            handleAPIError(error);
        }
    },
    refreshToken: async () => {
        try {
            const response = await axios.post(
                `${API_URL}/auth/refresh`,
                {},
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            handleAPIError(error);
        }
    },
    verifyToken: async () => {
        console.log('ATTEMPTING TO VERIFY');
        /* VERIFY THAT COOKIES ARE BEING SAVED FROM API */
        const currentAccessToken = sessionStorage.getItem('access_token');
        console.log(currentAccessToken);

        try {
            const response = await axios.post(
                `${API_URL}/auth/verify`,
                {
                    access_token: currentAccessToken,
                },
                { withCredentials: true }
            );
            console.log(response);

            if (response.data.access_token) {
                // Success, return new token
                return response.data.access_token;
            }
        } catch (error) {
            console.warn(
                'Access token validation failed... attempting refresh...',
                error
            );
            try {
                const refreshResponse = await auth.refreshToken();
                if (refreshResponse.access_token) {
                    return refreshResponse.access_token;
                }
            } catch (refreshError) {
                console.error('Token refresh failed', refreshError);
                return false;
            }
        }
        return false;
    },
    signout: async () => {
        try {
            await axios.post(`${API_URL}/auth/signout`);
        } catch (error) {
            handleAPIError(error);
        }
    },
};

/* export const character = {
    test: async () => {
        try{
            const response = axios.get(`${API_URL}/character/test`)
        }
    },
};
 */
