"use client";

import { apiActions } from "@/tools/axios";
import { AxiosResponse } from "axios";
import { PaginatedResponse } from "./general";
import { Transaction } from "./transactions";

export interface SemiKategoria {
  reference: string;
  name: string;
  kategoria: string;
  kategoria_name: string;
  updated_at: string;
  created_at: string;
  transactions: Transaction[];
}

interface createSemiKategoria {
  name: string;
  kategoria: string; // the value is the reference of the category
}

interface updateSemiKategoria {
  name: string;
  kategoria: string; // the value is the reference of the category
}

export async function createSemiKategoria(
  semikategoria: createSemiKategoria,
  header: { headers: { Authorization: string } },
) {
  const response: AxiosResponse<SemiKategoria> = await apiActions.post(
    "api/v1/semikategoria/",
    semikategoria,
    header,
  );
  return response.data;
}

export async function updateSemiKategoria(
  semikategoria: updateSemiKategoria,
  header: { headers: { Authorization: string } },
  reference: string,
) {
  const response: AxiosResponse<SemiKategoria> = await apiActions.patch(
    `api/v1/semikategoria/${reference}/`,
    semikategoria,
    header,
  );
  return response.data;
}

export const getSemiKategorias = async (headers: {
  headers: { Authorization: string };
}): Promise<SemiKategoria[]> => {
  const response: AxiosResponse<PaginatedResponse<SemiKategoria>> =
    await apiActions.get(`/api/v1/semikategoria/`, headers);
  return response.data.results || [];
};

export const getSemiKategoria = async (
  headers: { headers: { Authorization: string } },
  reference: string,
): Promise<SemiKategoria> => {
  const response: AxiosResponse<SemiKategoria> = await apiActions.get(
    `/api/v1/semikategoria/${reference}/`,
    headers,
  );
  return response.data;
};

export async function deleteSemiKategoria(
  header: { headers: { Authorization: string } },
  reference: string,
) {
  const response: AxiosResponse<SemiKategoria> = await apiActions.delete(
    `api/v1/semikategoria/${reference}/`,
    header,
  );
  return response.data;
}