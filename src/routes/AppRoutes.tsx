import { Navigate, Route, Routes } from "npm:react-router-dom@^7.0.2";
import App from "../App.tsx";
import { useAuth } from "../hooks/useAuth.ts";

/* Mainly for authentication before going to app
HUSKAT Verify character being used in app?
*/
const AppRoutes = () =>{
    const isAuthenticated = useAuth()

    return (
        <Routes>
            <Route path="/*" element={isAuthenticated ? <App /> : <Navigate to="/auth/signin" />} />
        </Routes>
    )
}

export default AppRoutes