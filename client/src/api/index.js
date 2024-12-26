import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:3000/api/",
});
