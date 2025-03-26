import { createContext, useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { jwtDecode } from "jwt-decode";
import { auth } from "../../services/api.ts";
import Cookies from "js-cookie";

interface AuthContextType {
  user: { username: string } | null;
  isAuthenticated: boolean;
  accessToken: string;
  login: (token: string, username: string) => void;
  logout: () => void;
}

// helper functions for handling tokens
export const getAccessToken = () => sessionStorage.getItem("access_token");
const getUsername = () => sessionStorage.getItem("username");
// Create context layer

const AuthContext = createContext<AuthContextType | null>(null);

// Provider component for credentials

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(getAccessToken())
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {      
      const token = getAccessToken();
      const username = getUsername();
      console.log("MOUNT AUTH CHECK COMMENCE");
      
      console.log(`TOKEN: ${accessToken}, username: ${username}, authenticated: ${isAuthenticated} `);
    

      if(!token || !username){
        console.error("TOKEN OR USERNAME MISSING!");
        
        logout()
        return
      }
      // Verify existence of token and username
      if (token && username) {
        console.log(`TOKEN: ${token}, username: ${username}, authenticated: ${isAuthenticated} `);

        console.log("PING2");
        
        const isVerified = await verifyToken()
        // Attempt ot validate access token
        if (isVerified) {
          console.log("AUTHENTICATION VERIFIED!");
          login(token, username)
          


          //If failed, attempt to refresh access token
        } else {
          console.error("AUTHENTICATION FAILED SUCCESSFULLY!");
          
          logout();
        }
      }
    };
    // Run check.
    checkAuth();
    // on mount
  }, []);

  useEffect(() => {
    console.log(`isAuthenticated updated: ${isAuthenticated}`);
  }, [isAuthenticated]); // Watch isAuthenticated state changes

  const login = (access_token: string, username: string) => {
    sessionStorage.setItem("access_token", access_token);
    sessionStorage.setItem("username", username);

    setUser({ username });
    setAccessToken(access_token)
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("access_token");
    Cookies.remove("refresh_token");
    sessionStorage.removeItem("username");

    setUser(null);
    setAccessToken(null)
    setIsAuthenticated(false);  

  };

  // Verify access token date.
  // TODO: Verify tokens against API instead of local extension.
  const verifyToken = async () => {
    const tokenExists = getAccessToken()
    if(!tokenExists) return false;

    try{
      const verified = await auth.verifyToken()
      if(verified){
        return true
      }
    }catch(error){
      console.warn("Access token validation failed...", error);
      return false
      
    }
    return false
    

  };

  const refreshAccessToken = async () => {
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
    <AuthContext.Provider value={{ user, accessToken, isAuthenticated, login, logout}}>
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
