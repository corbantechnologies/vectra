"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../authentication/useAxiosAuth";
import { getTransactions, getTransaction } from "@/services/transactions";

export function useFetchTransactions() {
  const header = useAxiosAuth();

  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(header),
    enabled: true,
  });
}

export function useFetchTransaction(reference: string) {
  const header = useAxiosAuth();

  return useQuery({
    queryKey: ["transaction", reference],
    queryFn: () => getTransaction(header, reference),
    enabled: !!reference,
  });
}
