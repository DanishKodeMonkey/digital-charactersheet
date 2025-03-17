
import {Routes, Route, Navigate} from "react-router-dom"
import SignInPage from "../pages/auth/SignIn.tsx"
import SignUpPage from "../pages/auth/SignUp.tsx"
import { useAuth } from "../context/authentication/AuthContext.tsx";

const AuthRoutes = () =>{
    const isAuthenticated = useAuth()

    return(
        <Routes>
            <Route path="/signin" element={isAuthenticated ? <Navigate to="/app" /> : <SignInPage />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/app" /> : <SignUpPage /> } />
            <Route path="*" element={<Navigate to="/signin" />} /> /* Defaults to sign-in */
        </Routes>
    )
}

export default AuthRoutes