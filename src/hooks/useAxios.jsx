/* eslint-disable no-useless-catch */
import { useEffect } from "react";
import { api } from "../api";
import useAuth from "./useAuth";
import axios from "axios";

const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    // interceptors req method
    const reqIntercep = api.interceptors.request.use(
      function (config) {
        const authtoken = auth?.authtoken;
        if (authtoken) {
          config.headers.authorization = `Bearer ${authtoken}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    // interceptors response for 401 & 403 error
    const resIntercep = api.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        const status = error.response.status;
        const originalReq = error.config;
        if (status === 401 && !originalReq._retry) {
          originalReq._retry = true;

          try {
            const refreshToken = auth?.refreshToken;

            const res = await axios.post(
              `http://localhost:3000/auth/refresh-token`,
              { refreshToken }
            );

            const { token } = res.data;
            console.log(token);
            setAuth({ ...auth, authtoken: token });
            originalReq.headers.authorization = `Bearer ${token}`;

            return axios(originalReq);
          } catch (error) {
            throw error;
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(reqIntercep);
      api.interceptors.response.eject(resIntercep);
    };
  }, [auth.authtoken]);

  return { api };
};

export default useAxios;
