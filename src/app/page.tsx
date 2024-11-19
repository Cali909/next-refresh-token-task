"use client";

import { ResponseStatusType, useAuth } from "@/auth/hooks/useAuth";
import {
  NEXT_APP_ACCESS_TOKEN_NAME,
  NEXT_APP_REFRESH_TOKEN_NAME,
} from "@/constants/AuthConstants";
import { useAuthContext } from "@/contexts/AuthContext";
import { readFromLS } from "@/utils/genericUtils";
import { useState } from "react";

export default function Home() {
  const { getToken, getDummyData } = useAuth();
  const { isAuth, logoutUser } = useAuthContext();
  const [reqData, setReqData] = useState<undefined | ResponseStatusType>(
    undefined
  );

  console.log(reqData);

  return (
    <div className="m-6 flex flex-col gap-4 border border-stone-300 rounded-2xl p-6">
      <div className="flex items-center w-full gap-4">
        <button
          className="py-3 px-4 bg-blue-600 rounded-2xl text-white w-full disabled:bg-slate-400"
          onClick={getToken}
        >
          Login
        </button>
        <button
          className="py-3 px-4 bg-red-600 rounded-2xl text-white w-full disabled:bg-slate-400"
          onClick={logoutUser}
        >
          Logout
        </button>
        <button
          className="py-3 px-4 bg-violet-600 rounded-2xl text-white w-full disabled:bg-slate-400"
          onClick={() => getDummyData("OK", setReqData)}
          disabled={!isAuth}
        >
          OK API Call
        </button>
        <button
          className="py-3 px-4 bg-orange-600 rounded-2xl text-white w-full disabled:bg-slate-400"
          onClick={() => getDummyData("403", setReqData)}
          disabled={!isAuth}
        >
          403 API Call
        </button>
      </div>
      <p className="text-2xl text-center">{`User Authentication state : ${isAuth}`}</p>
      <p className="text-lg text-center">{`Access_token : ${readFromLS(
        NEXT_APP_ACCESS_TOKEN_NAME
      )}`}</p>
      <p className="text-lg text-center">{`Refresh_token : ${readFromLS(
        NEXT_APP_REFRESH_TOKEN_NAME
      )}`}</p>
      {reqData && (
        <p className="text-2xl text-center">{`Request Status : ${reqData}`}</p>
      )}
    </div>
  );
}
