import axios from "axios";

const api = axios.create({
  baseURL: "https://resume-creator-server.vercel.app/", // "https://resume-creator-server.vercel.app/" || 
});

// Add token to the request header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = (username, password) => {

  return api.post("/login", { username, password });
};
export const register = (username, password) => {
  return api.post("/register", {username, password});
};
export const googleRegister = () => api.get("/auth/google");
export const checkLogin = () => api.get("/check-login");
export const getUserData = () => api.get("/user-data");
export const saveUserData = (data) => api.post("/save-data", { data });
export const updateUserData = (data) => api.put("/update-data", { data });
export const googleLogin = () => api.get("/google-auth");
