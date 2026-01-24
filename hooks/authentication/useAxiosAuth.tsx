"use client";

import { Session, User } from "next-auth";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

interface CustomUser extends User {
  token?: string;
}

interface CustomSession extends Session {
  user?: CustomUser;
}

function useAxiosAuth() {
  const { data: session, status } = useSession() as {
    data: CustomSession;
    status: string;
  };

  const token = session?.user?.token;

  return useMemo(() => {
    return {
      headers: {
        Authorization: token ? "Token " + token : "",
        "Content-Type": "multipart/form-data",
      },
      token,
      status,
    };
  }, [token, status]);
}

export default useAxiosAuth;
