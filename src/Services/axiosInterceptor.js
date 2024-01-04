import axios from "axios";

const instance = axios.create({
  baseURL: "https://password-reset-vznk.onrender.com/",
  timeout: 50000,
});

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Response Error:", error.response.data);
    } else if (error.request) {
      console.error("Request Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
