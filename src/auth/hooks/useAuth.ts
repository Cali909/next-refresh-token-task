import { useAxios } from "@/services/useAxios";
import { GetTokenType } from "../types/AuthTypes";
import { useAuthContext } from "@/contexts/AuthContext";

export type ResponseStatusType = "OK" | "403";

export function useAuth() {
  const axiosInstance = useAxios();
  const { loginUser } = useAuthContext();

  const getToken = async () => {
    const response = await axiosInstance.get("/api/token");
    const data: GetTokenType = response.data;
    if (data) {
      loginUser(data);
    }
    return data;
  };

  const getRefreshToken = async () => {
    const response = await axiosInstance.get("/api/token/refresh");
    return response.data;
  };

  const getDummyData = async (
    status: ResponseStatusType,
    setter: (status: ResponseStatusType) => void
  ) => {
    const response = await axiosInstance.post(
      "/api/forbidden",
      {},
      {
        params: { status },
      }
    );
    setter(response.data.data);
    return response.data;
  };

  return { getToken, getRefreshToken, getDummyData };
}
