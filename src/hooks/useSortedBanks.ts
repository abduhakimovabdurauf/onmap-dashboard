import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Bank } from '../types';

export function useSortedBanks(currency: string) {
  return useQuery<Bank[]>({
    queryKey: ['sorted-banks', currency],   
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/sorted-banks?cur=${currency}`);
      return data?.banks || [];
    },
    staleTime: 1000 * 60 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

