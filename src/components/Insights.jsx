import { Briefcase, CheckCircle, Calendar, Trophy, CircleX, TrendingUp } from 'lucide-react';
import { getDaysDiff } from '../utils/dateUtils';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Insights({ jobs = [], dates = [], onFilterClick }) {
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
        <div className="section-header">
          <TrendingUp className="section-icon" size={28} strokeWidth={2.5} />
          <h3 className="section-title">Insights</h3>
        </div>

        {/* TOP ROW */}
        <div className="stats-top">
          <div className="stat-card total"
            onClick={() => onFilterClick?.("All")}
            style={{ cursor: "pointer" }}
          >
            <div className="stat-icon-wrapper total-icon">
              <Briefcase size={32} strokeWidth={2.5} />
            </div>
            <div className="stat-content">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Total Applications</span>
            </div>
          </div>

          <div className="stat-card applied"
            onClick={() => onFilterClick?.("Applied")}
            style={{ cursor: "pointer" }}
          >
            <div className="stat-icon-wrapper applied-icon">
              <CheckCircle size={28} strokeWidth={2.5} />
            </div>
            <div className="stat-content">
              <span className="stat-number">{stats.applied}</span>
              <span className="stat-label">Applied</span>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="stats-bottom">
            <div className="stat-card interview"
              onClick={() => onFilterClick?.("Interview")}
              style={{ cursor: "pointer" }}
            >
            <div className="stat-icon-wrapper interview-icon">
              <Calendar size={24} strokeWidth={2.5} />
            </div>
            <div className="stat-content">
              <span className="stat-number">{stats.interview}</span>
              <span className="stat-label">Interviews</span>
            </div>
          </div>

          <div className="stat-card offer"
            onClick={() => onFilterClick?.("Offer")}
            style={{ cursor: "pointer" }}
          >
            <div className="stat-icon-wrapper offer-icon">
              <Trophy size={24} strokeWidth={2.5} />
            </div>
            <div className="stat-content">
              <span className="stat-number">{stats.offer}</span>
              <span className="stat-label">Offers</span>
            </div>
          </div>

          <div className="stat-card rejected"
            onClick={() => onFilterClick?.("Rejected")}
            style={{ cursor: "pointer" }}
          >
            <div className="stat-icon-wrapper rejected-icon">
              <CircleX size={24} strokeWidth={2.5} />
            </div>
            <div className="stat-content">
              <span className="stat-number">{stats.rejected}</span>
              <span className="stat-label">Rejected</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: UPCOMING */}
      <div className="insights-right">
        <h3 className="section-title upcoming">Upcoming Events</h3>

        {soonDates.length > 0 ? (
          <div className="soon-list">
            {soonDates.map(item => (
              <div key={item.id} className="soon-card">
                {/* Description */}
                <div className="soon-desc">
                  {item.description}
                </div>

                {/* Meta Row: Date + Days Badge */}
                <div className="soon-meta-row">
                  <div className="soon-meta">
                    {formatDate(item.date)}
                  </div>

                  <div className="soon-date-badge">
                    {item.daysLeft === 0
                      ? "Today"
                      : item.daysLeft === 1
                      ? "Tomorrow"
                      : `${item.daysLeft} days`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-soon-wrapper">
            <div className="empty-soon-icon">
              <Calendar size={48} strokeWidth={1.5} />
            </div>
            <p className="empty-soon">Nothing coming up soon</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Insights;