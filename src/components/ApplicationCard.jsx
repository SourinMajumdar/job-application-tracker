// import { useState } from "react";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function highlightText(text, searchTerm) {
  if (!searchTerm) return text;

  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <mark key={index}>{part}</mark>
    ) : (
      part
    )
  );
}

function ApplicationCard({ job, searchTerm, onEdit, onDelete, onOpenNotes }) {

  return (
    <div className="card">
      {/* MAIN CARD */}
      <div className="card-main">
        <div className="card-left">
          <h3>{highlightText(job.company, searchTerm)}</h3>
          <p className="role">{highlightText(job.role, searchTerm)}</p>
          <p className="date">
            Applied on: {formatDate(job.appliedDate)}
          </p>

          <div className="edit-wrapper">
            <button className="edit-btn" onClick={onEdit}>
              {/* Pencil */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
              <span className="edit-text">Edit</span>
            </button>

            <button className="delete-btn" onClick={onDelete}>
              {/* Trash */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
              <span className="delete-text">Delete</span>
            </button>
          </div>
        </div>

        <div className="card-right">
          <span className={`status ${job.status.toLowerCase()}`}>
            {job.status}
          </span>
        </div>
      </div>

      {/* NOTES STRIP */}
      <div className="card-notes">
        <div className="notes-content">
          <p className="notes-preview">
            {job.notes && job.notes.trim()
              ? job.notes
              :<span className="add-note-text">Add a note…</span>}
          </p>

          {job.notes && job.notes.length > 120 && (
            <button
              className="read-more-btn"
              onClick={onOpenNotes}
            >
              Read more
            </button>
          )}
        </div>

        {/* Edit note icon */}
        <button className="notes-edit-btn" onClick={() => onEdit("notes")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
        </button>
      </div>
      
    </div>
  );
}

export default ApplicationCard;