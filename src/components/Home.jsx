import Insights from "./Insights";
import { Briefcase, Calendar, Info, ArrowRight } from 'lucide-react';

function Home({ goToApplications, goToImportantDates, goToAbout, jobs = [], dates = []}) {

  return (
    <>
      <div className="scroll-hint">
        ↓ Scroll for insights
      </div>
    
      <div className="home-topbar">
        <div className="rotate">
          <a href="https://github.com/SourinMajumdar/job-application-tracker.git"
            target="_blank" 
            rel="noopener noreferrer" 
            style={{textDecoration: 'none'}}>
            <span className="app-name">track<span style={{color: 'rgb(255, 221, 0)'}}>mate</span></span>
          </a>
        </div>
      </div>

      <div className="home-container">
        {/* HERO SECTION */}
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <Briefcase size={16} strokeWidth={2.5} />
              <span>Job Application Tracker</span>
            </div>
            <h1 className="hero-title">
              Manage Your <span className="gradient-text">Job Hunt</span>
            </h1>
            <p className="hero-subtitle">
              Track applications, schedule interviews, and land your dream job — all in one beautiful interface
            </p>
          </div>
          <div className="hero-illustration">
            <img 
              src="/workspace-illustration.svg" 
              alt="Professional workspace" 
              className="illustration-image"
            />
          </div>
        </div>

        {/* INSIGHTS */}
        <Insights jobs={jobs} dates={dates} />

        {/* ACTIONS */}
        <div className="actions-section">
          <h3 className="actions-title">Quick Actions</h3>
          <div className="home-actions">
            <button className="primary-action" onClick={goToApplications}>
              <Briefcase size={20} strokeWidth={2.5} />
              <span>View Applications</span>
              <ArrowRight size={18} strokeWidth={2.5} className="arrow-icon" />
            </button>

            <button className="secondary-action" onClick={goToImportantDates}>
              <Calendar size={20} strokeWidth={2.5} />
              <span>Important Dates</span>
              <ArrowRight size={18} strokeWidth={2.5} className="arrow-icon" />
            </button>

            <button className="third-action" onClick={goToAbout}>
              <Info size={20} strokeWidth={2.5} />
              <span>About This App</span>
              <ArrowRight size={18} strokeWidth={2.5} className="arrow-icon" />
            </button>
          </div>
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
          target="_blank" style={{textDecoration: 'none', color: 'rgba(25, 47, 118, 0.71)', fontWeight: 'bold'}}> trackmate </a>· 
        <a href="https://github.com/SourinMajumdar" 
          target="_blank" style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.61)'}}> Sourin Majumdar</a>
      </footer>
    </>
  );
}

export default Home;