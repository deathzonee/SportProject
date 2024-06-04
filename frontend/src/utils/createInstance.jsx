import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { endpoint } from "./endpoint";
const refreshToken = async () => {
  try {
    const response = await axios.post(`${endpoint}/refresh`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("🚀 ~ refreshToken ~ error:", error);
  }
};

export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwtDecode(user?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
