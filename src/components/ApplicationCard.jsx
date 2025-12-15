function ApplicationCard({ job }) {
  return (
    <div className="card">
      <h3>{job.company}</h3>
      <p>Role: {job.role}</p>
      <p>Applied on: {job.appliedDate}</p>
      <span className={`status ${job.status.toLowerCase()}`}>
        {job.status}
      </span>
    </div>
  );
}

export default ApplicationCard;
