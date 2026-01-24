import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import ImportantDates from "./components/ImportantDates";
import About from "./components/About";
import IntroScreen from "./components/IntroScreen";

import { useAuth } from "./context/AuthContext.jsx";
import Auth from "./components/Auth";

import { getJobs } from "./data/firestore";
import { getImportantDates } from "./data/firestore";




function App() {
  const { user } = useAuth();
  const [applicationFilter, setApplicationFilter] = useState("All");
  // ======================
  // GLOBAL STATE
  // ======================
  const [currentView, setCurrentView] = useState("home");

  // INTRO — every refresh (or until seen)
  const [showIntro, setShowIntro] = useState(() => {
    return localStorage.getItem("introSeen") !== "true";
  });

  // JOBS (FIRESTORE)
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);

  // IMPORTANT DATES (FIRESTORE)
  const [importantDates, setImportantDates] = useState([]);


  // ======================
  // EFFECTS
  // ======================

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [currentView]);

  // Reset jobs on logout
  useEffect(() => {
    if (!user) {
      setJobs([]);
      setJobsLoading(false);
    }
  }, [user]);

  // Load jobs from Firestore on login
  useEffect(() => {
    if (!user) return;

    async function loadJobs() {
      try {
        setJobsLoading(true);
        console.log("Loading jobs for user:", user.uid);

        const data = await getJobs(user.uid);

        console.log("Jobs loaded:", data);
        setJobs(data);
      } catch (err) {
        console.error("Failed to load jobs:", err);
        setJobs([]);
      } finally {
        setJobsLoading(false);
      }
    }

    loadJobs();
  }, [user]);

  // LOAD IMPORTANT DATES FROM FIRESTORE ON LOGIN
  useEffect(() => {
    if (!user) return;

    async function loadDates() {
      try {
        const data = await getImportantDates(user.uid);
        setImportantDates(data);
      } catch (err) {
        console.error("Failed to load important dates:", err);
        setImportantDates([]);
      }
    }

    loadDates();
  }, [user]);


  // ======================
  // RENDER
  // ======================

  return (
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

      {/* 🔹 AFTER INTRO */}
      {!showIntro && (
        <>
          {!user ? (
            <Auth />
          ) : (
            <>
              {/* HOME */}
              {currentView === "home" && (
                <Home
                  key={currentView}
                  goToApplications={(filter = "All") => {
                    setApplicationFilter(filter);
                    setCurrentView("applications");
                  }}
                  goToImportantDates={() => setCurrentView("important-dates")}
                  goToAbout={() => setCurrentView("about")}
                  jobs={jobs}
                  dates={importantDates}
                />
              )}


              {/* APPLICATIONS */}
              {currentView === "applications" && (
                <>
                  <button
                    className="back-home-btn"
                    onClick={() => setCurrentView("home")}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                    <span>Home</span>
                  </button>

                  <Dashboard
                    key={`dashboard-${applicationFilter}`}
                    jobs={jobs}
                    setJobs={setJobs}
                    user={user}
                    initialStatusFilter={applicationFilter}
                  />
                </>
              )}


              {/* IMPORTANT DATES */}
              {currentView === "important-dates" && (
                <>
                  <button
                    className="back-home-btn"
                    onClick={() => setCurrentView("home")}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                    <span>Home</span>
                  </button>

                  <ImportantDates
                    dates={importantDates}
                    setDates={setImportantDates}
                    user={user}
                  />
                </>
              )}

              {/* ABOUT */}
              {currentView === "about" && (
                <>
                  <button
                    className="back-home-btn"
                    onClick={() => setCurrentView("home")}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
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
  );
}

export default App;
