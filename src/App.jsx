import { useState } from "react";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

function App() {
  const [currentView, setCurrentView] = useState("home");

  return (
    <div className="container">
      {currentView === "home" && (
        <Home goToApplications={() => setCurrentView("applications")} />
      )}

      {currentView === "applications" && (
        <>
          <button
            className="back-button"
            onClick={() => setCurrentView("home")}>
            ← Back to Home
          </button>

          <Dashboard />
        </>
      )}
    </div>
  );
}

export default App;
