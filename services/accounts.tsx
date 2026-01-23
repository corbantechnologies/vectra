/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { apiActions } from "@/tools/axios";
import { AxiosResponse } from "axios";

export interface User {
  member_code: string;
  name: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  is_active: boolean;
  is_employee: boolean;
  is_director: boolean;
  is_finance: boolean;
  is_superuser: boolean;
  is_staff: boolean;
}

export interface forgotPassword {
  email: string;
}

export interface resetPassword {
  email: string;
  code: string;
  password: string;
  password_confirmation: string;
}

export const getAccount = async (
  member_code: string,
  headers: { headers: { Authorization: string } },
): Promise<User> => {
  const response: AxiosResponse<User> = await apiActions.get(
    `/api/v1/auth/${member_code}/`,
    headers,
  );
  return response.data;
};

export const forgotPassword = async (data: forgotPassword): Promise<any> => {
  const response: AxiosResponse<any> = await apiActions.post(
    `/api/v1/auth/password/forgot/`,
    data,
  );
  return response.data;
};

export const resetPassword = async (data: resetPassword): Promise<any> => {
  const response: AxiosResponse<any> = await apiActions.post(
    `/api/v1/auth/password/reset/`,
    data,
  );
  return response.data;
};