import axios from "axios";

let isInterceptorRegistered = false;

const adminAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

if (!isInterceptorRegistered) {
  adminAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.reload();
      }
      return Promise.reject(error);
    }
  );
  isInterceptorRegistered = true;
}

export default adminAxios;