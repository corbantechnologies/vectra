"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../authentication/useAxiosAuth";
import { getKategorias, getKategoria } from "@/services/kategoria";

export function useFetchKategorias() {
  const { headers, token } = useAxiosAuth();

  return useQuery({
    queryKey: ["kategorias"],
    queryFn: () => getKategorias({ headers }),
    enabled: !!token,
  });
}

export function useFetchKategoria(reference: string) {
  const header = useAxiosAuth();

  return useQuery({
    queryKey: ["kategoria", reference],
    queryFn: () => getKategoria(header, reference),
    enabled: !!reference,
  });
}
