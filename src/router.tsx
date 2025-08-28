// router.tsx
import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router"
import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFound"

export const rootRoute = createRootRoute({
  component: HomePage,
  notFoundComponent: NotFound,
})

// Currency routes
export const usdRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "usd",
  component: HomePage,
})

export const eurRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "eur",
  component: HomePage,
})

export const rubRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "rub",
  component: HomePage,
})

export const router = createRouter({
  routeTree: rootRoute,
})
