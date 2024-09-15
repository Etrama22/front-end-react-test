import React, { useEffect, useState } from "react";
import { fetchDailyTimeSeries } from "../../services/AnalyticsService";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/AuthService";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dashboard.css"; // Import CSS for styling

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [timelineData, setTimelineData] = useState({});
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout(); // Hapus token
    navigate("/login"); // Redirect ke halaman login
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchDailyTimeSeries();
        const groupedData = processDataByMonth(data);
        setTimelineData(groupedData);
        const chartData = transformToChartData(groupedData);
        setChartData(chartData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching or processing data:", error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  const processDataByMonth = (data) => {
    const monthlyData = {};
    Object.keys(data).forEach((date) => {
      const [year, month] = date.split("-");
      const key = `${year}-${month}`;
      if (!monthlyData[key]) {
        monthlyData[key] = [];
      }
      monthlyData[key].push({
        date,
        ...data[date],
      });
    });
    return monthlyData;
  };

  const transformToChartData = (monthlyData) => {
    const labels = Object.keys(monthlyData);
    const openPrices = labels.map((label) => {
      return (
        monthlyData[label].reduce(
          (sum, day) => sum + parseFloat(day["1. open"]),
          0
        ) / monthlyData[label].length
      );
    });
    const closePrices = labels.map((label) => {
      return (
        monthlyData[label].reduce(
          (sum, day) => sum + parseFloat(day["4. close"]),
          0
        ) / monthlyData[label].length
      );
    });

    return {
      labels: labels,
      datasets: [
        {
          label: "Open Price",
          data: openPrices,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          tension: 0.4,
        },
        {
          label: "Close Price",
          data: closePrices,
          borderColor: "rgba(153,102,255,1)",
          backgroundColor: "rgba(153,102,255,0.2)",
          tension: 0.4,
        },
      ],
    };
  };

  return (
    <div className="dashboard">
      <div className="d-flex">
        {/* Sidebar */}
        <div
          className="sidebar bg-light d-flex flex-column p-3"
          style={{ width: "280px", height: "100vh" }}
        >
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
          >
            <span className="fs-4">Vortex</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item mb-2">
              <a
                href="##"
                className="nav-link active d-flex align-items-center"
              >
                <i className="fa-solid fa-table-cells-large me-2"></i>
                Dashboard
              </a>
            </li>
            <li className="nav-item mb-2">
              <a
                href="##"
                className="nav-link text-dark d-flex align-items-center"
              >
                <i className="fa-solid fa-key me-2"></i>
                Token
              </a>
            </li>
            <li className="nav-item mb-2">
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </li>
            {/* Add other nav items here */}
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content flex-grow-1 p-3">
          <h1>Dashboard Analytic Timeline</h1>
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <div>
              {/* Cards for statistics */}
              <div className="row mb-3">
                <div className="col-md-3">
                  <div className="card p-3">
                    <h5>Total Request</h5>
                    <p>208</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card p-3">
                    <h5>Total Gateway</h5>
                    <p>89</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card p-3">
                    <h5>Total Source</h5>
                    <p>622</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card p-3">
                    <h5>Total User</h5>
                    <p>120</p>
                  </div>
                </div>
              </div>

              {/* Data Timeline Chart */}
              <div className="card p-3">
                <Line
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Stock Prices Open vs Close (Grouped by Month)",
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
