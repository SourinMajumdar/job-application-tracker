import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import ImportantDates from "./components/ImportantDates";
import initialJobs from "./data/jobs";
import initialDates from "./data/importantDates";
import About from "./components/About";
import IntroScreen from "./components/IntroScreen";

import { useAuth } from "./context/AuthContext.jsx";
import Auth from "./components/Auth";

function App() {
  const { user } = useAuth();

  const [currentView, setCurrentView] = useState("home");

  // INTRO — every refresh (or until seen)
  const [showIntro, setShowIntro] = useState(() => {
    return localStorage.getItem("introSeen") !== "true";
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [currentView]);

  // JOBS STATE
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem("jobs");
    return saved ? JSON.parse(saved) : initialJobs;
  });

  // IMPORTANT DATES STATE
  const [importantDates, setImportantDates] = useState(() => {
    const saved = localStorage.getItem("importantDates");
    return saved ? JSON.parse(saved) : initialDates;
  });

  // PERSIST JOBS
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  // PERSIST IMPORTANT DATES
  useEffect(() => {
    localStorage.setItem(
      "importantDates",
      JSON.stringify(importantDates)
    );
  }, [importantDates]);

  return (
    <>
      <div className="app-container">
        {/* 🔹 INTRO SCREEN */}
        <AnimatePresence>
          {showIntro && (
            <IntroScreen 
              onFinish={() => {
                localStorage.setItem("introSeen", "true");
                setShowIntro(false);
              }}
            />
          )}
        </AnimatePresence>

        {/* 🔹 AFTER INTRO: AUTH OR APP */}
        {!showIntro && (
          <>
            {!user ? (
              <Auth />
            ) : (
              <>
                {currentView === "home" && (
                  <Home
                    key={currentView}  
                    goToApplications={() => setCurrentView("applications")}
                    goToImportantDates={() => setCurrentView("important-dates")}
                    goToAbout={() => setCurrentView("about")}
                    jobs={jobs}
                    dates={importantDates}
                  />
                )}

                {currentView === "applications" && (
                  <>
                    <button
                      className="back-home-btn"
                      onClick={() => setCurrentView("home")}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                      <span>Home</span>
                    </button>

                    <Dashboard jobs={jobs} setJobs={setJobs} />
                  </>
                )}

                {currentView === "important-dates" && (
                  <>
                    <button
                      className="back-home-btn"
                      onClick={() => setCurrentView("home")}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                      <span>Home</span>
                    </button>

                    <ImportantDates
                      dates={importantDates}
                      setDates={setImportantDates}
                    />
                  </>
                )}

                {currentView === "about" && (
                  <>
                    <button
                      className="back-home-btn"
                      onClick={() => setCurrentView("home")}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                      <span>Home</span>
                    </button>

                    <About />
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;