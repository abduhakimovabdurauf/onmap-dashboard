// src/App.tsx
import { Outlet } from "@tanstack/react-router"

export default function App() {
  return (
    <div>
      <header className="p-4 bg-gray-100">
        <h1 className="text-xl font-bold">OnMap Dashboard</h1>
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  )
}
