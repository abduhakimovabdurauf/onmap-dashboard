import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

const currencies = ['usd', 'eur', 'rub'] as const

export const Route = createRootRoute({
  component: () => {
  return (
    <div className="bg-gray-100">
      <nav className="p-2 flex justify-between gap-2 mx-auto w-full max-w-6xl sticky top-0 bg-white shadow-lg">
        <Link to="/" className="[&.active]:font-bold">
          OnMap
        </Link>
        <div className='flex gap-2'>
           {currencies.map((currency) => (
                <Link
                    key={currency}
                    to="/$currencyId"
                    params={{ currencyId: currency }}
                    className="[&.active]:font-bold"
                >
                    {currency.toUpperCase()}
                </Link>
            ))} 
        </div>
        
      </nav>
      <main >
        <Outlet />
      </main>
    </div>
  )
},

})
