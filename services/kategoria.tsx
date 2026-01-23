"use client";

import { apiActions } from "@/tools/axios";
import { AxiosResponse } from "axios";
import { PaginatedResponse } from "./general";
import { SemiKategoria } from "./semikategoria";
import { Transaction } from "./transactions";

export interface Kategoria {
  name: string;
  is_shared: boolean;
  created_at: string;
  updated_at: string;
  reference: string;
  semikategorias: SemiKategoria[];
  transactions: Transaction[];
}

interface createKategoria {
  name: string;
  is_shared: boolean;
}

interface updateKategoria {
  name: string;
  is_shared: boolean;
}

export async function createKategoria(
  kategoria: createKategoria,
  header: { headers: { Authorization: string } },
) {
  const response: AxiosResponse<Kategoria> = await apiActions.post(
    "api/v1/kategoria/",
    kategoria,
    header,
  );
  return response.data;
}

export async function updateKategoria(
  kategoria: updateKategoria,
  header: { headers: { Authorization: string } },
  reference: string,
) {
  const response: AxiosResponse<Kategoria> = await apiActions.patch(
    `api/v1/kategoria/${reference}/`,
    kategoria,
    header,
  );
  return response.data;
}

export const getKategorias = async (headers: {
  headers: { Authorization: string };
}): Promise<Kategoria[]> => {
  const response: AxiosResponse<PaginatedResponse<Kategoria>> =
    await apiActions.get(`/api/v1/kategoria/`, headers);
  return response.data.results || [];
};

export const getKategoria = async (
  headers: { headers: { Authorization: string } },
  reference: string,
): Promise<Kategoria> => {
  const response: AxiosResponse<Kategoria> = await apiActions.get(
    `/api/v1/kategoria/${reference}/`,
    headers,
  );
  return response.data;
};

export async function deleteKategoria(
  header: { headers: { Authorization: string } },
  reference: string,
) {
  const response: AxiosResponse<Kategoria> = await apiActions.delete(
    `api/v1/kategoria/${reference}/`,
    header,
  );
  return response.data;
}
