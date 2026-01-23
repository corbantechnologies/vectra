"use client";

import { Session, User } from "next-auth";
import { useSession } from "next-auth/react";

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

  const authenticationHeader = {
    headers: {
      Authorization: token ? "Token " + token : "",
      "Content-Type": "multipart/form-data",
    },
  };

  return { ...authenticationHeader, token, status };
}

export default useAxiosAuth;
