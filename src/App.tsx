/// <reference path="./images.d.ts" />
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import "./App.css";

import {useAuth } from "./context/authentication/AuthContext.tsx";

import AppRoutes from "./routes/AppRoutes.tsx";
import Overview from "./pages/character/Overview.tsx";
import Character from "./pages/character/Character.tsx";
import Inventory from "./pages/character/Inventory.tsx";
import Spells from "./pages/character/Spells.tsx";

import Home from "./pages/Home.tsx";

import AuthRoutes from "./routes/AuthRoutes.tsx";
import SignIn from "./pages/auth/SignIn.tsx";
import SignUp from "./pages/auth/SignUp.tsx";

import UserRoutes from "./routes/UserRoutes.tsx";


function App() {
  const {accessToken} = useAuth()

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
        <Route path="app" element={accessToken ? <AppRoutes /> : <Navigate to="/auth/signin" />}>
              <Route index element={<Overview />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="character" element={<Character />} />
              <Route path="spells" element={<Spells />} />
        </Route>

        {/* User Settings / Profile management */}
        <Route path="/user/" element={accessToken ? <UserRoutes /> : <Navigate to="/auth/signin" />} />

        {/* Final catch-all, re-route to home */}
        <Route path="*" element={<Navigate to="/" />}/>

      </Routes>

    </Router>

  );
}

export default App;
