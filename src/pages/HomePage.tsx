import { useMatch } from "@tanstack/react-router";
import { usdRoute, eurRoute, rubRoute } from "../router";
import { useCurrency } from "../hooks/useHome";

export default function HomePage() {
  const usdMatch = useMatch({ from: usdRoute.id });
  const eurMatch = useMatch({ from: eurRoute.id });
  const rubMatch = useMatch({ from: rubRoute.id });
  console.log(usdMatch, eurMatch, rubMatch);
  
  let currency: string | undefined;
  console.log('currency', currency);
  
  if (usdMatch) currency = "usd";
  else if (eurMatch) currency = "eur";
  else if (rubMatch) currency = "rub";

  const { data, isLoading, isError } = useCurrency(currency || "usd");

  if (!currency) return <p className="text-center mt-10 text-red-500">❌ Valyuta topilmadi</p>;
  if (isLoading) return <p className="text-center mt-10">⏳ Yuklanmoqda...</p>;
  if (isError || !data?.results) return <p className="text-center mt-10 text-red-500">❌ Xatolik yuz berdi</p>;

  const { average, current_date } = data.results;

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white text-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4">💵 {currency.toUpperCase()} ma’lumotlari</h1>
        <p className="text-lg">
          <span className="font-semibold">Sotib olish:</span> {average.buying}
        </p>
        <p className="text-lg mt-2">
          <span className="font-semibold">Sotish:</span> {average.selling}
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Yangilangan sana: {new Date(current_date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
