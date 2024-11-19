"use client";

import React, {
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { readFromLS, removeFromLS, writeToLS } from "@/utils/genericUtils";
import {
  NEXT_APP_ACCESS_TOKEN_NAME,
  NEXT_APP_REFRESH_TOKEN_NAME,
} from "@/constants/AuthConstants";
import { GetTokenType } from "@/auth/types/AuthTypes";

type AuthContextType = {
  isAuth: boolean;
  logoutUser: () => void;
  loginUser: (data: GetTokenType) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(
    readFromLS(NEXT_APP_ACCESS_TOKEN_NAME) ? true : false
  );

  const logoutUser = () => {
    removeFromLS(NEXT_APP_ACCESS_TOKEN_NAME);
    removeFromLS(NEXT_APP_REFRESH_TOKEN_NAME);
    setIsAuth(false);
  };

  const loginUser = (data: GetTokenType) => {
    writeToLS(NEXT_APP_ACCESS_TOKEN_NAME, data.accessToken);
    writeToLS(NEXT_APP_REFRESH_TOKEN_NAME, data.refreshToken);
    setIsAuth(true);
  };

  return (
    <AuthContext.Provider
      value={{
        logoutUser,
        loginUser,
        isAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};
