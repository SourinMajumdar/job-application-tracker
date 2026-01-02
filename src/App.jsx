import { useState } from "react";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import ImportantDates from "./components/ImportantDates";

function App() {
  const [currentView, setCurrentView] = useState("home");

  return (
    <div className="app-container">
      {currentView === "home" && (
        <Home 
          goToApplications={() => setCurrentView("applications")} 
          goToImportantDates={() => setCurrentView("important-dates")}
        />
      )}

      {currentView === "applications" && (
        <div className="top-nav">
          <button
            className="back-home-btn"
            onClick={() => setCurrentView("home")}
          >
            <svg
              width="16" height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Home</span>
          </button>

          <Dashboard setCurrentView={setCurrentView} />
        </div>
      )}

      {currentView === "important-dates" && (
        <>
          <button
            className="back-home-btn"
            onClick={() => setCurrentView("home")}
          >
            <svg
                width="16" height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>Home</span>
          </button>

          <ImportantDates />
        </>
      )}

    </div>
  );
}

export default App;
