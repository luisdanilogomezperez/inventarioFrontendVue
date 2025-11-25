import axios from "axios";

const api = axios.create({
  baseURL: "https://inventarionodejs-production.up.railway.app", // ← Cambia esta URL
});

export default api;
