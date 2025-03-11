/// <reference path="./images.d.ts" />
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.tsx";

import Overview from "./pages/character/Overview.tsx";
import Character from "./pages/character/Character.tsx";
import Inventory from "./pages/character/Inventory.tsx";
import Spells from "./pages/character/Spells.tsx";

import { CentralizationProvider } from "./context/CentralisationLayer/CentralisationContext.tsx";

function App() {
  return (
    <CentralizationProvider>
      <div className="App">
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/character" element={<Character />} />
              <Route path="/spells" element={<Spells />} />
            </Routes>
          </main>
        </Router>
      </div>
    </CentralizationProvider>
  );
}

export default App;
