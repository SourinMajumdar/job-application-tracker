import Insights from "./Insights";

function Home({ goToApplications, goToImportantDates, goToAbout, jobs = [], dates = []}) {

  return (
    <>
      <div className="scroll-hint">
        ↓ Scroll for actions
      </div>
    
      <div className="home-topbar">
        <div className="rotate">
          <a href="https://github.com/SourinMajumdar/job-application-tracker.git"
            target="_blank" 
            rel="noopener noreferrer" 
            style={{textDecoration: 'none'}}>
            <span className="app-name">ApplyO</span>
          </a>
        </div>
        <button className="theme-toggle">🌙</button>
      </div>

      <div className="home-container">
        {/* TOP BAR */}
        {/* INSIGHTS */}
        <Insights jobs={jobs} dates={dates} />

        {/* ACTIONS */}
        <div className="actions-below">
          Actions:
        </div>
        <div className="home-actions">
          <button className="primary-action" onClick={goToApplications}>
            View Applications
          </button>

          <button
            className="secondary-action"
            onClick={goToImportantDates}
          >
            View Important Dates
          </button>

          <button
            className="third-action"
            onClick={goToAbout}
          >
            About this app
          </button>

        </div>
      </div>

      <div className="stt-container">
        <button
          className="back-to-top mobile-only-scroll"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="18 15 12 9 6 15" />
          </svg> Back to top
        </button>
      </div>

      <footer className="home-footer">
        © {new Date().getFullYear()}  
        <a href="https://github.com/SourinMajumdar/job-application-tracker.git"
          target="_blank" style={{textDecoration: 'none', color: 'inherit', fontWeight: 'bold'}}> ApplyO </a>· 
        <a href="https://github.com/SourinMajumdar" 
          target="_blank" style={{textDecoration: 'none', color: 'inherit'}}> Sourin Majumdar</a>
      </footer>
    </>
  );
}

export default Home;