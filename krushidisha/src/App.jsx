import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import SellCrop from "./pages/SellCrop";
import Recommendation from "./pages/Recommendation";
import Payment from "./pages/Payment";
import AIPlanning from "./pages/AIPlanning";
import Profile from "./pages/Profile";

function App() {
  const [language, setLanguage] = useState("en");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              language={language}
              setLanguage={setLanguage}
            />
          }
        />

        <Route
          path="/sell"
          element={<SellCrop language={language} />}
        />

        <Route
          path="/recommendation"
          element={<Recommendation language={language} />}
        />

        <Route
          path="/payment"
          element={<Payment language={language} />}
        />

        <Route
          path="/planning"
          element={<AIPlanning language={language} />}
        />

        <Route
          path="/profile"
          element={<Profile language={language} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;