import axios from "axios";

const api = axios.create({
  baseURL: "https://node-api-inventario-production.up.railway.app", // ← Cambia esta URL
});

export default api;
