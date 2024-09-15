import axios from "axios";

const API_KEY = "demo"; // Ganti dengan API key Anda
const SYMBOL = "IBM"; // Simbol yang digunakan

const fetchDailyTimeSeries = async () => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: "TIME_SERIES_DAILY",
        symbol: SYMBOL,
        apikey: API_KEY,
      },
    });
    return response.data["Time Series (Daily)"];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { fetchDailyTimeSeries };
