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
    const daysA = getDaysDiff(a.date);
    const daysB = getDaysDiff(b.date);

    const isPastA = daysA < 0;
    const isPastB = daysB < 0;

    // Move past dates to bottom
    if (isPastA && !isPastB) return 1;
    if (!isPastA && isPastB) return -1;

    // Both upcoming / soon → nearest first
    if (!isPastA && !isPastB) {
      return daysA - daysB;
    }

    // Both past → most recent past first
    return daysB - daysA;
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
          <span className="add-date-text">Add a Date</span>
        </button>
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
            <option value="soon">Soon</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
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