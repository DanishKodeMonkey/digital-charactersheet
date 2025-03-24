import App from "../App.tsx";
import {Outlet} from "react-router-dom"
import { CentralizationProvider } from "../context/CentralisationLayer/CentralisationContext.tsx";
import Header from "../components/Header.tsx";

/* Mainly for authentication before going to app
HUSKAT Verify character being used in app?
*/
const AppRoutes = () => {
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
