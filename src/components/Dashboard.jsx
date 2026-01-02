import initialJobs from "../data/jobs";
import ApplicationCard from "./ApplicationCard";
import { useState, useEffect, useRef } from "react";

function Dashboard() {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : initialJobs;
  });

  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");
  const [notesModalJob, setNotesModalJob] = useState(null);
  const [focusField, setFocusField] = useState("company");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const companyInputRef = useRef(null);
  const notesTextareaRef = useRef(null);

  /* ---------------- FILTER + SORT ---------------- */

  const filteredJobs = jobs
    .filter(job =>
      selectedStatus === "All" ? true : job.status === selectedStatus
    )
    .filter(job =>
      `${job.company} ${job.role}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));

  /* ---------------- ADD / UPDATE ---------------- */

  function handleAddApplication(e) {
    e.preventDefault();

    if (editingJob) {
      setJobs(prev =>
        prev.map(job =>
          job.id === editingJob.id
            ? { ...job, company, role, appliedDate, status, notes }
            : job
        )
      );
    } else {
      setJobs(prev => [
        {
          id: Date.now(),
          company,
          role,
          appliedDate,
          status,
          notes,
        },
        ...prev,
      ]);
    }

    // reset
    setCompany("");
    setRole("");
    setAppliedDate("");
    setStatus("Applied");
    setNotes("");
    setEditingJob(null);
    setShowModal(false);
    setFocusField("company");
  }

  /* ---------------- PERSIST ---------------- */

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  /* ---------------- PREFILL FORM ---------------- */

  useEffect(() => {
    if (!showModal) return;

    if (editingJob) {
      setCompany(editingJob.company);
      setRole(editingJob.role);
      setAppliedDate(editingJob.appliedDate);
      setStatus(editingJob.status);
      setNotes(editingJob.notes || "");
    } else {
      setCompany("");
      setRole("");
      setAppliedDate("");
      setStatus("Applied");
      setNotes("");
    }
  }, [showModal, editingJob]);

  /* ---------------- FOCUS ---------------- */

  useEffect(() => {
    if (!showModal) return;

    requestAnimationFrame(() => {
      if (focusField === "notes") {
        notesTextareaRef.current?.focus();
      } else {
        companyInputRef.current?.focus();
      }
    });
  }, [showModal, focusField]);

  /* ---------------- SCROLL ---------------- */

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- RENDER ---------------- */

  return (
    <div>
      {/* HEADER */}
      <div className="dashboard-header">
        <div className="dashboard-header-row">
          <h2>Your Applications</h2>

          <button
            className="add-app-btn"
            onClick={() => {
              setEditingJob(null);
              setFocusField("company");
              setShowModal(true);
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span className="add-app-text">Add Application</span>
          </button>
        </div>
      </div>

      <hr className="section-divider" />

      {/* FILTERS */}
      <div className="filters-row">
        <div className="filter-dropdown">
          <label className="filter-label">Filter:</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="filter-select"
          >
            <option value="All">All</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="search-pill">
          <input
            type="text"
            placeholder="Search by company or role"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-pill"
          />
        </div>
      </div>

      {/* CARDS */}
      {filteredJobs.length === 0 ? (
        <p className="empty-state">No applications match your search.</p>
      ) : (
        <div className="cards-grid">
          {filteredJobs.map(job => (
            <ApplicationCard
              key={job.id}
              job={job}
              searchTerm={searchTerm}
              onEdit={(field = "company") => {
                setEditingJob(job);
                setFocusField(field);
                setShowModal(true);
              }}
              onDelete={() => {
                setJobToDelete(job);
                setShowDeleteConfirm(true);
              }}
              onOpenNotes={() => setNotesModalJob(job)}
            />
          ))}
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>{editingJob ? "Edit Application" : "Add Application"}</h3>

            <form onSubmit={handleAddApplication}>
              <div className="form-group">
                <label>Company</label>
                <input
                  ref={companyInputRef}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Date Applied</label>
                <input
                  type="date"
                  value={appliedDate}
                  onChange={(e) => setAppliedDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  ref={notesTextareaRef}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="3"
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => {
                    setShowModal(false);
                    setEditingJob(null);
                    setFocusField("company");
                  }}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-btn">
                  {editingJob ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {showDeleteConfirm && (
        <div className="modal-backdrop">
          <div className="modal">
            <p className="delete-confirmation">
              Are you sure you want to delete this application?
            </p>

            <div className="modal-actions">
              <button
                className="secondary-btn"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setJobToDelete(null);
                }}
              >
                Cancel
              </button>

              <button
                className="delete-btn"
                onClick={() => {
                  if (!jobToDelete) return;

                  setJobs(prev =>
                    prev.filter(job => job.id !== jobToDelete.id)
                  );

                  setShowDeleteConfirm(false);
                  setJobToDelete(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {notesModalJob && (
        <div
          className="modal-backdrop"
          onClick={() => setNotesModalJob(null)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Note</h3>

            <p style={{ fontSize: "16px", lineHeight: "1.6", textAlign: "justify" }}>
              {notesModalJob.notes}
            </p>

            <div className="modal-actions">
              <button
                className="primary-btn"
                onClick={() => setNotesModalJob(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      {/* SCROLL TO TOP */}
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
    </div>
  );
}

export default Dashboard;