import axios from "axios";

const apiClient = axios.create({
  // This pulls the URL directly from your .env file
  baseURL: process.env.REACT_APP_API_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to help you debug if the TiDB connection drops
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Connection Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;