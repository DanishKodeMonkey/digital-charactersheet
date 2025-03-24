import App from "../App.tsx";
import {Outlet} from "react-router-dom"
import { useAuth } from "../context/authentication/AuthContext.tsx";
import { CentralizationProvider } from "../context/CentralisationLayer/CentralisationContext.tsx";
import Header from "../components/Header.tsx";

/* Mainly for authentication before going to app
HUSKAT Verify character being used in app?
*/
const AppRoutes = () => {
  const isAuthenticated = useAuth();

  return(
  <CentralizationProvider>
    <div className="App">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  </CentralizationProvider>
)
  
};

export default AppRoutes;
