export interface Bank {
  id: number;
  full_title: string; // jadval uchun
  name: string;
  buying?: number;
  selling?: number;
  best_buy?: boolean;
  best_sell?: boolean;
}
