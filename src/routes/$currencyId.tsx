import { createFileRoute } from '@tanstack/react-router'
import { useCurrency } from "../hooks/useHome";
import { useCurrencyDetailed } from "../hooks/useBestBuy";
import { useSortedBanks } from '../hooks/useSortedBanks';
import { useState } from 'react';
import type { Bank } from '../types'; 

export const Route = createFileRoute('/$currencyId')({
  component: RouteComponent,
  loader: async ({ params }) => ({
    currency: params.currencyId
  })
})

function RouteComponent() {
  const { currency } = Route.useLoaderData();

  const { data, isLoading, isError } = useCurrency(currency || "usd");
  const { data: banks = [] } = useSortedBanks(currency || "usd");
  const [filter, setFilter] = useState<'best_buy' | 'best_sell' | 'all'>('all');
  const [buyOrSell, setBuyOrSell] = useState<'buy' | 'sell'>('buy');

  const filteredBanks = banks.filter((bank: Bank) => {
    if (filter === 'best_buy') return bank.best_buy;
    if (filter === 'best_sell') return bank.best_sell;
    return true;
  });

  const {
    data: detailData,
    isLoading: detailLoading,
    isError: detailError
  } = useCurrencyDetailed(currency || "usd");

  if (!currency)
    return <p className="text-center mt-10 text-red-500">❌ Валюта не найдена</p>

  if (isLoading || detailLoading)
    return <p className="text-center mt-10">⏳ Загрузка...</p>

  if (isError || detailError || !data?.results || !detailData)
    return <p className="text-center mt-10 text-red-500">❌ Произошла ошибка</p>

  const { average, current_date } = data.results;

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-8 space-y-6">
      {/* Лучшие курсы */}
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Лучший курс покупки</p>
          <p className="text-2xl font-bold mb-1">{detailData?.buying?.price}</p>
          <p className="text-gray-700">
            {detailData?.buying?.banks?.slice(0, 4).map(bank => bank.name).join(', ')}
          </p>
        </div>
        <div className="bg-gray-100 rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Лучший курс продажи</p>
          <p className="text-2xl font-bold mb-1">{detailData?.selling?.price}</p>
          <p className="text-gray-700">
            {detailData?.selling?.banks?.slice(0, 4).map(bank => bank.name).join(', ')}
          </p>
        </div>
      </div>

      {/* Средние курсы */}
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-6xl">
        <h1 className="text-3xl font-bold mb-4">
        Курс { 
          currency.toLowerCase() === 'usd' ? 'Долларa  США' :
          currency.toLowerCase() === 'eur' ? 'Евро' :
          currency.toLowerCase() === 'rub' ? 'Рубля' :
          currency.toUpperCase()
        } на {new Date(current_date).toLocaleDateString('ru-RU')}
      </h1>

        <p className="text-gray-500 mb-6">Средние курсы валют в Узбекистане</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-500">Средний курс покупки</p>
            <p className="text-2xl font-bold mt-2">~{average.buying}</p>
          </div>
          <div className="bg-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-500">Средний курс продажи</p>
            <p className="text-2xl font-bold mt-2">~{average.selling}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-6xl">
        {filter !== 'all' && (
          <div className="grid grid-cols-2 gap-2 mb-3 bg-gray-100 p-2 rounded">
            <button
              onClick={() => setBuyOrSell('buy')}
              className={`py-2 px-2 text-xs text-gray-900 rounded-lg cursor-pointer ${
                buyOrSell === 'buy' ? 'bg-white' : 'text-gray-900'
              }`}
            >
              Покупка
            </button>
            <button
              onClick={() => setBuyOrSell('sell')}
              className={`py-2 px-2 text-xs text-gray-900 rounded-lg cursor-pointer ${
                buyOrSell === 'sell' ? 'bg-white' : 'text-gray-900'
              }`}
            >
              Продажа
            </button>
          </div>
        )}


        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setFilter('best_buy')}
            className={`py-1 px-2 border text-xs rounded-xl cursor-pointer ${
              filter === 'best_buy' ? 'bg-gray-900 text-white' : 'text-black'
            }`}
          >
            Лучшие курсы
          </button>
          <button
            onClick={() => setFilter('best_sell')}
            className={`py-1 px-2 border text-xs rounded-xl cursor-pointer ${
              filter === 'best_sell' ? 'bg-gray-900 text-white' : 'text-black'
            }`}
          >
            Худшие курсы
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`py-1 px-2 border text-xs rounded-xl cursor-pointer ${
              filter === 'all' ? 'bg-gray-900 text-white' : 'text-black'
            }`}
          >
            Все
          </button>
        </div>

        <div className="overflow-x-auto w-full max-w-6xl">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Банк</th>
                {(buyOrSell === 'buy' || filter === 'all') && <th className="p-2 text-right">Покупка</th>}
                {(buyOrSell === 'sell' || filter === 'all') && <th className="p-2 text-right">Продажа</th>}
              </tr>
            </thead>
            <tbody>
              {filteredBanks.map((bank: Bank) => (
                <tr key={bank.id}>
                  <td>{bank.full_title}</td>
                  <td className="text-right">
                    {(buyOrSell === 'buy' || filter === 'all') ? (bank.buying === 'no data' ? '-' : bank.buying) : null}
                  </td>
                  <td className="text-right">
                    {(buyOrSell === 'sell' || filter === 'all') ? (bank.selling === 'no data' ? '-' : bank.selling) : null}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
