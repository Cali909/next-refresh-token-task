import { GetTokenType } from "@/auth/types/AuthTypes";
import { NEXT_APP_ACCESS_TOKEN_NAME } from "@/constants/AuthConstants";
import { useAuthContext } from "@/contexts/AuthContext";
import { readFromLS } from "@/utils/genericUtils";
import axios, { AxiosRequestConfig } from "axios";

export function useAxios() {
  const { logoutUser, loginUser } = useAuthContext();

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_APP_BASE_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    (req) => {
      const token = readFromLS(NEXT_APP_ACCESS_TOKEN_NAME);
      if (token) {
        req.headers["Authorization"] = "Bearer " + token;
      }
      return req;
    },
    (err) => Promise.reject(err)
  );

  let isRefreshing = false;
  let failedRequestsQueue: {
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
  }[] = [];

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error.response?.status === 403 && !originalRequest._retry) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const response = await fetch("/api/token/refresh");
            const refreshToken: GetTokenType = await response.json();

            if (refreshToken) {
              loginUser(refreshToken);
              failedRequestsQueue.forEach((req) => req.resolve());
              failedRequestsQueue = [];
            } else {
              logoutUser();
            }
          } catch (refreshError) {
            failedRequestsQueue.forEach((req) => req.reject(refreshError));
            failedRequestsQueue = [];
            logoutUser();
          } finally {
            isRefreshing = false;
          }
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            resolve: () => {
              originalRequest._retry = true;
              resolve(axiosInstance(originalRequest));
            },
            reject: (err) => reject(err),
          });
        });
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
}
