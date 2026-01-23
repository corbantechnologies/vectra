"use client";

import { apiActions } from "@/tools/axios";
import { AxiosResponse } from "axios";
import { PaginatedResponse } from "./general";

export interface Transaction {
  reference: string;
  transaction_type: string;
  transaction_method: string;
  amount: string;
  date: string;
  kategoria: string;
  kategoria_name: string;
  semikategoria: string;
  semikategoria_name: string;
  updated_at: string;
  created_at: string;
}

interface createTransaction {
  transaction_type: string; // IN or EXP
  transaction_method: string; // CASH or CARD
  amount: string;
  date: string;
  kategoria: string; // can be null
  semikategoria: string; // can be null
}

interface updateTransaction {
  transaction_type: string; // IN or EXP
  transaction_method: string; // CASH or CARD
  amount: string;
  date: string;
  kategoria: string; // can be null
  semikategoria: string; // can be null
}

export async function createTransaction(
  transaction: createTransaction,
  header: { headers: { Authorization: string } },
) {
  const response: AxiosResponse<Transaction> = await apiActions.post(
    "api/v1/transactions/",
    transaction,
    header,
  );
  return response.data;
}

export async function updateTransaction(
  transaction: updateTransaction,
  header: { headers: { Authorization: string } },
  reference: string,
) {
  const response: AxiosResponse<Transaction> = await apiActions.patch(
    `api/v1/transactions/${reference}/`,
    transaction,
    header,
  );
  return response.data;
}

export const getTransactions = async (headers: {
  headers: { Authorization: string };
}): Promise<Transaction[]> => {
  const response: AxiosResponse<PaginatedResponse<Transaction>> =
    await apiActions.get(`/api/v1/transactions/`, headers);
  return response.data.results || [];
};

export const getTransaction = async (
  headers: { headers: { Authorization: string } },
  reference: string,
): Promise<Transaction> => {
  const response: AxiosResponse<Transaction> = await apiActions.get(
    `/api/v1/transactions/${reference}/`,
    headers,
  );
  return response.data;
};

export async function deleteTransaction(
  header: { headers: { Authorization: string } },
  reference: string,
) {
  const response: AxiosResponse<Transaction> = await apiActions.delete(
    `api/v1/transactions/${reference}/`,
    header,
  );
  return response.data;
}
