import jobs from "../data/jobs";
import ApplicationCard from "./ApplicationCard";
import { useState } from "react";

function Dashboard() {
  const [selectedStatus, setSelectedStatus] = useState("All")
  const filteredJobs = selectedStatus === "All"
    ? jobs
    : jobs.filter((job) => job.status === selectedStatus);
  return (
    <div>
      <h2>Your Applications</h2>
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
      </div>

      {filteredJobs.map((job) => (
        <ApplicationCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default Dashboard;
