import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;
const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true, //cho phép axios auto set refresh-token từ response vào cookie
});

const token = localStorage.getItem("access_token");
instance.defaults.headers.common = { Authorization: `Bearer ${token}` };
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
const NO_RETRY_HEADER = "x-no-retry";
const handleRefreshToken = async () => {
  const res = await instance.get("/api/v1/auth/refresh");

  if (res?.data && res?.data?.access_token) {
    return res.data.access_token;
  } else {
    return null;
  }
};

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response && response?.data ? response.data : response;
  },
  async function (error) {
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      !error.config.headers[NO_RETRY_HEADER] //handle prevent event: handleRefreshToken cũng lỗi 401 -> auto gọi lại handleRefreshToken.
    ) {
      const access_token = await handleRefreshToken();
      localStorage.setItem("access_token", access_token);
      error.config.headers["Authorization"] = `Bearer ${access_token}`;
      error.config.headers[NO_RETRY_HEADER] = "true";
      return instance.request(error.config);
    }

    //handle event: refresh token expired -> auto redirect "/login"
    if (
      error.config &&
      error.response &&
      +error.response.status === 400 &&
      error.config.url === "/api/v1/auth/refresh"
    ) {
      window.location.href = "/login";
    }

    return error?.response?.data ?? Promise.reject(error);
  }
);

export default instance;
