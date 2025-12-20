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
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <mark key={index}>{part}</mark>
    ) : (
      part
    )
  );
}

function ApplicationCard({ job, searchTerm }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{highlightText(job.company, searchTerm)}</h3>
        <span className={`status ${job.status.toLowerCase()}`}>
          {job.status}
        </span>
      </div>

      <p className="role">{highlightText(job.role, searchTerm)}</p>
      <p className="date">Applied on: {formatDate(job.appliedDate)}</p>
    </div>
  );
}

export default ApplicationCard
