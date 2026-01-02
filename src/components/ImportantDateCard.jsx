import "../Dates.css";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
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

function ImportantDateCard({ item, onEdit, onDelete }) {
  const daysLeft = getDaysDiff(item.date);   // ✅ NOW DEFINED
  const status = getStatusFromDate(item.date);

  return (
    <div className={`date-card ${status}`}>
      <div className="date-card-left">
        <div className="date-row">
          <div className="date-text">
            {formatDate(item.date)}
          </div>

          <span className={`days-left ${status}`}>
            {daysLeft < 0? "Past" : 
            daysLeft === 0 ? "Today" : 
            `${daysLeft} days left`}
          </span>
          
        </div>

        <p className="date-desc"> {item.description} </p>
      </div>

      <div className="date-card-actions">
        <button className="edit-btn" onClick={onEdit}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
          <span className="edit-text">Edit</span>
        </button>

        <button className="delete-btn" onClick={onDelete}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
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
  );
}

export default ImportantDateCard;
