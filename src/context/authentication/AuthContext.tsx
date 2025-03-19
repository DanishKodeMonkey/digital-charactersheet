import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { auth } from "../../services/api.ts";
import Cookies from "js-cookie";

interface AuthContextType {
  user: { username: string } | null;
  isAuthenticated: boolean;
  login: (token: string, username: string) => void;
  logout: () => void;
}

// helper functions for handling tokens
const getAccessToken = () => sessionStorage.getItem("access_token");
const getRefreshToken = () => Cookies.get("refresh_token");
const getUsername = () => localStorage.getItem("username");
// Create context layer

const AuthContext = createContext<AuthContextType | null>(null);

// Provider component for credentials

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAccessToken();
      const username = getUsername();

      // Verify existence of token and username
      if (token && username) {
        // Attempt ot validate access token
        if (verifyToken(token)) {
          setUser({ username });
          setIsAuthenticated(true);
          //If failed, attempt to refresh access token
        } else if (await refreshAccessToken()) {
          const updatedUsername = getUsername();
          setUser({ username: updatedUsername ?? username });
          setIsAuthenticated(true);
          // if failed, wipe credentials
        } else {
          logout();
        }
      }
    };
    // Run check.
    checkAuth();
    // on mount
  }, []);

  const login = (access_token: string, username: string) => {
    sessionStorage.setItem("access_token", access_token);
    sessionStorage.setItem("username", username);

    setUser({ username });
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("access_token");
    Cookies.remove("refresh_token");
    sessionStorage.removeItem("username");

    setUser(null);
    setIsAuthenticated(false);
  };

  // Verify access token date.
  // TODO: Verify tokens against API instead of local extension.
  const verifyToken = (token: string) => {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };
  const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return false;

    try {
      const response = await auth.refreshToken();
      const { access_token, username } = response;
      sessionStorage.setItem("access_token", access_token);
      if (username) sessionStorage.setItem("username", username);
      return true;
    } catch (error) {
      console.error("Token refresh failed", error);

      logout(); // Refresh failed, wipe credentials
      return false;
    }
  };

  // wrapper, including methods and user object to child components
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export hook for consuming authContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an auth provider");
  return context;
};
