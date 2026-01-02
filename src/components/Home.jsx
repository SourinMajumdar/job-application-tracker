function Home({ goToApplications, goToImportantDates }) {
  return (
    <div style={{ marginTop: "40px" }}>
      <h1>Welcome, Sourin 👋</h1>
      <p>What would you like to do today?</p>

      <button className="primary-action" onClick={goToApplications}>
        View My Applications
      </button>

      <button className="secondary-action" onClick={goToImportantDates}
        style={{ marginLeft: "12px" }}
      >
        View Important Dates
      </button>
    </div>
  );
}

export default Home;
