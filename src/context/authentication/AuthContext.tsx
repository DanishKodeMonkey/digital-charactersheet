import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

interface AuthContextType {
  user: { username: string } | null;
  isAuthenticated: boolean;
  login: (token: string, refreshToken: string, username: string) => void;
  logout: () => void;
}

// Create context layer

const AuthContext = createContext<AuthContextType | null>(null);

// Provider component for credentials

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    const username = sessionStorage.getItem("username");

    // Verify existance of authentication token and username, if both exist assume user is
    // authenticated, sign username to context and authentication state to true.
    if (token && username) {
      setUser({ username });
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string, refreshToken: string, username: string) => {
    sessionStorage.setItem("authToken", token);
    sessionStorage.setItem("refreshToken", token);
    sessionStorage.setItem("username", username);

    setUser({ username });
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("username");

    setUser(null);
    setIsAuthenticated(false);
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
