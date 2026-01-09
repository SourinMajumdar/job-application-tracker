function getDaysDiff(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);

  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Insights({ jobs = [], dates = [] }) {
  /* -------- STATS -------- */

  const stats = jobs.reduce(
    (acc, job) => {
      acc.total += 1;
      acc[job.status.toLowerCase()] += 1;
      return acc;
    },
    {
      total: 0,
      applied: 0,
      interview: 0,
      offer: 0,
      rejected: 0,
    }
  );

  /* -------- SOON DATES (≤ 7 days) -------- */

  const soonDates = dates
    .map(d => ({
      ...d,
      daysLeft: getDaysDiff(d.date),
    }))
    .filter(d => d.daysLeft >= 0 && d.daysLeft <= 7)
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 3);

  return (
    <div className="home-insights">
      {/* LEFT: INSIGHTS */}
      <div className="insights-left">
        <h3 className="section-title">Insights</h3>

        {/* TOP ROW */}
        <div className="stats-top">
          <div className="stat-card total">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label"> Total</span>
          </div>

          <div className="stat-card applied">
            <span className="stat-number">{stats.applied}</span>
            <span className="stat-label"> Applied</span>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="stats-bottom">
          <div className="stat-card interview">
            <span className="stat-number">{stats.interview}</span>
            <span className="stat-label"> Interview</span>
          </div>

          <div className="stat-card offer">
            <span className="stat-number">{stats.offer}</span>
            <span className="stat-label"> Offers</span>
          </div>

          <div className="stat-card rejected">
            <span className="stat-number">{stats.rejected}</span>
            <span className="stat-label"> Rejected</span>
          </div>
        </div>
      </div>

      {/* RIGHT: UPCOMING */}
      <div className="insights-right">
        <h3 className="section-title upcoming">Upcoming</h3>

        {soonDates.length > 0 ? (
          <div className="soon-list">
            {soonDates.map(item => (
              <div key={item.id} className="soon-card">
                <div className="soon-desc">{item.description}</div>
                <div className="soon-meta">
                  <span style={{ fontWeight: "600" }}> {formatDate(item.date)} </span>{" "} ·{" "}
                  {item.daysLeft === 0 ? "Today" : item.daysLeft === 1 ? "Tomorrow" : `in ${item.daysLeft} days`}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-soon">Nothing coming up soon</p>
        )}
      </div>
    </div>
  );
}

export default Insights;
