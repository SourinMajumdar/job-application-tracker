import initialJobs from "../data/jobs";
import ApplicationCard from "./ApplicationCard";
import { useState, useEffect, useRef } from "react";

function Dashboard() {
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState(() => {
  const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : initialJobs;
  });
  const [showModal, setShowModal] = useState(false);

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [status, setStatus] = useState("Applied");
  const companyInputRef = useRef(null);




  const filteredJobs = jobs
    .filter((job) =>
      selectedStatus === "All" ? true : job.status === selectedStatus
    )
    .filter((job) =>
      `${job.company} ${job.role}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );


  function handleAddApplication(e) {
    e.preventDefault();

    const newJob = {
      id: Date.now(),
      company,
      role,
      appliedDate,
      status,
    };

    setJobs([newJob, ...jobs]);

    // reset form
    setCompany("");
    setRole("");
    setAppliedDate("");
    setStatus("Applied");

    setSelectedStatus("All");
    setSearchTerm("");

    setShowModal(false);
  }

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    if (showModal) {
      companyInputRef.current?.focus();
    }
  }, [showModal]);


  return (
    <div>
      <div className="dashboard-header">
        <h2>Your Applications</h2>
        <p className="dashboard-subtitle">
          Track and manage all your job applications in one place
        </p>
      </div>
      <hr className="section-divider" />
      
      <div className="top-bar">
        <button
          className="add-button" onClick={() => setShowModal(true)}>
          + Add Application
        </button>


        <div className="search-pill">
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>


          <input
            type="text"
            placeholder="Search by company or role"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-pill"
          />

          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => setSearchTerm("")}
            >
              ✕
            </button>
          )}
        </div>


      </div>


      <div className="filters">
        <button
          className={selectedStatus === "All" ? "active" : ""}
          onClick={() => setSelectedStatus("All")}>
          All
        </button>

        <button
          className={selectedStatus === "Applied" ? "active" : ""}
          onClick={() => setSelectedStatus("Applied")}>
          Applied
        </button>

        <button
          className={selectedStatus === "Interview" ? "active" : ""}
          onClick={() => setSelectedStatus("Interview")}>
          Interview
        </button>

        <button
          className={selectedStatus === "Rejected" ? "active" : ""}
          onClick={() => setSelectedStatus("Rejected")}>
          Rejected
        </button>
        <button
          className={selectedStatus === "Offer" ? "active" : ""}
          onClick={() => setSelectedStatus("Offer")}
        >
          Offer
        </button>
      </div>

      {filteredJobs.length === 0 ? (
        <p className="empty-state">
          No applications match your search.
        </p>
      ) : (
        filteredJobs.map((job) => (
          <ApplicationCard key={job.id} job={job} searchTerm={searchTerm}/>
        ))
      )}

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Add Application</h3>

            <form onSubmit={handleAddApplication}>
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  ref={companyInputRef}
                  required
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <input
                  type="text"
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

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-btn">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;
