function Home({ goToApplications }) {
  return (
    <div style={{ marginTop: "40px" }}>
      <h1>Welcome, Sourin 👋</h1>
      <p>What would you like to do today?</p>

      <button
        className="primary-action"
        onClick={goToApplications}>
        View My Applications
    </button>
    </div>
  );
}

export default Home;
