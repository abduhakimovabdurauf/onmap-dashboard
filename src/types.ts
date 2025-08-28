export interface Bank {
  id: number;
  full_title: string; // jadval uchun
  name: string;
  buying: number | "no data";
  selling: number | "no data";
  best_buy?: boolean;
  best_sell?: boolean;
}
