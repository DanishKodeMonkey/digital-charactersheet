import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home.tsx";
import { AppRoutes, AuthRoutes, UserRoutes } from "./routes/index.tsx";
import { AuthProvider } from "./context/authentication/AuthContext.tsx";
import SignIn from "./pages/auth/SignIn.tsx";
import SignUp from "./pages/auth/SignUp.tsx";

/* Entrypoint determines direction of user. */

const Main = () => {
  return (
    <Router>
      <Routes>
        {/* Landing page, determines where to send user */}
        <Route path="/" element={<Home />} />

        {/* Authentication page, Login and signup */}
        <Route path="auth" element={<AuthRoutes />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        {/* App layer, the actual character sheet app */}
        <Route path="/app/" element={<AppRoutes />} />

        {/* User Settings / Profile management */}
        <Route path="/user/" element={<UserRoutes />} />

        {/* Final catch-all, re-route to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <Main />
    </AuthProvider>
  </React.StrictMode>,
);
