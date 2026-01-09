import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const logoVariant = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const sectionVariant = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};


function About() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const canHover =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <>
    <motion.div className="about-bg-logo stardos-stencil-bold"
      variants={logoVariant} initial="hidden" animate="visible"
    >ApplyO
    </motion.div>
    <motion.div className="about-container" variants={containerVariant}
      initial="hidden" animate="visible"
    >

      {/* HERO */}
      <motion.section className="about-hero" variants={sectionVariant}>
        <h1 className="about-title">About ApplyO</h1>
        <p className="about-subtitle">
          ApplyO is a focused, single-user web application designed to help
          individuals track job applications and important career-related dates
          in a structured, low-distraction environment.
        </p>
        <p className="about-subtitle">
          It is intentionally minimal, local-first, and privacy-respecting -
          built to solve a very specific problem well.
        </p>
      </motion.section>

      {/* WHAT */}
      <motion.section
        className="about-section"
        variants={{ ...sectionVariant, hover: {
            scale: 1.015,
            backgroundColor: "rgba(201, 250, 255, 0.5)",
          },
        }}
        whileHover={canHover ? "hover" : undefined}
        whileTap={canHover ? undefined : undefined}
      >
        <h2>What this app does</h2>
        <p>ApplyO provides a centralized workspace to:</p>

        <ul className="about-list">
          <li>Keep track of job applications with status (Applied/ Interview/ Offer/ Rejected)</li>
          <li>
            Maintain important dates such as interviews, follow-ups, and
            deadlines
          </li>
          <li>Surface high-level insights without overwhelming the user</li>
          <li>
            Keep all data stored locally for speed, privacy, and reliability
          </li>
        </ul>

        <p>
          The goal is not to replace large job portals, but to act as a personal
          execution and awareness layer during the job application process.
        </p>
      </motion.section>

      {/* WHY */}
      <motion.section
        className="about-section"
        variants={{ ...sectionVariant, hover: {
            scale: 1.015,
            backgroundColor: "rgba(193, 255, 200, 0.399)",
          },
        }}
        whileHover={canHover ? "hover" : undefined}
      >
        <h2>Why I built this</h2>
        <p>
          During active job applications, I found that existing tools were
          either:
        </p>

        <ul className="about-list">
          <li>Too complex for individual use</li>
          <li>Built around recruiters rather than applicants</li>
          <li>
            Overloaded with features that added noise instead of clarity
          </li>
        </ul>

        <p>I wanted a tool that:</p>

        <ul className="about-list">
          <li>Updates instantly</li>
          <li>Feels calm rather than stressful</li>
          <li>Gives visibility without micromanagement</li>
          <li>Respects user data by default</li>
        </ul>

        <p>
          ApplyO was built to solve that gap - a personal, intentional system
          rather than a generic dashboard.
        </p>
      </motion.section>

      {/* FEATURES */}
      <motion.section
        className="about-section"
        variants={{ ...sectionVariant, hover: {
            scale: 1.015,
            backgroundColor: "rgba(250, 255, 196, 0.5)",
          },
        }}
        whileHover={canHover ? "hover" : undefined}
      >
        <h2>Existing features</h2>

        <ul className="about-list feature-list">
          <li className="feature-item">
            <span className="feature-icon">
              {/* Briefcase / Applications */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
            </span>

            <div>
              <strong>Application tracking</strong>
              <p>
                Keep track of job applications with clear status of application (Applied/ Interview/ Offer/ Rejected), notes per
                application, and flexible search and filtering across all fields.
              </p>
            </div>
          </li>

          <li className="feature-item">
            <span className="feature-icon">
              {/* Calendar / Dates */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </span>

            <div>
              <strong>Important dates</strong>
              <p>
                Manage interviews, follow-ups, and deadlines with smart “days left”
                indicators and automatic prioritization of upcoming and overdue events.
              </p>
            </div>
          </li>

          <li className="feature-item">
            <span className="feature-icon">
              {/* Bar chart / Insights */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="20" x2="12" y2="10" />
                <line x1="18" y1="20" x2="18" y2="4" />
                <line x1="6" y1="20" x2="6" y2="16" />
              </svg>
            </span>

            <div>
              <strong>Insights</strong>
              <p>
                View derived statistics and upcoming activity highlights based on your
                tracked applications and important dates.
              </p>
            </div>
          </li>

          <li className="feature-item">
            <span className="feature-icon">
              {/* Database / Local storage */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5" />
                <path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" />
              </svg>
            </span>

            <div>
              <strong>Local-first persistence</strong>
              <p>
                All data is stored locally in the browser, ensuring fast performance,
                offline reliability, and complete privacy without external services.
              </p>
            </div>
          </li>
        </ul>

      </motion.section>

      {/* TECH STACK */}
      <motion.section
        className="about-section"
        variants={{ ...sectionVariant, hover: {
            scale: 1.015,
            backgroundColor: "rgba(247, 195, 255, 0.5)",
          },
        }}
        whileHover={canHover ? "hover" : undefined}
      >
        <h2>Technology stack</h2>

        <p>
          ApplyO is built using a modern, lightweight front-end stack with a strong
          emphasis on performance, clarity, and maintainability.
        </p>

        <ul className="about-list tech-list">
          <li className="tech-item">
            <span className="tech-icon">
              {/* React */}
              <svg className="react" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="2" />
                <ellipse cx="12" cy="12" rx="10" ry="4" />
                <ellipse cx="12" cy="12" rx="4" ry="10" />
              </svg>
            </span>

            <div>
              <strong>React</strong>
              <p>
                Component-based architecture for predictable state management and
                reusable UI primitives.
              </p>
            </div>
          </li>

          <li className="tech-item">
            <span className="tech-icon">
              {/* JavaScript */}
              <svg className="js" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16v16H4z" />
                <path d="M8 8h4v8" />
                <path d="M12 16h4" />
              </svg>
            </span>

            <div>
              <strong>JavaScript (ES6+)</strong>
              <p>
                Modern language features for clean, readable, and expressive logic.
              </p>
            </div>
          </li>

          <li className="tech-item">
            <span className="tech-icon">
              {/* CSS */}
              <svg className="css" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 3l2 18 6 2 6-2 2-18z" />
                <path d="M8 7h8" />
                <path d="M8 11h8" />
                <path d="M8 15h4" />
              </svg>
            </span>

            <div>
              <strong>CSS</strong>
              <p>
                Hand-written styles focused on simplicity, responsiveness, and calm
                visual hierarchy without heavy UI frameworks.
              </p>
            </div>
          </li>

          <li className="tech-item">
            <span className="tech-icon">
              {/* Framer Motion */}
              <svg className="fm" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="10" rx="2" /> <path d="M7 10v4" />
                <path d="M11 10v4" /> <path d="M11 10h4v3" /> <path d="M15 10v4" />
              </svg>
            </span>

            <div>
              <strong>Framer Motion</strong>
              <p>
                Used selectively for subtle transitions and micro-interactions that
                enhance feedback without distraction.
              </p>
            </div>
          </li>

          <li className="tech-item">
            <span className="tech-icon">
              {/* Local Storage */}
              <svg className="lcapi" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5" />
                <path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" />
              </svg>
            </span>

            <div>
              <strong>Local Storage API</strong>
              <p>
                Enables fast, offline-capable, client-side persistence without external
                dependencies.
              </p>
            </div>
          </li>
        </ul>

        <p>
          The application follows a local-first architecture, with React state as the
          single source of truth and persistence handled transparently in the
          background.
        </p>
      </motion.section>


      {/* REAL LIFE */}
      <motion.section
        className="about-section"
        variants={{ ...sectionVariant, hover: {
            scale: 1.015,
            backgroundColor: "rgba(255, 201, 201, 0.5)",
          },
        }}
        whileHover={canHover ? "hover" : undefined}
      >
        <h2>How this helps in real life</h2>

        <ul className="about-list">
          <li>Eliminates the need to remember where and when you applied</li>
          <li>Prevents missed interviews or forgotten follow-ups</li>
          <li>
            Provides a clear sense of progress during long application cycles
          </li>
          <li>Offers structure without pressure</li>
        </ul>

        <p>
          It’s designed to support consistency and awareness - not urgency or
          anxiety.
        </p>
      </motion.section>

      {/* FUTURE */}
      <motion.section
        className="about-section"
        variants={{ ...sectionVariant, hover: {
            scale: 1.015,
            backgroundColor: "rgba(197, 197, 197, 0.5)",
          },
        }}
        whileHover={canHover ? "hover" : undefined}
      >
        <h2>What’s coming next</h2>

        <ul className="about-list feature-list">
          <li className="feature-item">
            <span className="feature-icon">
              {/* Functional insights */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="20" x2="4" y2="10" />
                <line x1="10" y1="20" x2="10" y2="4" />
                <line x1="16" y1="20" x2="16" y2="14" />
                <line x1="22" y1="20" x2="22" y2="8" />
              </svg>
            </span>

            <div>
              <strong>Functional insights</strong>
              <p>
                Clicking on an insight card shall show the data filtered out of all the existing data
                (applicatons / important dates).
              </p>
            </div>
          </li>

          <li className="feature-item">
            <span className="feature-icon">
              {/* Job discovery */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>

            <div>
              <strong>Job discovery support</strong>
              <p>
                Light job search integration with the ability to save opportunities
                and track them before submitting an application.
              </p>
            </div>
          </li>

          <li className="feature-item">
            <span className="feature-icon">
              {/* ATS-aware tooling */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <line x1="8" y1="7" x2="16" y2="7" />
                <line x1="8" y1="11" x2="16" y2="11" />
                <line x1="8" y1="15" x2="12" y2="15" />
              </svg>
            </span>

            <div>
              <strong>ATS-aware tooling</strong>
              <p>
                Resume and job desciption upload and scanning to show ATS compatibility and score.
              </p>
            </div>
          </li>

          <li className="feature-item">
            <span className="feature-icon">
              {/* Multi-user */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="7" r="4" />
                <circle cx="17" cy="7" r="4" />
                <path d="M2 21v-2a5 5 0 0 1 5-5h4" />
                <path d="M14 14h3a5 5 0 0 1 5 5v2" />
              </svg>
            </span>

            <div>
              <strong>Multi-user support (later)</strong>
              <p>
                Optional accounts with cross-device sync, while remaining
                privacy-first by design.
              </p>
            </div>
          </li>
        </ul>

        <p style={{ marginTop: "16px" }}>
          Each feature will be added only if it meaningfully improves clarity,
          usefulness, or user control.
        </p>
      </motion.section>


      {/* FOOTER */}
      <section className="about-footer">
        <p>Built with care, patience, and intent. 

        <br></br>
          Designed for focus, not noise.</p>
        <p className="signature">© 2026 Sourin Majumdar</p>
      </section>
    </motion.div>

    {showScrollTop && (
      <button
        className="scroll-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg width="24" height="24" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
      )}
    </>
  );
}

export default About;