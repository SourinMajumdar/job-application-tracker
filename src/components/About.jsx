import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, Calendar, TrendingUp, Database, 
  Code2, Moon, Search, FileText, Heart, Settings2 ,
  ArrowUp, Sparkles, Target, CheckCircle2
} from 'lucide-react';
import {FaReact, FaJs, FaCss3Alt} from 'react-icons/fa';
import { SiFramer } from "react-icons/si";
import { TiCloudStorage } from "react-icons/ti";

import FirebaseIcon from '../assets/firebasesvg.svg';

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const sectionVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function About() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <>
      <motion.div 
        className="about-container-new" 
        variants={containerVariant}
        initial="hidden" 
        animate="visible"
      >
        {/* HERO SECTION */}
        <motion.div className="about-hero-new" variants={sectionVariant}>
          <h1 className="about-title-new">
            About <span className="gradient-text-about">Trackmate</span>
          </h1>

          <div className="about-hero-boxes">
            <div className="about-hero-box box1">
              <p>
                Trackmate is a focused, personal web application designed to help
                individuals track job applications and important career-related dates
                in a structured, low-distraction environment.
              </p>
            </div>

            <div className="about-hero-box box2">
              <p>
                It combines a calm, distraction-free interface with secure cloud sync,
                allowing users to access their data across devices while keeping full
                control over their personal information.
              </p>
            </div>
          </div>
        </motion.div>

        {/* WHAT IT DOES */}
        <motion.div className="about-section-new" variants={sectionVariant}>
          <div className="section-icon-header">
            <h2 className="section-title-new">What this app does</h2>
            <Target size={24} strokeWidth={2.5} className="header-icon" />
          </div>
          <p className="section-description">
            Trackmate provides a centralized workspace to:
          </p>
          
          <ul className="about-list-new">
            <li>Keep track of job applications with status (Applied/ Interview/ Offer/ Rejected)</li>
            <li>
              Maintain important dates such as interviews, follow-ups, and
              deadlines
            </li>
            <li>Surface high-level insights without overwhelming the user</li>
            <li>
              Keep all data securely synced to your private account for access
              across devices while maintaining privacy by design
            </li>
          </ul>

          <p className="section-description">
            The goal is not to replace large job portals, but to act as a personal
            execution and awareness layer during the job application process.
          </p>
        </motion.div>

        {/* WHY */}
        <motion.div className="about-section-new highlight-section" variants={sectionVariant}>
          <div className="section-icon-header">
            <h2 className="section-title-new">Why I built this</h2>
            <Heart size={24} strokeWidth={2.5} className="header-icon" />
          </div>
          
          <p className="section-description">
            During active job applications, I found that existing tools were
            either:
          </p>

          <ul className="about-list-new">
            <li>Too complex for individual use</li>
            <li>Built around recruiters rather than applicants</li>
            <li>
              Overloaded with features that added noise instead of clarity
            </li>
          </ul>

          <p className="section-description">I wanted a tool that:</p>

          <ul className="about-list-new">
            <li>Updates instantly</li>
            <li>Feels calm rather than stressful</li>
            <li>Gives visibility without micromanagement</li>
            <li>Respects user data by default</li>
          </ul>

          <p className="section-description">
            Trackmate was built to solve that gap - a personal, intentional system
            rather than a generic dashboard.
          </p>
        </motion.div>

        {/* FEATURES */}
        <motion.div className="about-section-new" variants={sectionVariant}>
          <div className="section-icon-header">
            <h2 className="section-title-new">Existing features</h2>
            <Settings2 size={24} strokeWidth={2.5} className="header-icon" />
          </div>

          <div className="features-list-new">
            <div className="feature-item-new">
              <div className="feature-icon-wrapper">
                <Briefcase size={22} strokeWidth={2.5} />
              </div>
              <div className="feature-content">
                <h4>Application tracking</h4>
                <p>
                  Keep track of job applications with clear status of application (Applied/ Interview/ Offer/ Rejected), notes per
                  application, and flexible search and filtering across all fields.
                </p>
              </div>
            </div>

            <div className="feature-item-new">
              <div className="feature-icon-wrapper">
                <Calendar size={22} strokeWidth={2.5} />
              </div>
              <div className="feature-content">
                <h4>Important dates</h4>
                <p>
                  Manage interviews, follow-ups, and deadlines with smart "days left"
                  indicators and automatic prioritization of upcoming and overdue events.
                </p>
              </div>
            </div>

            <div className="feature-item-new">
              <div className="feature-icon-wrapper">
                <TrendingUp size={22} strokeWidth={2.5} />
              </div>
              <div className="feature-content">
                <h4>Interactive Insights</h4>
                <p>
                  View derived statistics and upcoming activity highlights based on your
                  tracked applications and important dates. Click on insight cards to instantly navigate to filtered application
                  views for faster analysis.
                </p>
              </div>
            </div>

            <div className="feature-item-new">
              <div className="feature-icon-wrapper">
                <Database size={22} strokeWidth={2.5} />
              </div>
              <div className="feature-content">
                <h4>Private cloud sync & per-user isolation</h4>
                <p>
                  All data is securely stored in your private account and automatically
                  synced across devices, with strict per-user data isolation by design.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* TECH STACK */}
        <motion.div className="about-section-new" variants={sectionVariant}>
          <div className="section-icon-header">
            <h2 className="section-title-new">Technology stack</h2>
            <Code2 size={24} strokeWidth={2.5} className="header-icon" />
          </div>
          
          <p className="section-description">
            Trackmate is built using a modern, serverless full-stack architecture, 
            focused on performance, clarity, security, and long-term maintainability.
          </p>

          <div className="tech-list-new">
            <div className="tech-item-new">
              <FaReact size={40} className="tech-icon-direct react-color" />
              <div className="tech-content">
                <h4>React</h4>
                <p>
                  Component-based architecture for predictable state management and
                  reusable UI primitives.
                </p>
              </div>
            </div>

            <div className="tech-item-new">
              <FaJs size={40} className="tech-icon-direct js-color" />
              <div className="tech-content">
                <h4>JavaScript (ES6+)</h4>
                <p>
                  Modern language features for clean, readable, and expressive logic.
                </p>
              </div>
            </div>

            <div className="tech-item-new">
              <FaCss3Alt size={40} className="tech-icon-direct css-color" />
              <div className="tech-content">
                <h4>CSS</h4>
                <p>
                  Hand-written styles focused on simplicity, responsiveness, and calm
                  visual hierarchy without heavy UI frameworks.
                </p>
              </div>
            </div>

            <div className="tech-item-new">
              <SiFramer size={40} className="tech-icon-direct motion-color" />
              <div className="tech-content">
                <h4>Framer Motion</h4>
                <p>
                  Used selectively for subtle transitions and micro-interactions that
                  enhance feedback without distraction.
                </p>
              </div>
            </div>

            <div className="tech-item-new">
              <img
                src={FirebaseIcon}
                alt="Firebase"
                className="tech-icon-direct firebase-icon"
              />
              <div className="tech-content">
                <h4>Firebase</h4>
                <p>
                  Secure user authentication with protected sessions, ensuring that each
                  user only has access to their own private data.
                </p>
              </div>
            </div>
            <div className="tech-item-new">
              <TiCloudStorage size={40} className="tech-icon-direct storage-color" />
              <div className="tech-content">
                <h4>Cloud Firestore</h4>
                <p>
                  Cloud-hosted NoSQL database providing real-time sync, per-user data
                  isolation, and seamless cross-device persistence.
                </p>
              </div>
            </div>

          </div>

          <p className="section-description">
            The application follows a serverless full-stack architecture, with React
            on the client and a secure cloud backend for authentication, data storage,
            and per-user access control.
          </p>
        </motion.div>

        {/* REAL LIFE */}
        <motion.div className="about-section-new" variants={sectionVariant}>
          <div className="section-icon-header">
            <h2 className="section-title-new">How this helps in real life</h2>
            <CheckCircle2 size={24} strokeWidth={2.5} className="header-icon" />
          </div>

          <ul className="about-list-new">
            <li>Eliminates the need to remember where and when you applied</li>
            <li>Prevents missed interviews or forgotten follow-ups</li>
            <li>
              Provides a clear sense of progress during long application cycles
            </li>
            <li>Offers structure without pressure</li>
          </ul>

          <p className="section-description">
            It's designed to support consistency and awareness - not urgency or
            anxiety.
          </p>
        </motion.div>

        {/* FUTURE FEATURES */}
        <motion.div className="about-section-new" variants={sectionVariant}>
          <div className="section-icon-header">
            <h2 className="section-title-new">What's coming next</h2>
            <Sparkles size={24} strokeWidth={2.5} className="header-icon" />
          </div>

          <div className="future-list-new">
            <div className="future-item-new">
              <div className="future-icon-wrapper">
                <Moon size={20} strokeWidth={2.5} />
              </div>
              <div className="future-content">
                <h4>Dark mode</h4>
                <p>
                  A theme-aware interface designed for low-light usage and accessibility,
                  scheduled for a future iteration.
                </p>
              </div>
            </div>

            <div className="future-item-new">
              <div className="future-icon-wrapper">
                <Search size={20} strokeWidth={2.5} />
              </div>
              <div className="future-content">
                <h4>Job discovery support</h4>
                <p>
                  Light job search integration with the ability to save opportunities
                  and track them before submitting an application.
                </p>
              </div>
            </div>

            <div className="future-item-new">
              <div className="future-icon-wrapper">
                <FileText size={20} strokeWidth={2.5} />
              </div>
              <div className="future-content">
                <h4>ATS-aware tooling</h4>
                <p>
                  Resume and job desciption upload and scanning to show ATS compatibility and score.
                </p>
              </div>
            </div>
          </div>

          <p className="section-description" style={{ marginTop: "24px" }}>
            Each feature will be added only if it meaningfully improves clarity,
            usefulness, or user control.
          </p>
        </motion.div>

        {/* FOOTER */}
        <motion.div className="about-footer-new" variants={sectionVariant}>
          <div className="footer-content-new">
            
            <p className="gradient-text-about" style={{
              fontSize:"25px", fontWeight:"700", margin:"0"
            }}
            ><Heart size={20} strokeWidth={2.5} className="footer-heart" /> Trackmate</p>
            <p className="footer-text-new">
              Built with care, patience, and intent.<br />
              Designed for focus, not noise.
            </p>
          </div>
          <p className="footer-signature">© 2026 Sourin Majumdar</p>
        </motion.div>
      </motion.div>

      {showScrollTop && (
        <motion.button
          className="scroll-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </motion.button>
      )}
    </>
  );
}

export default About;