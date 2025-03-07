import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Home from "./pages/Home.tsx";
import { AuthRoutes, AppRoutes, UserRoutes } from "./routes/index.tsx";


/* Entrypoint determines direction of user. */

const Main = () =>{

  return (
    <Router>
      <Routes>
        {/* Landing page, determines where to send user */}
        <Route path="/" element={<Home />} />

        {/* Authentication page, Login and signup */}
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* App layer, the actual character sheet app */}
        <Route path="/app/" element={<AppRoutes /> } />

        {/* User Settings / Profile management */}
        <Route path="/user/" element={<UserRoutes />} />

        {/* Final catch-all, re-route to home */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  )

}




ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);
