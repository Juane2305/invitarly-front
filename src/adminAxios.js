import axios from "axios";

let isInterceptorRegistered = false;

const adminAxios = axios.create({
  baseURL: "https://api.invitarly.com",
});

if (!isInterceptorRegistered) {
  adminAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log("Interceptor error capturado:", error.response?.status); // <-- LOG
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        // Redirigir o recargar la misma página
        window.location.reload();
        // o: window.location.href = "/admin";
      }
      return Promise.reject(error);
    }
  );
  isInterceptorRegistered = true;
  console.log("Interceptor de adminAxios registrado");
}

export default adminAxios;