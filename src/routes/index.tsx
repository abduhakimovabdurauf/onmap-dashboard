import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/$currencyId', params: { currencyId: 'usd' }, replace: true })
  }, [navigate])

  return (
    <div className="p-2">
      <h3>Redirecting...</h3>
    </div>
  )
}
