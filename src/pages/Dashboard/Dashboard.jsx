import React from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts"; // Import ApexChart

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login"); // Redirect ke halaman login
  };

  // Sample data for chart (replace this with actual data later)

  // State for ApexChart
  const [apexChartState] = React.useState({
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });

  return (
    <div className="dashboard">
      <div className="d-flex">
        {/* Sidebar */}
        <div className="sidebar bg-dark text-white p-3">
          <a
            href="/"
            className="d-flex align-items-center mb-3 text-white text-decoration-none"
          >
            <i className="fa-solid fa-chart-pie me-2"></i>
            <span className="fs-4">Vortex</span>
          </a>
          <hr className="text-secondary" />
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="##" className="nav-link text-white">
                <i className="fa-solid fa-table-cells-large me-2"></i>
                Dashboard
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="##" className="nav-link text-secondary">
                <i className="fa-solid fa-key me-2"></i>
                Token
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="##" className="nav-link text-secondary">
                <i className="fa-solid fa-user me-2"></i>
                Users
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="##" className="nav-link text-secondary">
                <i className="fa-solid fa-gear me-2"></i>
                Settings
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content flex-grow-1 p-4">
          <h2>Dashboard Overview</h2>
          <div className="row mb-4">
            {/* Cards */}
            <div className="col-md-3">
              <div className="card p-4 text-white bg-info">
                <h5>Total Request</h5>
                <p>208</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-4 text-white bg-warning">
                <h5>Total Gateway</h5>
                <p>89</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-4 text-white bg-success">
                <h5>Total Source</h5>
                <p>622</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-4 text-white bg-danger">
                <h5>Total User</h5>
                <p>120</p>
              </div>
            </div>
          </div>

          {/* Data Timeline Chart */}
          <div className="card p-4">
            <h5>Data Timeline (Chart.js)</h5>
            {/* ApexChart Implementation */}
            <ReactApexChart
              options={apexChartState.options}
              series={apexChartState.series}
              type="area"
              height={350}
            />
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-outline-danger mt-4"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
