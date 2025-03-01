import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-content">
      <div className="stats-grid">
        <div className="stats-card">
          <h3>No. of Recipes</h3>
          <div className="number">255</div>
        </div>
        <div className="stats-card">
          <h3>No. of Users</h3>
          <div className="number">255</div>
        </div>
        <div className="stats-card">
          <h3>Vegetarians Recipes</h3>
          <div className="number">255</div>
        </div>
        <div className="stats-card">
          <h3>Non-Vegetarians Recipes</h3>
          <div className="number">255</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 