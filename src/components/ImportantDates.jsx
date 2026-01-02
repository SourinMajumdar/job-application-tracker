import { useState, useEffect } from "react";
import initialDates from "../data/importantDates";
import ImportantDateCard from "./ImportantDateCard";
import "../Dates.css";

function formatToday() {
  return new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getDaysDiff(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}

function getStatusFromDate(dateStr) {
  const daysLeft = getDaysDiff(dateStr);

  if (daysLeft < 0) return "past";
  if (daysLeft <= 7) return "soon";
  return "upcoming";
}

function ImportantDates() {
  const [dates, setDates] = useState(() => {
    const saved = localStorage.getItem("importantDates");
    return saved ? JSON.parse(saved) : initialDates;
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingDate, setEditingDate] = useState(null);
  
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [dateToDelete, setDateToDelete] = useState(null);
  
  /* ---------- Save (add / update) ---------- */
  function handleSaveDate(e) {
    e.preventDefault();
  
    if (editingDate) {
      // UPDATE
      setDates(prev =>
        prev.map(item =>
          item.id === editingDate.id
            ? { ...item, date, description }
            : item
        )
      );
    } else {
      // ADD
      setDates(prev => [
        {
          id: Date.now(),
          date,
          description,
          status: "upcoming", // default
        },
        ...prev,
      ]);
    }
  
    setShowModal(false);
    setEditingDate(null);
    setDate("");
    setDescription("");
  }
  
  /* ---------- FILTER + SORT ---------- */

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredDates = dates
  .filter(item => {
    if (selectedStatus === "All") return true;
    return getStatusFromDate(item.date) === selectedStatus;
  })
  .filter(item => {
    if (!searchTerm) return true;
    
    const query = searchTerm.toLowerCase();

    return (
      (item.description || "").toLowerCase().includes(query) ||
      (item.status || "").toLowerCase().includes(query) ||
      (item.date || "").toLowerCase().includes(query)
    );
  })
  .sort((a, b) => {
    const diffA = Math.abs(new Date(a.date) - today);
    const diffB = Math.abs(new Date(b.date) - today);
    return diffA - diffB;
  });

  /* ---------- PERSIST ---------- */

  useEffect(() => {
    localStorage.setItem("importantDates", JSON.stringify(dates));
  }, [dates]);

  /*---------- SCROLL TO TOP BUTTON ---------- */
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------- DELETE ---------- */

  function handleDeleteConfirm() {
    if (!dateToDelete) return;

    setDates(prev =>
      prev.filter(item => item.id !== dateToDelete.id)
    );

    setShowDeleteConfirm(false);
    setDateToDelete(null);
  }

  return (
    <div>
      {/* HEADER ACTIONS */}
      <div className="top-nav">

        <div className="today-center">
          Today: {formatToday()}
        </div>
      </div>
      <div className="dashboard-header-row">
        <h2>Important Dates</h2>

        <button className="add-date-btn" onClick={() => {
            setEditingDate(null); setDate("");
            setDescription(""); setShowModal(true);
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span className="add-date-text">Add Date</span>
        </button>
      </div>

      <hr className="section-divider" />

      {/* FILTERS */}
      <div className="filters-row">
        <div className="filter-dropdown">
          <label className="filter-label">Status:</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="filter-select"
          >
            <option value="All">All</option>
            <option value="soon">Soon</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>

        <div className="search-pill">
          <input
            type="text"
            placeholder="Search by anything"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-pill"
          />
        </div>
      </div>

      {/* CARDS */}
      {filteredDates.length === 0 ? (
        <p className="empty-state">No important dates found.</p>
      ) : (
        <div className="dates-list">
          {filteredDates.map(item => (
            <ImportantDateCard
              key={item.id}
              item={{...item, status:getStatusFromDate(item.date)}}
              onEdit={() => {
                setEditingDate(item);
                setDate(item.date);
                setDescription(item.description);
                setShowModal(true);
              }}
              onDelete={() => {
                setDateToDelete(item);
                setShowDeleteConfirm(true);
              }}
            />
          ))}
        </div>
      )}

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

        {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>{editingDate ? "Edit Date" : "Add Date"}</h3>

            <form onSubmit={handleSaveDate}>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea maxLength={100}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => {
                    setShowModal(false);
                    setEditingDate(null);
                  }}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-btn">
                  {editingDate ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="modal-backdrop">
          <div className="modal">
            <p className="delete-confirmation">
              Are you sure you want to delete this date?
            </p>

            <div className="modal-actions">
              <button
                className="secondary-btn"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDateToDelete(null);
                }}
              >
                Cancel
              </button>

              <button
                className="delete-btn date-delete" onClick={handleDeleteConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>

  );
}

export default ImportantDates;