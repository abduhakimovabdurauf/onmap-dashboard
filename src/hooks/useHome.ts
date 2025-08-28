import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface ApiResponse {
    results: {
        average: { buying: string; selling: string }
        current_date: string
    }
}
export function useCurrency(currency: string) {
  return useQuery<ApiResponse>({
    queryKey: ['currency', currency],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse>(`${import.meta.env.VITE_API_URL}/home?cur=${currency}`)
      console.log(`${import.meta.env.VITE_API_URL}/home?cur=usd`);
      
      console.log(data);
      
      return data
    },
    staleTime: 1000 * 60 * 60 * 5,
    refetchOnWindowFocus: false,
    // initialData: {
    //   results: {
    //     average: { buying: '-', selling: '-' },
    //     current_date: new Date().toISOString(),
    //   }
    // }
  })
}
