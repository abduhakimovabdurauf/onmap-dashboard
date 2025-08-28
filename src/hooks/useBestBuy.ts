import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface Bank {
  id: number
  name: string
  slug: string
}

interface PriceDetail {
  price: string
  banks: Bank[]
}

interface CurrencyResponse {
  buying: PriceDetail
  selling: PriceDetail
}

export function useCurrencyDetailed(currency: string) {
  return useQuery<CurrencyResponse>({
    queryKey: ['currency-detailed', currency],
    queryFn: async () => {
      const { data } = await axios.get<CurrencyResponse>(
        `${import.meta.env.VITE_API_URL}/best-buy-rate?lang=ru&cur=${currency}`
        
      )
    console.log(data);

      console.log(data)
      return data
    },
    staleTime: 1000 * 60 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}
