import App from "../App.tsx";
import { useAuth } from "../context/authentication/AuthContext.tsx";

/* Mainly for authentication before going to app
HUSKAT Verify character being used in app?
*/
const AppRoutes = () => {
  const isAuthenticated = useAuth();

  return <App />;
};

export default AppRoutes;
