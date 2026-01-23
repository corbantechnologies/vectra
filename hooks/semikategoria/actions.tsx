"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../authentication/useAxiosAuth";
import { getSemiKategorias, getSemiKategoria } from "@/services/semikategoria";

export function useFetchSemiKategorias() {
  const header = useAxiosAuth();

  return useQuery({
    queryKey: ["semikategorias"],
    queryFn: () => getSemiKategorias(header),
    enabled: true,
  });
}

export function useFetchSemiKategoria(reference: string) {
  const header = useAxiosAuth();

  return useQuery({
    queryKey: ["semikategoria", reference],
    queryFn: () => getSemiKategoria(header, reference),
    enabled: !!reference,
  });
}
