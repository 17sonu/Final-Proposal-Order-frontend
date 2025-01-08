import axios from "axios";

const instance = axios.create({
  baseURL: "https://final-proposal-order-backend.vercel.app/api/", // Change this if you deploy it
  withCredentials: true, // Allow sending cookies
});

export default instance;