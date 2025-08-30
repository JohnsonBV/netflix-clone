import axios from "axios";

// Create an axios instance with a base URL (TMDb API for example)
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3", // TMDb API base
});

// You can also add an interceptor if you need logging or error handling
// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API Error:", error);
//     return Promise.reject(error);
//   }
// );

export default instance;
