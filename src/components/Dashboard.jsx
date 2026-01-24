import ApplicationCard from "./ApplicationCard";
import { useState, useEffect, useRef } from "react";
import { addJob, deleteJob, getJobs } from "../data/firestore";

function Dashboard({ jobs, setJobs, user, initialStatusFilter = "All" }) {
  const [selectedStatus, setSelectedStatus] = useState(initialStatusFilter);
  const [searchTerm, setSearchTerm] = useState("");


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
  // 🔹 STATUS FILTER
  .filter(job =>
    selectedStatus === "All"
      ? true
      : (job.status || "").toLowerCase() === String(selectedStatus).toLowerCase()
  )

  // 🔹 SEARCH FILTER
  .filter(job => {
    if (!searchTerm) return true;
    const query = searchTerm.toLowerCase();

    return (
      (job.company || "").toLowerCase().includes(query) ||
      (job.role || "").toLowerCase().includes(query) ||
      (job.status || "").toLowerCase().includes(query) ||
      (job.notes || "").toLowerCase().includes(query) ||
      (job.appliedDate || "").includes(query)
    );
  })


  // 🔹 SORT
  .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));


  /* ---------------- ADD / UPDATE ---------------- */

  async function handleAddApplication(e) {
    e.preventDefault();

    if (!user) return;

    const jobData = {
      company,
      role,
      appliedDate,
      status,
      notes,
    };

    try {
      if (editingJob) {
        // 🔴 For now: simple approach = delete + re-add
        await deleteJob(user.uid, editingJob.id);
        await addJob(user.uid, jobData);
      } else {
        await addJob(user.uid, jobData);
      }

      const updated = await getJobs(user.uid);
      setJobs(updated);

      // reset
      setCompany("");
      setRole("");
      setAppliedDate("");
      setStatus("Applied");
      setNotes("");
      setEditingJob(null);
      setShowModal(false);
      setFocusField("company");
    } catch (err) {
      console.error("Failed to save job:", err);
      alert("Failed to save job. Try again.");
    }
  }

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

  // ---------- RESET FILTER ON PROP CHANGE -------- //
  useEffect(() => {
    setSelectedStatus(initialStatusFilter || "All");
  }, [initialStatusFilter]);


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
            <svg stylew={{opacity: 0.5}} width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span className="add-app-text">Add application</span>
          </button>
        </div>
      </div>

      <hr className="section-divider" />

      {/* FILTERS */}
      <div className="filters-row">
        <div className="filter-dropdown">
          <svg className="filter-icon" xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="none" viewBox="0 0 128 128" id="filter">
            <path stroke="#000" stroke-linecap="round" stroke-width="7" d="M71 98L16 98M71 31L16 31M57 64L112 64"></path>
            <path fill="#000" d="M85.5 97.5C85.5 105.784 92.2157 112.5 100.5 112.5V105.5C96.0817 105.5 92.5 101.918 92.5 97.5H85.5zM100.5 112.5C108.784 112.5 115.5 105.784 115.5 97.5H108.5C108.5 101.918 104.918 105.5 100.5 105.5V112.5zM115.5 97.5C115.5 89.2157 108.784 82.5 100.5 82.5V89.5C104.918 89.5 108.5 93.0817 108.5 97.5H115.5zM100.5 82.5C92.2157 82.5 85.5 89.2157 85.5 97.5H92.5C92.5 93.0817 96.0817 89.5 100.5 89.5V82.5zM85.5 30.5C85.5 38.7843 92.2157 45.5 100.5 45.5V38.5C96.0817 38.5 92.5 34.9183 92.5 30.5H85.5zM100.5 45.5C108.784 45.5 115.5 38.7843 115.5 30.5H108.5C108.5 34.9183 104.918 38.5 100.5 38.5V45.5zM115.5 30.5C115.5 22.2157 108.784 15.5 100.5 15.5V22.5C104.918 22.5 108.5 26.0817 108.5 30.5H115.5zM100.5 15.5C92.2157 15.5 85.5 22.2157 85.5 30.5H92.5C92.5 26.0817 96.0817 22.5 100.5 22.5V15.5zM42.5 63.5C42.5 71.7843 35.7843 78.5 27.5 78.5V71.5C31.9183 71.5 35.5 67.9183 35.5 63.5H42.5zM27.5 78.5C19.2157 78.5 12.5 71.7843 12.5 63.5H19.5C19.5 67.9183 23.0817 71.5 27.5 71.5V78.5zM12.5 63.5C12.5 55.2157 19.2157 48.5 27.5 48.5V55.5C23.0817 55.5 19.5 59.0817 19.5 63.5H12.5zM27.5 48.5C35.7843 48.5 42.5 55.2157 42.5 63.5H35.5C35.5 59.0817 31.9183 55.5 27.5 55.5V48.5z"></path>
          </svg>
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
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" 
            x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
          </svg>
          <input
            type="text"
            placeholder="Search by anything"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-pill"
          />
          {searchTerm && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >✕
            </button>
          )}
        </div>
      </div>

      {/* CARDS */}
      {filteredJobs.length === 0 ? (
        <p className="empty-state">No applications found :(</p>
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
                onClick={async () => {
                  if (!jobToDelete || !user) return;

                  try {
                    await deleteJob(user.uid, jobToDelete.id);
                    const updated = await getJobs(user.uid);
                    setJobs(updated);
                  } catch (err) {
                    console.error("Delete failed:", err);
                    alert("Failed to delete job.");
                  }

                  setShowDeleteConfirm(false);
                  setJobToDelete(null);
                }}
              >
                <span className="date-delete">Delete</span>
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